import ProfilePicture from '../components/ProfilePicture';
import { Card, Button, Container, Stack } from 'react-bootstrap';
import { AuthContext } from "../context/authContext";
import ClipItNav from '../components/ClipItNav';
import React, { useContext, useState } from 'react';
import collapse from "bootstrap";
import Axios from 'axios';




function MyProfile () {
    const { currentUser} = useContext(AuthContext);
    //const [error, setError] = useState("")
    //const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [title, getTitle] = useState(currentUser?.title);
    const [postContent, getPostContent] = useState(currentUser?.postContent);
    const [desc, getDesc] = useState(currentUser?.desc);
    const [dateCreated, getDateCreated] = useState(currentUser?.dateCreated);

    const getPosts = () => {
        Axios.get("/retrieve").then((response) => {
            setPosts(response.data)
        })
    }

    return (
        <>
            <div className="custom-bg-container"/>
            <ClipItNav/>
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "31vh", maxWidth: "900px"}}>
                <Card className="my-post">
                    <Card.Body>
                       <br/>
                        <div>
                            <ProfilePicture src="/images/profile.jpg" alt="pfp"/>                            
                        </div>
                        <br/>
                        <h5 className="card-title">{currentUser?.name}</h5>
                        <h6>@{currentUser.username}</h6>
                        <p className="card-text"><strong>Bio: </strong>{currentUser.bio}</p>
                        <div className="d-grid gap-1 d-md-flex justify-content-md-start">
                            <Button className="btn btn-dark btn-sm" type="button" href="/editprofile" role="button">Edit Profile
                            </Button>
                            <Button className="btn btn-dark btn-sm" type="button" href="#" role="button">Friends
                            </Button>
                            <Button className="btn btn-dark btn-sm" type="button" href="#" role="button">Following
                            </Button>
                        </div>        
                    </Card.Body>    
                </Card>
            </Container>

            <div style={{backgroundColor: "white", width: "1000px", margin: "auto"}}>
                <h4> title </h4>
                <div> {postContent} </div>
                <div> {dateCreated} </div>
                <div> {desc} </div>
            </div>
            
            <div className="feed">
                <Stack gap={4} style={{ padding: '25%'}}>
                    {posts.map((post) => {
                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={post.postContent} />
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.desc}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Stack>
            </div>       
        </>
    );
}
export default MyProfile;