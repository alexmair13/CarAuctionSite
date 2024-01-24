import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

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
    const testSql = 'SELECT * FROM Auctions LIMIT 5'; // Adjust the query as needed
    db.query(testSql, (err, data) => {
      if (err) {
        console.error('Error executing test SQL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      return res.json(data);
    });
  });
  

// SELECT Auctions.*, Cars.Make, Cars.Model, Cars.Picture FROM Auctions JOIN Cars ON Auctions.CarID = Cars.CarID