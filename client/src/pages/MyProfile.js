import  ProfilePicture  from '../components/ProfilePicture';
import { Card, Button, Container, Stack, Image, Form } from 'react-bootstrap';
import { AuthContext } from "../context/authContext";
import ClipItNav from '../components/ClipItNav';
import React, { useContext, useState } from 'react';
import collapse from "bootstrap";
import Axios from 'axios';
import  { makeRequest } from "../axios";
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import PostPfp from '../components/PostPfp';
import CreatePost from '../components/CreatePost';

function MyProfile () {
    const { currentUser} = useContext(AuthContext);
    const [openCreate, setOpenCreate] = useState(false);



    //const [error, setError] = useState("")
    //const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [title, getTitle] = useState(currentUser?.title);
    const [postContent, getPostContent] = useState(currentUser?.postContent);
    const [desc, getDesc] = useState(currentUser?.desc);
    const [dateCreated, getDateCreated] = useState(currentUser?.dateCreated);


    const { isLoading, error, data } = useQuery(["getmyposts"], () =>
        makeRequest.get("/getmyposts").then((res) => {
        return res.data;
        })
    );
/*
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
*/
    return (
        <>
            
            <div className="custom-bg-container"/>
            <ClipItNav/>

            {openCreate && <CreatePost setOpenCreate={setOpenCreate}/>}
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "31vh", maxWidth: "780px"}}>
                <Card className="my-post">
                    <Card.Body>
                       <br/>
                        <div>
                        {currentUser?.pfp ? <ProfilePicture src={currentUser?.pfp} alt="pfp"/> : 
                            <ProfilePicture src="images/blankpfp.jpg" alt="pfp"/>}                            
                        </div>
                        <br/>
                        <h5 className="card-title">{currentUser?.name}</h5>
                        <h6>@{currentUser?.username}</h6>
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

            <div className ="d-grid justify-content-md-center">
                <Button className="btn btn-dark" onClick={() => setOpenCreate(true)}>Create Post</Button>
            </div>

            <div className="posts">
            {error ? "Whoops, unexpected error occured" :
             isLoading ? "loading" :
             data.map((post) =>
                <div className="post" key={post.id}>
                    <Container className="d-flex align-items-center justify-content-center" style={{ maxWidth: "780px" }}>
                    <Stack>
                    <Card className= "my-post">
                        <Stack 
                        direction="horizontal" 
                        gap={3} 
                        style={{width: '97%', margin: 'auto', 
                        paddingTop: '2%'}}>

                            <div className="ms-start">{post.pfp ? <PostPfp src={post.pfp} alt="pfp"/> : 
                                <PostPfp src="images/blankpfp.jpg" alt="pfp"/>} {post.name}</div>
                            <div className="ms-auto">{moment(post.dateCreated).fromNow()}</div>

                        </Stack>
                        <Image src={post.postContent}
                        
                        fluid
                        rounded
                        style={{padding: '2%', paddingBottom: '.5%'}}/>

                        <Stack direction="horizontal" gap={3} 
                        style={{width: '96%', margin: 'auto', 
                        paddingBottom: '.5%'}}>
                            
                            <Card.Title>{post.postDesc}</Card.Title>
                            
                        </Stack>
                        <Form>
                            <div 
                            style={{width: '97%', margin: 'auto', overflow: 'hidden'}}>
                                <div className="form-floating col-md-5" style={{color: "#313131"}}>
                                    <input type="text" className="form-control" 
                                    id="comment" placeholder="comments" 
                                    style={{width: '239%', margin: 'auto'}}/>
                                    <label> 
                                        Comment 
                                    </label>
                                </div>
                            </div>

                            <Stack className="d-grid gap-2 d-md-flex justify-content-md"
                            direction="horizontal" gap={3} 
                            style={{width: '97%', margin: 'auto', 
                            paddingTop: '.5%', paddingBottom: '.5%'}}>
                                <div>
                                    <i className="fa-solid fa-heart" style={{ padding: "15px 11px"}}/>
                                </div> 
                                <Button type="button" className="btn-dark btn-sm ">
                                    Comment
                                </Button>
                            </Stack>
                        </Form>
                    </Card>
                    </Stack>
                    </Container>
                </div>
            )}
        </div>     
        </>
    );
}
export default MyProfile;