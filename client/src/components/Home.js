import { Card, Stack, Image, Form, Button } from "react-bootstrap";
import collapse from "bootstrap";
import Axios from "axios"
import { useState} from "react";


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
            <nav className="navbar navbar-dark bg-dark">
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
                        <a className="nav-link" href="/myprofile">Profile</a>
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
        
        <div className="upload-section">
            <form>
                <input type="text" placeholder="Title" onChange={(event) => {setTitle(event.target.value);}} required ></input>
                <input type="file" onChange={(event) => {setImage(event.target.value);}} required></input>
                <input type='number ' onChange={(event) => {setUserID(event.target.value);}}></input>
                <button onClick={( addPost )}> Upload </button>
            </form>
        </div>
        <div className="feed">
                <Stack gap={4} style={{ padding: '20%' }}>

                    
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