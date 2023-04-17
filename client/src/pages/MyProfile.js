//import React, { useState } from 'react';
import collapse from "bootstrap";
import { Card, Button, Container } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
//import Axios from 'axios';
import ProfilePicture from '../components/ProfilePicture';
import ClipItNav from '../components/ClipItNav';

function MyProfile () {
    //const [error, setError] = useState("")
    //const navigate = useNavigate()

    /*
        const handleLogout = async () => {
          
          };
    */
    return (
        <>
            <ClipItNav/>
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "40vh"}}>
                <Card>
                    <Card.Body>
                       <br/>
                        <div>
                            <ProfilePicture src="/images/profile.jpg" alt="pfp"/>                            
                        </div>
                        <br/>
                        <h5 className="card-title">Profile Name</h5>
                        <h6>@JonReyna</h6>
                        <p className="card-text"><strong>Bio: </strong>Chicken Banana Soup with a side of chili cheese sprite on a cool hot winter breakfast with a side of huge random text deepfried with coke</p>
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
        </>
    );
}
export default MyProfile;