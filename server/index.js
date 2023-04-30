import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import cors from "cors";
import moment from "moment";

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

app.post("/create", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send("Access Denied!");

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).send("Access Denied!");

    

        const values = [
            req.body.title,
            req.body.postContent,
            req.body.postDesc,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id
        ]

        const q = "INSERT INTO posts (title, postContent, postDesc, dateCreated, userId) VALUES (?)";
        db.query(q, [values]), (err, results) => {
            if (err) {
                console.log("Error: " + err)
                res.status(500).send("Internal Server Error")
            }
            else {
                console.log("Post created")
                res.status(200).send("Post created")
            }
    }})
});

app.get("/retrieve", (req, res) => {
    console.log("Retrieving posts")
    const q = "SELECT * FROM posts"
    db.query(q, (err, data) => {
        if (err) {
            console.log("Error: " + err)
            res.status(500).send("Internal Server Error")
        }
        else {
            console.log("Posts retrieved")
            res.status(200).send(data)
        }
    })
});

app.get("/signup", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});

app.post("/update", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send("Access Denied!");

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).send("Access Denied!");


        const { username } = req.body;
        const qc = "SELECT * FROM users WHERE username = ?";

        db.query(qc, [ username ], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length > 0) {
                return res.status(400).send("Username is already taken");
            }


            const q = "UPDATE users SET username = ?, name = ?, bio = ? WHERE id = ?";
            db.query(q, [req.body.username,
                req.body.name,
                req.body.bio,
                userInfo.id]), (err, results) => {
                if (err) {
                    console.log("Error: " + err)
                    res.status(500).send("Internal Server Error")
                }
                else {
                    console.log("Profile updated")
                    res.status(200).send("Profile updated")
                }
            }
        })
        })
});

app.listen(8800, () => {
    console.log("Connected to backend server");
});