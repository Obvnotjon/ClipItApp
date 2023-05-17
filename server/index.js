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

app.get("/suggestusers", (req, res) => {
  const q = `SELECT id, name, username, pfp FROM smdb.users;`;
  db.query(q, (error, result) => {
     res.send(result);
  });
});

//get the users friends for the freindsys table from mysql
app.get("/friends/:username", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Invalid token");
  
      const username = req.params.username;
      const q = `SELECT u.username, u.pfp, u.banner, f.* 
      FROM friendsys AS f
      JOIN users AS u ON (f.followingUserId = u.id)
      WHERE f.followerUserId = ?`;
  
      db.query(q, [username], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(data);
      });
    });
  });

//Updates user info from edit profile page
app.put("/updateuser", (req, res) => {
    const token= req.cookies.access_token;
  
    if(!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "jwtKey", (err, userInfo) => {
        if (err) {
            return res.status(500).json("Invalid token")
        }
        const q = "UPDATE users SET `name` = ?,`bio` = ?, `pfp` = ?, `banner` = ?, `bgcover` = ? WHERE id = ?";
        const values = [
            req.body.name, req.body.bio,
            req.body.pfp, req.body.banner,req.body.bgcover, userInfo.id
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (data.affectedRows > 0) {
                return res.json({message: "User updated"})
            }
            
        });
    });
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

  app.post('/delete/:postId', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM posts WHERE id = ? AND userId = ?";
  
      db.query(q, [req.params.postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("Post has been deleted.");
        return res.status(403).json("You can only delete your own posts!");
      });
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

app.get('/friendship-status/:friendId', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const friendId = req.params.friendId;
  
      // Check if the user and friend are friends
      const q = 'SELECT * FROM friendsys WHERE followerUserId = ? AND followingUserId = ?';
  
      db.query(q, [userInfo.id, friendId], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        if (result.length > 0) {
          // User and friend are friends
          return res.status(200).json('friends');
        }
  
        // User and friend are not friends
        return res.status(200).json('not_friends');
      });
    });
  });

  app.post('/addfriend', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const friendId = req.body.friendId; // Assuming the friend's ID is sent in the request body
  
      // Check if the user is already added as a friend
      const q = 'SELECT * FROM friendsys WHERE followerUserId = ? AND followingUserId = ?';
  
      db.query(q, [userInfo.id, friendId], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        if (result.length > 0) {
          // User is already added as a friend
          return res.status(200).json('User is already a friend');
        }
  
        // Add the user as a friend
        const insertQuery = 'INSERT INTO friendsys (followerUserId, followingUserId) VALUES (?, ?)';
  
        db.query(insertQuery, [userInfo.id, friendId], (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          // Friend successfully added
          return res.status(200).json('Friend added');
        });
      });
    });
  });
  
  // Remove a friend
  app.post('/removefriend', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const friendId = req.body.friendId;
  
      // Remove the friendship between the user and the friend
      const q = 'DELETE FROM friendsys WHERE (followerUserId = ? AND followingUserId = ?) OR (followerUserId = ? AND followingUserId = ?)';
      const values = [userInfo.id, friendId, friendId, userInfo.id];
  
      db.query(q, values, (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        if (result.affectedRows > 0) {
          // Friendship removed successfully
          return res.status(200).json('Friend removed');
        }
  
        // Friendship not found or already removed
        return res.status(404).json('Friendship not found');
      });
    });
  });

  app.post('/addcomment', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not logged in');
  
    jwt.verify(token, 'jwtKey', (err, userInfo) => {
      if (err) return res.status(403).json('Invalid token');
  
      const q =
        'INSERT INTO comments (postId, userId, commentDesc, dateCreated) VALUES (?, ?, ?, ?)';
      const values = [
        req.body.postId,
        userInfo.id,
        req.body.commentDesc,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      ];
  
      db.query(q, values, (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        // Comment successfully added
        return res.status(200).json('Comment added');
      });
    });
  });

  //get the comments for a post
  app.get("/getcomments/:postId", (req, res) => {
    const q = `SELECT c.*, u.id AS userId, u.name, u.username, u.pfp
      FROM comments AS c
      JOIN users AS u ON u.id = c.userId
      WHERE c.postId = ?
      ORDER BY c.dateCreated DESC`;
  
    db.query(q, [req.params.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });

  app.post('/delete/comment/:commentId', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM comments WHERE id = ? AND userId = ?";
  
      db.query(q, [req.params.commentId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("Comment has been deleted.");
        return res.status(403).json("You can only delete your own comments!");
      });
    });
  });

  app.post('/likepost/:postId', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO likes (userId, postId) VALUES (?, ?)";
  
      db.query(q, [userInfo.id, req.params.postId], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.affectedRows > 0) {
          return res.status(200).json("Post has been liked.");
        }
  
        return res.status(403).json("You can only like a post once!");
      });
    });
  });

  app.post('/unlikepost/:postId', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";
  
      db.query(q, [userInfo.id, req.params.postId], (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.affectedRows > 0) {
          return res.status(200).json("Post has been unliked.");
        }
  
        return res.status(403).json("You haven't liked this post.");
      });
    });
  });

  app.get('/like-status/:postId', (req, res) => {
    const { postId } = req.params;
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json("Not logged in!");
    }
  
    jwt.verify(token, "jwtKey", (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
  
      const q = "SELECT * FROM likes WHERE userId = ? AND postId = ?";
    
      db.query(q, [userInfo.id, postId], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        if (data.length > 0) {
          return res.status(200).json("liked");
        }
  
        return res.status(200).json("not-liked");
      });
    });
  });

  app.get('/like-count/:postId', (req, res) => {
    const { postId } = req.params;
  
    const q = "SELECT COUNT(*) as likeCount FROM likes WHERE postId = ?";
    
    db.query(q, [postId], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      const likeCount = data[0].likeCount;
      return res.status(200).json({ likeCount });
    });
  });


app.listen(8800, () => {
    console.log("Connected to backend server");
});
