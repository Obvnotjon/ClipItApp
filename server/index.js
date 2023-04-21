import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
    host:"clipit-sm-db.co8sylbqcwmx.us-east-2.rds.amazonaws.com",
    user: "clipitadmin",
    password:"CSE4550SMWA!",
    database:"smdb"
});

app.get("/", (req, res)=>{
    res.json("hello this is the backend")
});

app.post("/login", (req, res) => {
    const q = "SELECT * FROM users WHERE username = ? AND password = ?";
    const { username, password } = req.body;

    db.query(q, [username, password], (error, results, fields)=>{
        if (error) throw error;
        if (results.length > 0) {         
            res.send("Successful login");
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
});

app.post("/signup", async (req, res) => {
    const qc = "SELECT * FROM users WHERE username = ?";
    const q = "INSERT INTO users (username, password) VALUES (?,?)";
    const { username, password } = req.body;;

    db.query(qc, [username], (error, results)=>{
        if (error) {
            return res.status(500).send("Error"); 
        }
        
        if (results.length > 0) {
            return res.status(400).send("Username is already taken")
        }

        db.query(q, [username, password], (error, data) => {
            if (error) {
                return res.status(500).send("Error");
            }
                return res.status(200).send("Successful registration");
        });      
    });
});

app.get("/signup", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});

app.listen(8800, () => {
    console.log("Connected to backend server");
});