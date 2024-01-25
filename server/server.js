import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';

dotenv.config();
const app = express();
const port = 22502;
app.use(cors());


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
    const sql = 'SELECT Auctions.*, Cars.Make, Cars.Model, Cars.Picture FROM Auctions JOIN Cars ON Auctions.CarID = Cars.CarID';
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/test', (req, res) => {
    const testSql = 'SELECT * FROM Auctions LIMIT 5';
    db.query(testSql, (err, data) => {
      if (err) {
        console.error('Error executing test SQL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      return res.json(data);
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
    const endDateTime = new Date(startDateTime.setDate(startDateTime.getDate() + 7)).toISOString().slice(0, 19).replace('T', ' ');
    startDateTime = startDateTime.toISOString().slice(0, 19).replace('T', ' ');
    
    const sql = 'INSERT INTO Auctions (CarID, EndDateTime, StartDateTime) VALUES (?, ?, ?)';
    db.query(sql, [CarID , endDateTime, startDateTime], (err, result) => {
      if (err) {
        console.error('Error starting auction:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Auction started');
        res.status(200).json({ message: 'Auction started' });
      }
    });
  });

// SELECT Auctions.*, Cars.Make, Cars.Model, Cars.Picture FROM Auctions JOIN Cars ON Auctions.CarID = Cars.CarID