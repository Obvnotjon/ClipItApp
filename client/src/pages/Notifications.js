import React, { useState, useContext, useEffect } from 'react';
import ProfilePicture from '../components/ProfilePicture';
import { Card, Image, Button, Container, NavItem } from "react-bootstrap";
import ClipItNav from '../components/ClipItNav';
import { useQuery } from '@tanstack/react-query';
import PostPfp from '../components/PostPfp';
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";
import { Link } from "react-router-dom";


function Notifications() {
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(['users'], () =>
        makeRequest.get("/suggestusers").then((res) => {
            return res.data;
        }));

    return (

        <>
            <div className="bg-container" />
            <ClipItNav />

            <br></br>
            <Container className="d-flex" style={{ minHeight: "31vh", maxWidth: "780px" }}>

                <Card className="my-post" style={{ width: "780px", height: "1580px", margin: "auto" }}>


                    <h4 style={{ padding: "3%" }}>
                        {currentUser?.pfp ? <PostPfp src={currentUser?.pfp} alt="pfp" /> :
                            <PostPfp src="images/blankpfp.jpg" alt="pfp" />} Notifications for {currentUser?.username}
                    </h4>


                    <div style={{ padding: "1%" }}>
                        <Card className="my-post">
                            <h5 style={{ padding: "3%" }}>Requests</h5>
                            <div style={{ margin: "1%" }}>

                                <h6>{currentUser?.pfp ? <PostPfp src={currentUser?.pfp} alt="pfp" /> :
                                    <PostPfp src="images/blankpfp.jpg" alt="pfp" />} @{currentUser?.username} has requested to follow you
                                    <Button className="btn-dark btn-sm border-light" style={{ padding: "0.5px 10px", margin: "3px" }}>
                                        Accept
                                    </Button>
                                    <Button className="btn-dark btn-sm border-light" style={{ padding: "0.5px 10px" }}>
                                        Decline
                                    </Button></h6>

                            </div>

                        </Card>
                    </div>

                    <div style={{ padding: "1%" }}>
                        <Card className="my-post">
                            <h5 style={{ padding: "3%" }}>Messages</h5>
                            <p style={{ padding: "3%" }}>No messages at the moment</p>
                        </Card>
                    </div>

                    <div className="users">
                    <div style={{ padding: "1%" }}>
                        <Card className="my-post">
                        <h5 style={{ padding: "3%" }}>Suggested accounts</h5>
                        <div>
                            {error ? (
                            "Whoops, that wasn't supposed to happen. Please go back."
                            ) : isLoading ? (
                            <p>Loading...</p>
                            ) : Array.isArray(data) ? (
                            data.map((post) => (
                                <div key={post.id}>
                                <h5 style={{ margin: "1%" }}>
                                    {post.pfp ? (
                                    <PostPfp src={post.pfp} alt="pfp" />
                                    ) : (
                                    <PostPfp src="images/blankpfp.jpg" alt="pfp" />
                                    )}
                                    <Link
                                    to={`/profile/${post.username}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                    {post.username}
                                    </Link>{" "}
                                    <Button
                                    className="btn-dark btn-sm border-light"
                                    style={{ padding: "0.5px 10px" }}
                                    >
                                    Follow
                                    </Button>
                                </h5>
                                </div>
                            ))
                            ) : null}
                        </div>
                        </Card>
                        <br></br>
                    </div>
                    </div>
                </Card>

            </Container>
        </>
    );

}

export default Notifications;