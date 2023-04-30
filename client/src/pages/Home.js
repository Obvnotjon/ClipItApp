import { Card, Stack, Image, Form, Button } from "react-bootstrap";
import ClipItNav from "../components/ClipItNav";
import collapse from "bootstrap";
import { useState } from "react";
import Axios from "axios"
import "./Background.css"

function Home() {
    const [postContent, setPostContent] = useState("");
    const [postDesc, setPostDesc] = useState("");
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState("");
    const [dateCreated, setDateCreated] = useState("");

    const addPost = () => {
        Axios.post("/create", {
            title: title,
            postContent: postContent,
            postDesc: postDesc,
            dateCreated: dateCreated
        }).then(() => {
            console.log("Success")
        })
    }

    const getPosts = () => {
        Axios.get("/retrieve").then((response) => {
            setPosts(response.data)
        })
    }

    return (
        <>
        <div className="default-bg-container"/>
        <ClipItNav/>

        <div style={{backgroundColor: "gray", width: "70%", margin: "auto", marginTop: "2%", height: "290px", padding: "1%", borderRadius: "10px", borderStyle: "solid", borderWidth: "1px"}}>
            <form>
                <div>
                    <input style={{width: "100%", border: "none", fontSize: "20px", fontWeight: "bold"}}
                    type="text" placeholder="Title" onChange={(event) => {setTitle(event.target.value);}} required ></input>
                </div>

                <div style={{borderStyle: "dashed", borderWidth: "1px", marginTop: "5px"}}>
                    <input style={{width: "100%", border: "none", fontSize: "20px", fontWeight: "bold", padding : "2%"}}
                    type="file" onChange={(event) => {setPostContent(event.target.value);}} required></input>
                </div>

                <div>
                    <textarea style={{width: "100%", border: "none", fontSize: "20px", marginTop: "5px"}}
                    onChange={(event) => {setPostDesc(event.target.value);}}></textarea>
                </div>
                    
                <div style={{margin: "auto"}}>
                    <button onClick={( addPost )}> Upload </button>
                </div>
            </form>
        </div>

        <div className="feed">
                <Stack gap={1} style={{ padding: '20%', top: "10px"}}>
                    <Card className= "my-post">
                        <Stack 
                        direction="horizontal" 
                        gap={3} 
                        style={{width: '97%', margin: 'auto', 
                        paddingTop: '1%'}}>

                            <Card.Title> Post Title 1 </Card.Title>
                            <div className="bg-dark border ms-auto"> Profile Name </div>

                        </Stack>
                        <Image src="images/sunset.jpg"
                        
                        fluid
                        rounded
                        style={{padding: '2%', paddingBottom: '.5%'}}/>

                        <Stack 
                        direction="horizontal" 
                        gap={3} 
                        style={{width: '96%', margin: 'auto', 
                        paddingBottom: '.5%'}}>

                            <div className="bg-dark border">Likes </div>
                            <div className="bg-dark border ms-auto"> 2 mins ago </div>

                        </Stack>
                        <Form>
                            <div 
                            style={{width: '97%', margin: 'auto', overflow: 'hidden'}}>
                                <div 
                                className="form-floating col-md-5" style={{color: "#313131"}}>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="comment" 
                                    placeholder="comments" 
                                    style={{width: '239%', 
                                    margin: 'auto'}}/>

                                    <label> Comment </label>
                                </div>
                            </div>

                            <Stack 
                            className="d-grid gap-2 d-md-flex justify-content-md-end"
                            direction="horizontal" 
                            gap={3} 
                            style={{width: '97%', 
                            margin: 'auto', 
                            paddingTop: '.5%', 
                            paddingBottom: '.5%'}}>
                                <Button 
                                type="button" 
                                className="btn-dark btn-sm ">Comment</Button>
                            </Stack>
                        </Form>
                    </Card>


                    <Card className="my-post">
                    <Stack 
                    direction="horizontal" 
                    gap={3} 
                    style={{width: '97%', margin: 'auto', paddingTop: '1%'}}>

                            <Card.Title> Post Title 2 </Card.Title>
                            <div className="bg-dark border ms-auto"> Profile Name </div>

                        </Stack>
                        <Image src="images/flowers.jpg"
                        fluid
                        rounded
                        style={{padding: '2%', paddingBottom: '.5%'}}/>

                        <Stack 
                        direction="horizontal" 
                        gap={3} 
                        style={{width: '96%', margin: 'auto', paddingBottom: '.5%'}}>

                            <div className="bg-dark border">Likes </div>
                            <div className="bg-dark border ms-auto"> 2 mins ago </div>

                        </Stack>
                        <Form>
                            <div 
                            style={{width: '97%', margin: 'auto', overflow: 'hidden'}}>
                                <div 
                                className="form-floating col-md-5" style={{color: "#313131"}}>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="comment" 
                                    placeholder="comments" 
                                    style={{width: '239%', margin: 'auto'}}/>
                                    <label> Comment </label>
                                </div>
                            </div>

                            <Stack 
                            className="d-grid gap-2 d-md-flex justify-content-md-end"
                            direction="horizontal" 
                            gap={3} 
                            style={{width: '97%', margin: 'auto', paddingTop: '.5%', paddingBottom: '.5%'}}>

                                <Button 
                                type="submit" 
                                className="btn-dark btn-sm">Comment</Button>
                            </Stack>
                        </Form>
                    </Card>
                </Stack>
            </div>
        </>
    );
}

export default Home;