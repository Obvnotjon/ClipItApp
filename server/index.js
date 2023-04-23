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
    const q = "SELECT * FROM users WHERE username = ?";
    const {username, password } = req.body;

    db.query(q, [ username ], async (err, results) => {
        if (err)
            return res.status(500).send(err)

        if (results.length > 0) {
            const match = await bcrypt.compare(password, results[0].password);
            if (match) 
                return res.status(200).send("successful login");
            else 
                return res.status(400).send("Invalid username or password");
        } else
            return res.status(400).send("Invalid username or password");
    });
});

app.post("/signup", (req, res) => {
    const qc = "SELECT * FROM users WHERE username = ?";
    const q = "INSERT INTO users (username, password) VALUES (?,?)";
    const {username, password } = req.body;

    db.query(qc, [ username ], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(400).send("Username is already taken");
        }

        const saltRound = 10;
        bcrypt.hash(password, saltRound, (err, hash) => {
            if (err) {
                return res.status(500).send(err);
            }

            db.query(q, [username, hash], (err) => {
                if (err) {
                    return res.status(500).send(err);
                } 
                return res.status(200).send("Registration Successful"); 
            });
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