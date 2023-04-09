import { collapse } from "bootstrap";
import { Card, Container } from "react-bootstrap";
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import React from "react";

function Home() {
    const [posts, setPosts] = useState([])

useEffect(()=>{
    const fetchAllPosts = async ()=>{
        try {
            const res = await Axios.get("http://localhost:8803/posts")
            setPosts(res.data)
            console.log(res)
        }
        catch(err) {
            console.log(err)
        }
    }
    fetchAllPosts();
}, [])
    /*
    Everything Under the <nav> </nav> is just for testing routing pages to the other account page options.
    Change code as needed
    */
    return (
        <>
        <div className="wrapper">
        <div className="homeContainer">
            <nav className="navbar fixed-top navbar-dark bg-dark">
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
                        <a className="nav-link" href="/myprofile">MyProfile</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </nav>
            <br/>


            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
            <div className="w-100" style={{ maxWidth: '450px' }}>
            <div className="posts">
                {posts.map(post=>(
                    <div className="post" key={post.id}>  
                        {post.postcontent && <img src={post.postcontent} alt="" />}
                        <Card className="mb-3">
                        
                        <Card.Body>
                        <img src={post.content} className="card-img-top" alt="..."/>
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">{post.comment}</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            </div>
            </Container>
        </div>
        </div>
        </>
    );
}

export default Home;