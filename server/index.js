import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
const db = mysql2.createConnection({
    host:"localhost",
    user: "root",
    password:"CIWA@23se4550",
    database:"smdb"
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello this is the backend")
});

app.get("/profile", (req, res)=>{
    const q = "SELECT * FROM profile"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});

app.get("/posts", (req, res)=>{
    const q = "SELECT * FROM posts"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});

app.post("/posts", (req, res)=>{
    const q = "INSERT INTO posts (`comment`,`postcontent`) VALUES (?)";
    const values = [
        req.body.comment,
        req.body.postcontent
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});


app.listen(8803, () => {
    console.log("Connected to backend server");
});