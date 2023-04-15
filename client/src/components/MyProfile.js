import React, { useState } from 'react';
import collapse from "bootstrap";
import { Card, Button, Container, Image, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ProfilePicture from './ProfilePicture';


function MyProfile () {
    const [error, setError] = useState("")
    const navigate = useNavigate()

        const handleLogout = async () => {
          
          };

    /*
    Everything Under the <nav> </nav> is just for testing routing pages to the other account page options.
    Change code as needed
    */
    return (
        <>
        <div className="homeContainer">
            <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>    
                <a className="navbar-brand" href="/"><img src="/Assets/images/templogo.png" alt="logo" width="25" height="25" className="d-inline-block align-text-top"/>
                Clip It!</a>
                <div className="offcanvas offcanvas-start text-bg-dark" style={{ '--bs-offcanvas-width': 'min(95vw, 200px)' }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dashboard</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ">
                <form className="d-flex mt-1" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-sm btn-light" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-1  align-items-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="/myprofile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </nav>
        </div>

        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
            <div className="w-100" style={{ maxWidth: '450px' }}>
            <Card>
                <Card.Body>
                        <br/>
                        <div>
                            <ProfilePicture src="/images/profile.jpg" alt="pfp"></ProfilePicture>                            
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
            </div>
        </Container>
            

        <Container className="d-flex align-items-end justify-content-center" style={{ minHeight: "50vh" }}>
        <div className="w-100" style={{ maxWidth: '450px' }}>
            <br/>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
        </Container>       
        </>
    );
}
export default MyProfile;