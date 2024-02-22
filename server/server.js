import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import compression from 'compression';
import bcrypt from 'bcrypt';
import passport from 'passport';
import session from 'express-session';
import LocalStrategy from 'passport-local'

dotenv.config();
const app = express();
const port = 22502;
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["POST", "GET"],
  credentials: true
}
));
app.use(compression())

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(passport.initialize())
app.use(passport.session())

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
    if(req.session.username) {
      return res.json({valid: true, username: req.session.username})
    } else {
      return res.json({valid: false})
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/auctions', (req, res)=> {
    const sql = 'SELECT Auctions.StartDateTime, Auctions.EndDateTime, Auctions.WinningBid, Auctions.WinningUserID, Auctions.SellerID, Cars.CarID, Cars.Make, Cars.Model, Cars.Picture AS Picture FROM Auctions JOIN Cars ON Auctions.CarID = Cars.CarID WHERE NOW() < Auctions.EndDateTime;';
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

app.get('/userBids/:userID', (req, res) => {
  const userID = req.params.userID;
  const sql = 'SELECT DISTINCT Auctions.*, Cars.*, Bids.* FROM Bids INNER JOIN Auctions ON Bids.auctionID = Auctions.auctionID INNER JOIN Cars ON Auctions.CarID = Cars.CarID WHERE Bids.UserID = ? AND (Bids.UserID, Bids.auctionID, Bids.BidDateTime) IN (SELECT UserID, auctionID, MAX(BidDateTime) FROM Bids WHERE UserID = ? GROUP BY UserID, auctionID)';
  db.query(sql, [userID, userID], (err, data) => {
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
  });
});

app.get('/endedSoldAuctions', (req, res) => {
  const sql = 'SELECT Auctions.StartDateTime, Auctions.EndDateTime, Auctions.WinningBid, Auctions.WinningUserID, Auctions.SellerID, Cars.CarID, Cars.Make, Cars.Model, Cars.Picture AS Picture FROM Auctions JOIN Cars ON Auctions.CarID = Cars.CarID WHERE NOW() > Auctions.EndDateTime;';
  db.query(sql, (err, data) => {
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
  });
});

app.get('/sellerDetails/:AuctionID', (req, res)=> {
  const auctionID = req.params.AuctionID;
  const sql = 'SELECT Auctions.*, Users.* FROM Auctions JOIN Users ON Auctions.SellerID = Users.userID WHERE AuctionID = ?;';
  db.query(sql, [auctionID],(err, data) => {
      if(err) {
          console.error('Error fetching auction details:', err);
          res.status(500).send('Internal Server Error');
      }
          res.status(200).json(data);
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

  app.post('/startAuction/:CarID/:SellerID', (req, res) => {
    const CarID = req.params.CarID;
    const SellerID = req.params.SellerID
    let startDateTime = new Date();
    let endDateTime = new Date();

    endDateTime.setDate(startDateTime.getDate() + 7);
    endDateTime = endDateTime.toISOString().slice(0, 19).replace('T', ' ');
    startDateTime = startDateTime.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Start Date:", startDateTime);
    console.log("End Date:", endDateTime);
    
    const sql = 'INSERT INTO Auctions (CarID, EndDateTime, StartDateTime, WinningBid, SellerID) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [CarID , endDateTime, startDateTime, 0, SellerID], (err, result) => {
      if (err) {
        console.error('Error starting auction:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Auction started');
        res.status(200).json({ message: 'Auction started' });
      }
    });
  });

  app.post('/placeBid/:carID/:bid/:userID', (req, res) => {
    const carID = req.params.carID;
    const bid  = req.params.bid;
    const userID = req.params.userID;

    const getAuctionIDSql = 'SELECT Auctions.AuctionID FROM Auctions WHERE Auctions.CarID = ?';
    db.query(getAuctionIDSql, [carID], (err, auctionResult) => {
        if (err) {
            console.error('Error retrieving auctionID:', err);
            res.status(500).send('Internal Server Error');
            return;
        } else {
            if (auctionResult.length === 0) {
                console.error('Auction not found for carID:', carID);
                res.status(404).send('Auction not found');
                return;
            }

            const auctionID = auctionResult[0].AuctionID;

            const addBidSql = 'INSERT INTO Bids (AuctionID, BidDateTime, CurrentBid, UserID) VALUES (?, NOW(), ?, ?)';
            db.query(addBidSql, [auctionID, bid, userID], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting bid:', insertErr);
                    res.status(500).send('Internal Server Error');
                    return;
                } else {
                    console.log('Bid added to database');
                }
            });

    const sql = 'UPDATE Auctions SET WinningBid = ?, WinningUserID = ? WHERE CarID = ?';
    db.query(sql, [bid, userID, carID], (err, result) => {
      if (err) {
        console.error('Error placing bid:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Bid placed' + carID + " bid: " + bid + " by userID: " + userID);
        res.status(200).json({ message: 'Bid placed'});
      }
    });
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

// https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5

 function authUser(username, password, done){
  const sql = 'SELECT * FROM Users WHERE Username = ?';
  db.query(sql, [username],(err, data) => {
      if(err) {
          console.error('Error fetching auction details:', err);
      }
      if (data.length === 0) {
        console.log("User not found");
        return;
      }
      const user = data[0]

        bcrypt.compare(password, user.Password, function(err, result) {
          if (result) {
            console.log(`Value of "User" in authUser function ----> ${username}`)         //passport will populate, user = req.body.username
            console.log(`Value of "Password" in authUser function ----> ${password}`)
              console.log("Password matched, user found");
              let authenticated_user = {id: user.UserID, name: user.Username}
              console.log("User is: ", authenticated_user);
              return done (null, authenticated_user)
          } else {
            console.log("Passwords don't match");
            return;
          }
        });
  })
}
passport.use(new LocalStrategy (authUser))

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`)
    console.log(user)     
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  console.log("---------> Deserialize Id")
  console.log(id)
  
  db.query('SELECT * FROM Users WHERE UserID = ?', [id], (err, data) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return done(err);
    }
    if (data.length === 0) {
      return done(new Error('User not found'));
    }
    const user = data[0];
    return done(null, user);
  });
});



  app.post('/login', passport.authenticate('local'), (req, res) =>{
    if(req.user) {
      console.log("please work: ", req.user.name);
      req.session.user = req.user.name;
      req.session.userid = req.user.id;
      res.status(200).json({ 
        login: true,
        message: 'Logged In',
        username: req.session.user,
        userID: req.session.userid
      });
    } else {
      res.status(500).json({
        login: false,
        message: 'failed',
        user: null
      })
    }
  });

  app.delete("/logout", (req,res) => {
    req.logOut()
    res.status(200).json({ message: 'Logged out'});
    console.log(`-------> User Logged out`)
 })
 