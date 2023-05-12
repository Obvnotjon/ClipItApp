import { Card, Button, Container, Image } from 'react-bootstrap';
import  ProfilePicture  from '../components/ProfilePicture';
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from 'react';
import CreatePost from '../components/CreatePost';
import { useQuery } from '@tanstack/react-query';
import  { makeRequest } from "../axios";
import ClipItNav from './ClipItNav';
import { useParams } from 'react-router-dom';

function ProfileCard () {
    const { currentUser } = useContext(AuthContext);
    const [openCreate, setOpenCreate] = useState(false);

    const { username } = useParams();

    const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get(`/getprofile/${username}`).then((res) => {
        console.log(res.data)
    return res.data;
    })
);

    return (
        <>
             
            {data?.bgcover ? <div className="custom-bg-container" 
            style={{backgroundImage: `url(${data?.bgcover})`, backgroundPositionX: "center"}}/> :
            <div className="default-bg-container"/>}
            
            <ClipItNav/>

            {openCreate && <CreatePost setOpenCreate={setOpenCreate}/>}
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "31vh", maxWidth: "780px"}}>
                <Card className="my-post">
                    <Card.Body>
                       <div className = "top-image">
                            <Image src ={data?.banner} 
                            alt = "img-top" 
                            style = {{width: "100%", height: "130%"}}/>
                        </div>
                        <div>

                            {data?.pfp ? <ProfilePicture src={data?.pfp} alt="pfp"/> : 
                            <ProfilePicture src="/images/blankpfp.jpg" alt="pfp"/>}

                            <Button 
                            className="btn btn-dark btn-sm border border-white" 
                            type="button" 
                            href="/editprofile" 
                            style = {{padding: "0.3% 5.5%", float: "right", margin: "14% 0% 0%"}}
                            role="button">Edit Profile
                            </Button>                             
                        </div>
                        <br/>
                        <div className = "user info">
                            <div style ={{float: "left", width: "70%"}}>
                                <div className="card-title" style = {{padding: "5px 15px 5px 15px"}}>
                                    <h5>{data?.name}</h5>
                                    <h6 style = {{ color: "gray"}}>@{data?.username}</h6>
                                </div>
                                <p 
                                className="card-text"
                                style = {{padding: "1px 15px 20px"}}
                                ><strong>Bio: </strong>{data?.bio}</p>
                            </div>
                            <div style ={{float: "left", width: "30%"}}>
                                <div>
                                    <Button 
                                    className="btn btn-dark btn-sm border" 
                                    type="button" 
                                    href="#" 
                                    style = {{padding: "1% 20%", float: "right", margin: "5% 1%"}}
                                    role="button">Followers
                                    </Button>
                                </div> 
                                <br/>
                                <div>
                                    <Button 
                                    className="btn btn-dark btn-sm border" 
                                    type="button" 
                                    href="#" 
                                    style = {{padding: "1% 20%", float: "right", margin: "5% 1%"}}
                                    role="button">Following
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Button 
                                className="btn btn-dark border-white" 
                                style = {{width: "100%", padding: "0% 30%", margin: "auto"}}
                                onClick={() => setOpenCreate(true)}
                                >{<i className="fa-solid fa-square-plus" 
                                style= {{color: "#ffffff"}}>
                                </i>} Create Post
                                </Button>
                            </div>
                        </div>        
                    </Card.Body>    
                </Card>    
            </Container>    
        </>
    );
}

export default ProfileCard;
