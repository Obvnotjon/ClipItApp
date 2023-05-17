import { Card, Button, Container, Image } from 'react-bootstrap';
import  ProfilePicture  from '../components/ProfilePicture';
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from 'react';
import CreatePost from '../components/CreatePost';
import { useQuery } from '@tanstack/react-query';
import  { makeRequest } from "../axios";
import ClipItNav from './ClipItNav';
import { useParams } from 'react-router-dom';
import FriendCheck from './FriendCheck';

function ProfileCard () {
    const { currentUser } = useContext(AuthContext);
    const [openCreate, setOpenCreate] = useState(false);

    const { username } = useParams();

    const { isLoading, error, data } = useQuery(["users"], () =>
        makeRequest.get(`/getprofile/${username}`).then((res) => {
        return res.data;
        })
    );
    
    return (
        <>  
            {data?.bgcover ? <div className="custom-bg-container" 
            style={{backgroundImage: `url(${data?.bgcover})`, backgroundPositionX: "center"}}/> :
            <div className="default-bg-container"/>}
            
            <ClipItNav/>
            {error ? <h1 style={{color: "white"}}>Whoops unexpected Error: Page may not exist</h1> :
            isLoading ? <h1 style={{color: "white"}}>Loading...</h1> : 
            <>
            {openCreate && <CreatePost setOpenCreate={setOpenCreate}/>}
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "31vh", maxWidth: "780px"}}>
                <Card className="my-post">
                    <Card.Body>
                       <div className = "top-image">
                            {data?.banner ? 
                                <Image src ={data?.banner} 
                                alt = "img-top" 
                                style = {{width: "100%", height: "130%"}}/> : 
                                <Image src="/images/212121.jpg" 
                                alt = "img-top" 
                                style = {{width: "100%", height: "130%"}}/>
                            }
                        </div>
                        <div>
                            {data?.pfp ? <ProfilePicture src={data?.pfp} alt="pfp"/> : 
                            <ProfilePicture src="/images/blankpfp.jpg" alt="pfp"/>}                             
                        </div>
                        <br/>
                        <div className = "user info">
                            <div style ={{float: "left", width: "70%"}}>
                                <div className="card-title" style = {{padding: "5px 15px 5px 5px"}}>
                                    <h5>{data?.name}</h5>
                                    <h6 style = {{ color: "gray"}}>@{data?.username}</h6>
                                </div>
                                <p 
                                className="card-text"
                                style = {{padding: "5px 15px 20px 5px"}}
                                ><strong>Bio: </strong>{data?.bio}</p>
                            </div>
                            <div style ={{float: "left", width: "30%"}}>
                                <div>
                                    { data?.id === currentUser?.id ?
                                    <Button 
                                    className="btn btn-dark btn-sm border" 
                                    type="button" 
                                    href="/editprofile" 
                                    style = {{padding: "1% 15%", float: "right", margin: "5% 1%"}}
                                    role="button">Edit Profile
                                    </Button> : <FriendCheck friendId={data?.id}/>
                                    }
                                    <Button 
                                    className="btn btn-dark btn-sm border" 
                                    type="button" 
                                    href={`/friends/${data?.id}`} 
                                    style = {{padding: "1% 15%", float: "right", margin: "5% 1%"}}
                                    role="button">Friends List
                                    </Button>
                                </div> 
                            </div>
                            <div>
                            {data?.id === currentUser?.id ? 
                                <Button 
                                className="btn btn-dark border-white" 
                                style = {{width: "100%", padding: "0% 30%", margin: "auto"}}
                                onClick={() => setOpenCreate(true)}
                                >{<i className="fa-solid fa-square-plus" 
                                style= {{color: "#ffffff"}}>
                                </i>} Create Post
                                </Button> :
                                <br/>
                            }    
                            </div>
                        </div>        
                    </Card.Body>    
                </Card>    
            </Container>
            </> 
            }   
        </>
    );
}

export default ProfileCard;
