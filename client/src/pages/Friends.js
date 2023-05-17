import { Card, Stack, Image, Form, Button, Container } from "react-bootstrap";
import ClipItNav from "../components/ClipItNav";
import { useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../axios';
import { useLocation } from "react-router-dom";
import ProfilePicture from '../components/ProfilePicture';



function Friends() {
  const { currentUser } = useContext(AuthContext);

    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["friends"], () =>
    makeRequest.get(`/friends/${userId}`).then((res) => {
    console.log(res.data);
    return res.data;
    })
);

    
    const isCurrentUser = currentUser.id === userId;
    
  return(
    <>
      <div className="default-bg-container"></div>
      <ClipItNav/>
      <div className="custom-bg-container" style={{marginTop: "-20px"}}/>
      <div className=" text-center" style={{backgroundColor: "white", width: "900px", margin: "auto", fontSize: "30px", fontWeight: "bold", marginTop: "50px", padding: "10px", borderRadius: "10px"}}> Friends
       of {userId}
      <div style={{marginRight: "800px"}}> 
        <Button className=" btn btn-dark btn-sm" href={`/profile/${currentUser.username}`} style={{width: "880px"}}> My Profile </Button>
      </div>
      <div className="friends">
            {error ? "Whoops, unexpected error occured" :
             isLoading ? "loading" :
            data.map((friend) =>
                <div className="friend" key={friend.id}>
                    <Stack style={{padding: "10px"}}>
                      <Link to={`/profile/${friend.username}`}>
                        <div>
                          <div style={{marginRight: "800px"}}>
                            {friend?.pfp ? <Image src={friend?.pfp} alt="pfp" style={{width: '100px', height: '100px', objectFit: 'cover',
                            position: "absolute", zIndex: "2", marginTop: "25px",
                            border: "1px solid #292929", borderRadius: "50%"}}/> : 
                            <Image src="/images/blankpfp.jpg" alt="pfp" style={{width: '100px', height: '100px', objectFit: 'cover',
                            position: "absolute", zIndex: "2", marginTop: "25px", border: "1px solid #292929", borderRadius: "50%"}}/>}
                          <div>
                            <p style={{position: "absolute", marginLeft: "150px", marginTop: "50px", color: "#d1cfd0"}}> {friend.username} </p>
                          </div>
                          </div>
                            {friend?.banner ? 
                            <Image src ={friend?.banner} 
                            alt = "banner" style={{width: '96%', height: '150px', objectFit: 'cover',
                            zIndex: "0", borderRadius: "10px", border: "1px solid #292929"}}/> : 
                            <Image src="/images/212121.jpg" 
                            alt = "banner" style={{width: '96%', height: '150px', objectFit: 'cover',
                            zIndex: "0", borderRadius: "10px", border: "1px solid #292929"}}/>}
                          </div>
                        </Link>
                    </Stack>
                </div>
            )}
        </div>
        </div>

    </>
  )
  
}

export default Friends;