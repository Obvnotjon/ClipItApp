import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

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

    db.query(q, [ username ], async (err, data) => {
        if (err)
            return res.status(500).send(err)

        if (data.length > 0) {
            const match = await bcrypt.compare(password, data[0].password);
            if (match) {
                const token = jwt.sign({ id: data[0].id }, "jwtKey");
                const { password, ...other } = data[0];

                res.cookie("access_token", token, {
                    httpOnly: true
                }).status(200).json(other);
            } else  
                return res.status(400).send("Invalid Password");
        } else
            return res.status(400).send("Invalid Username");
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("Logged out");
});

app.post("/signup", (req, res) => {
    const qc = "SELECT * FROM users WHERE username = ?";
    const q = "INSERT INTO users (username, password) VALUES (?,?)";
    const { username, password } = req.body;

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

            db.query(q, [username, hash], (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                } 
                return res.status(200).send("Registration Successful"); 
            });
        });
    });
});

app.get("/posts", (req, res) => {
    const q = "SELECT * FROM posts WHERE userId = (?)";
})

app.post("/createpost", (req, res) => {
    const q = "INSERT INTO posts (postDesc, postContent, userId, dateCreated) VALUES (?,?,?,?)";
    const values = [
        req.body.postDesc,
        req.body.postContent,
        req.body.userId,
        req.body.dateCreated
    ]

    db.query(q, [values], (err, results) => {

    })

})

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