import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import compression from 'compression';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();
const port = 22502;
app.use(cors());
app.use(compression())



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


const upload = multer({ storage: multer.memoryStorage() });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('carImages'));

app.get("/", (req,res) => {
    res.json("Backend server")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/auctions', (req, res)=> {
    const sql = 'SELECT Auctions.StartDateTime, Auctions.EndDateTime, Cars.CarID, Cars.Make, Cars.Model, Cars.Picture AS Picture FROM Auctions JOIN Cars ON Auctions.CarID = Cars.CarID';
    db.query(sql, (err, data)=> {
        if(err) {
            console.error('Error fetching auction and car details:', err);
            res.status(500).send('Internal Server Error');
        }
        data.forEach((result) => {
          
          if (result.Picture) {
            const base64Image = result.Picture.toString('base64');
            result.Picture = base64Image;
          }
        });
            return res.json(data);
    })
})

app.get('/singleAuction/:carID', (req, res)=> {
  const carID = req.params.carID;
  const sql = 'SELECT Auctions.* FROM Auctions WHERE CarID = ?';
  db.query(sql, [carID],(err, data) => {
      if(err) {
          console.error('Error fetching auction details:', err);
          res.status(500).send('Internal Server Error');
      }
          res.status(200).json(data);
  })
})


app.get('/carDetails/:carID', (req, res) => {
    const carID = req.params.carID;
    console.log("car ID is: " + carID);
    const sql = 'SELECT * FROM Cars WHERE CarID = ?';
    
    db.query(sql, [carID], (err, data) => {
        if (err) {
            console.error('Error fetching car details:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (data.length > 0) {
                const carDetails = data[0];
                const imageData = carDetails.Picture.toString('base64');
                carDetails.PictureBase64 = imageData
                res.status(200).json(carDetails);
            } else {
                res.status(404).send('Car not found');
            }
        }
    });
});

  app.post('/addCar', (req, res) => {
    const {make, model, year, colour, mileage, description} = req.body;
    const imageBuffer = req.file.buffer;
  
    const sql = 'INSERT INTO Cars (Color, Description, Make, Mileage, Model, Picture, Year) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [colour, description, make, mileage, model, imageBuffer, year], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        const CarID = result.insertId;
        res.status(200).json({ message: 'Car added to the database with ID:', CarID });
      }
    });
  });

  app.post('/startAuction/:CarID', (req, res) => {
    const CarID = req.params.CarID;
    let startDateTime = new Date();
    let endDateTime = new Date();

    endDateTime.setDate(startDateTime.getDate() + 7);
    endDateTime = endDateTime.toISOString().slice(0, 19).replace('T', ' ');
    startDateTime = startDateTime.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Start Date:", startDateTime);
    console.log("End Date:", endDateTime);
    
    const sql = 'INSERT INTO Auctions (CarID, EndDateTime, StartDateTime, WinningBid) VALUES (?, ?, ?, ?)';
    db.query(sql, [CarID , endDateTime, startDateTime, 0], (err, result) => {
      if (err) {
        console.error('Error starting auction:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Auction started');
        res.status(200).json({ message: 'Auction started' });
      }
    });
  });

  app.post('/placeBid/:carID/:bid', (req, res) => {
    const carID = req.params.carID;
    const bid  = req.params.bid;

    const sql = 'UPDATE Auctions SET WinningBid = ? WHERE CarID = ?';
    db.query(sql, [bid, carID], (err, result) => {
      if (err) {
        console.error('Error placing bid:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Bid placed' + carID + " bid: " + bid );
        res.status(200).json({ message: 'Bid placed'});
      }
    });
  });

  app.post('/register', (req, res) => {
    const {addressLine1, addressLine2, email, firstName, lastName, password, phoneNumber, postcode, townCity, username} = req.body;
    
    
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) {
        console.log("Error hashing password ", err);
      } else {
        const sql = 'INSERT INTO Users (AddressLine1, AddressLine2, Email, FirstName, LastName, Password, PhoneNumber, PostCode, TownCity, Username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [addressLine1, addressLine2, email, firstName, lastName, hash, phoneNumber, postcode, townCity, username], (err, result) => {
          if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.status(200).json({ message: 'User added to the database'});
          }
        });
      }
    });
  });

  app.post('/login', (req, res)=> {
    const {username, password} = req.body;

    const sql = 'SELECT * FROM Users WHERE Username = ?';
    db.query(sql, [username],(err, data) => {
        if(err) {
            console.error('Error fetching auction details:', err);
            res.status(500).send('Internal Server Error');
        }
        if (data === 0) {
          res.status(404).send("User not found");
        }
        const user = data[0]

          bcrypt.compare(password, user.Password, function(err, result) {
            if (result) {
                console.log("Password matched, user found");
                res.status(200).json(user);
            } else {
              console.log("Passwords don't match");
            }
            
            if (err) {
              console.log("Error matching password");
            }
          });
    })
  })
