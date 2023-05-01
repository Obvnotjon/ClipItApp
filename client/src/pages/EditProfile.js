import { Form, Button, Card, Container } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture';
import ClipItNav from '../components/ClipItNav';
import { useState } from 'react';
import Axios from 'axios';

function EditProfile() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState(null);

    const updateUserInfo = () => {
        Axios.post("/update", {
            name: name,
            username: username,
            bio: bio,
        }).then(() => {
            console.log("Success");
        }).catch((error) => {
            setError(error.response.data);
        });
    }
    return (
        <>
        <div className="default-bg-container"/>
        <ClipItNav/>
        <h4 className="text-center text-light">Edit Profile</h4>
        <Container
                className="d-flex align-items-center justify-content-center" 
                style={{ minHeight: "50vh" }}>

            <div className="w-100" style={{ maxWidth: '500px' }}>        
          <Card className='my-post'>
                <Card.Body>
                        <br/>
                            <div>

                            <ProfilePicture 
                            src="/images/blankpfp.jpg" 
                                alt="pfp" 
                                id = "pfpic"
                                >
                            </ProfilePicture>    

                        
                            <input 
                                type = "file"
                                accept = "image/jpg, image/png, image/jpeg"
                                id = "input-file"
                                style= {{display: "none"}}>
                                
                                
                            </input>   

                            <label htmlFor = "input-file" 
                                className = "rounded"
                                style = {{
                                    display: "block", 
                                    width: "150px",
                                    height: "35px",
                                    border: "1px solid white",
                                    background: "#263238", 
                                    color: "#fff", 
                                    padding: "5px 20px", 
                                    margin: "10px 1px"
                                    
                                    
                                    
                                    }}>Update Image
                            </label> 

                            </div>
                        <br/>

                <Form.Group 
                            id="profilename"
                            className = "form-group input-group">
    
                        <Form.Control
                        className = {"form-control"}     
                        type="text" 
                        name="profilename" 
                        placeholder = "Profile Name"
                        />
                </Form.Group>
                <div className="row mt-3"></div>

                <div className="mb-1">
                    
        <label 
        htmlFor="exampleFormControlTextarea1" 
        className="form-label"></label>

        <textarea className="form-control" placeholder = "Bio" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
                <div className="row mt-5"></div>
                        <div 
                        className="d-grid gap-1 d-md-flex justify-content-md-start">
                            <Button 
                                className="btn btn-sm border-light" 
                                type="button" 
                                href="#" 
                                role="button"
                                style={{background: "#263238"}}>Followers
                            </Button>

                            <Button 
                                className="btn btn-sm border-light"
                                type="button" 
                                href="#" 
                                role="button"
                                style={{background: "#263238"}}>Following
                            </Button>
                        </div>
                </Card.Body>    
            </Card>
            </div>
        </Container>

        <div className="row mt-5"></div>

        <Button
            className = "btn border-light center"
            style = {{margin: "100px", background: "#263238"}}
            type = "submit"
            href = "/myprofile"
            role = "button">{<i className="fa-solid fa-gear" 
            style={{color: "#E8E2E2", padding: "3px 1px",}}></i>}  Save changes
        </Button>
        </>
    );
}

export default EditProfile;