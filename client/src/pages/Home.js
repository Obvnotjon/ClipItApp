import { Card, Stack, Image, Form, Button } from "react-bootstrap";
import collapse from "bootstrap";
import Axios from "axios"
import { useState} from "react";
import ClipItNav from "../components/ClipItNav";

function Home() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [userID, setUserID] = useState("");

    const addPost = () => {
        Axios.post("http://localhost:8800/create", {
          title: title,
          image: image,
          userID: userID,
        }).then(() => {
            console.log("success");
        });
    }

    const getPost = () => {
        Axios.get("http://localhost:8800/retrieve", {
          title: title,
          image: image,
        }).then(() => {
            console.log("success");
        });
    }

    return (
        <>
            <ClipItNav />
            <div className="upload-section">
                <form>
                    <input type="text" placeholder="Title" onChange={(event) => {setTitle(event.target.value);}} required ></input>
                    <input type="file" onChange={(event) => {setImage(event.target.value);}} required></input>
                    <input type='number ' onChange={(event) => {setUserID(event.target.value);}}></input>
                    <button onClick={( addPost )}> Upload </button>
                </form>
            </div>
            <div className="feed">
                    <Stack gap={4} style={{ padding: '25%'}}>

                        
                        <Card>
                            <Stack direction="horizontal" gap={3} style={{width: '97%', margin: 'auto', paddingTop: '1%'}}>
                                <Card.Title> Post Title 1 </Card.Title>
                                <div className="bg-light border ms-auto"> Profile Name </div>
                            </Stack>
                            <Image src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                            fluid
                            rounded
                            style={{padding: '2%', paddingBottom: '.5%'}}/>
                            <Stack direction="horizontal" gap={3} style={{width: '96%', margin: 'auto', paddingBottom: '.5%'}}>
                                <div className="bg-light border">Likes </div>
                                <div className="bg-light border ms-auto"> 2 mins ago </div>
                            </Stack>
                            <Form>
                                <div style={{width: '97%', margin: 'auto'}}>
                                    <div className="form-floating col-md-5">
                                        <input type="text" className="form-control" id="comment" placeholder="comments" style={{width: '239%', margin: 'auto'}}/>
                                        <label> Comment </label>
                                    </div>
                                </div>
                                <Stack direction="horizontal" gap={3} style={{width: '97%', margin: 'auto', paddingTop: '.5%', paddingBottom: '.5%'}}>
                                    <Button type="submit" className="btn-dark btn-sm">Comment</Button>
                                </Stack>
                            </Form>
                        </Card>


                        <Card>
                        <Stack direction="horizontal" gap={3} style={{width: '97%', margin: 'auto', paddingTop: '1%'}}>
                                <Card.Title> Post Title 2 </Card.Title>
                                <div className="bg-light border ms-auto"> Profile Name </div>
                            </Stack>
                            <Image src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                            fluid
                            rounded
                            style={{padding: '2%', paddingBottom: '.5%'}}/>
                            <Stack direction="horizontal" gap={3} style={{width: '96%', margin: 'auto', paddingBottom: '.5%'}}>
                                <div className="bg-light border">Likes </div>
                                <div className="bg-light border ms-auto"> 2 mins ago </div>
                            </Stack>
                            <Form>
                                <div style={{width: '97%', margin: 'auto'}}>
                                    <div className="form-floating col-md-5">
                                        <input type="text" className="form-control" id="comment" placeholder="comments" style={{width: '239%', margin: 'auto'}}/>
                                        <label> Comment </label>
                                    </div>
                                </div>
                                <Stack direction="horizontal" gap={3} style={{width: '97%', margin: 'auto', paddingTop: '.5%', paddingBottom: '.5%'}}>
                                    <Button type="submit" className="btn-dark btn-sm">Comment</Button>
                                </Stack>
                            </Form>
                        </Card>


                        <Card>
                        <Stack direction="horizontal" gap={3} style={{width: '97%', margin: 'auto', paddingTop: '1%'}}>
                                <Card.Title> Post Title 3 </Card.Title>
                                <div className="bg-light border ms-auto"> Profile Name </div>
                            </Stack>
                            <Image src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                            fluid
                            rounded
                            style={{padding: '2%', paddingBottom: '.5%'}}/>
                            <Stack direction="horizontal" gap={3} style={{width: '96%', margin: 'auto', paddingBottom: '.5%'}}>
                                <div className="bg-light border">Likes </div>
                                <div className="bg-light border ms-auto"> 2 mins ago </div>
                            </Stack>
                            <Form>
                                <div style={{width: '97%', margin: 'auto'}}>
                                    <div className="form-floating col-md-5">
                                        <input type="text" className="form-control" id="comment" placeholder="comments" style={{width: '239%', margin: 'auto'}}/>
                                        <label> Comment </label>
                                    </div>
                                </div>
                                <Stack direction="horizontal" gap={3} style={{width: '97%', margin: 'auto', paddingTop: '.5%', paddingBottom: '.5%'}}>
                                    <Button type="submit" className="btn-dark btn-sm">Comment</Button>
                                </Stack>
                            </Form>
                        </Card>
                    </Stack>
                </div>
        </>
    );
}

export default Home;