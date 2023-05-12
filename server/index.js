import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import cors from "cors";
import moment from "moment";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//init db connection
const db = mysql2.createConnection({
    host:"clipit-sm-db.co8sylbqcwmx.us-east-2.rds.amazonaws.com",
    user: "clipitadmin",
    password:"CSE4550SMWA!",
    database:"smdb"
});

//Declare file storage connection info
cloudinary.config({
    cloud_name: "dqcjnd8nm",
    api_key: "224925634256454",
    api_secret: "aq6ldxh6BBLF7rRgnaYdXI_D9n8"
  });

 //Create a new storage folder within Cloudinary 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'postMedia',
      allowed_formats: ['jpg', 'png', 'gif', 'mp4'],
      public_id: (req, file) => `${Date.now()}_${file.originalname}`,
      resource_type: "auto"
    },
});


//Use multer for uploading files to file storage
const upload = multer({ storage: storage });

//Makes req to Cloudinary to upload file into Cloudinary and return Url
app.post("/upload", upload.single("file"), (req, res) =>{
    const file= req.file;
    cloudinary.uploader.upload(file.path, { resource_type: "auto" }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        const fileUrl = result.secure_url;
        res.status(200).json(fileUrl);
    }); 
});

//makes req to db to add post info into posts table
app.post("/addpost", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token")

        const q = "INSERT INTO posts (`postDesc`, `postContent`, `dateCreated`, `userId`) VALUES (?)";
        const values = [
            req.body.postDesc,
            req.body.postContent,
            moment(Date.now()).format("YYYY-MM-DD HH:mm::ss"),
            userInfo.id
        ]

        db.query(q, [ values ], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Post created");
        });
    });
});


/*
//Updates user info from edit profile page
app.put("/updateuser", (req, res) => {
    const token= req.cookies.access_token;
    if(!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(500).json("Invalid token")

        const q = "UPDATE users SET `name` = ?, `bio` = ?, `pfp` = ?, `banner` = ?, bgcover` = ? WHERE id = ?";
        const values = [ req.body.name, req.body.bio, req.body.pfp, req.body.banner, req.body.bgcover];
        db.query(q, [ values ], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (data.affectedRows > 0) {
                return res.json("User updated")
            }
            
        });
    });
});
*/

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

//Retrieves post data of all friends current user has added
app.get("/getposts", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).jason("Invalid token")

        const q = `SELECT DISTINCT p.*, u.id AS userId, name, username, pfp FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
        LEFT JOIN friendsys AS f ON (p.userId = f.followingUserId) WHERE f.followerUserId = ? OR p.userId = ?
        ORDER BY p.dateCreated DESC`;

        db.query(q, [userInfo.id, userInfo.id ], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(data);
        });
    });
});

/*
//Gets post data of user currently logged in
app.get("/getmyposts", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in")

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token")

        const q = `SELECT p.*, u.id AS userId, username, name, pfp FROM posts AS p 
        JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? 
        ORDER BY p.dateCreated DESC`;

        db.query(q, [userInfo.id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(data);
        });
    });
});
*/

app.get("/getuserposts/:username", (req, res) => {
    const { username } = req.params;

    const q = `SELECT p.*, u.id AS userId, username, name, pfp FROM posts AS p 
    JOIN users AS u ON (u.id = p.userId) WHERE u.username = ? 
    ORDER BY p.dateCreated DESC`;

    db.query(q, [ username ], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
});

//Gets profile card data for url of profile/username 
app.get("/getprofile/:username", (req, res) => {
    const { username } = req.params;
    const q = "SELECT * FROM users WHERE username = ?";
        
    db.query(q, [ username ], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            res.status(404).json("User Not Found");
            return;
        }
        const {password, email, ...userInfo} = results[0];
        return res.status(200).json(userInfo);
    });
});


app.listen(8800, () => {
    console.log("Connected to backend server");
});

// This function gets all the posts in the database, but we only want to display posts from friends
/*
app.get("/getposts", (req, res) => {
    const q = "SELECT p.*, u.id AS userId, name, pfp FROM posts AS p JOIN users AS u ON (u.id = p.userId)";

    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
});
*/

/*
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
    }});
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
    });
});

app.get("/signup", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
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
        });
    });
});
*/