import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Button, Card, Container } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture';
import { AuthContext } from '../context/authContext';
import ClipItNav from '../components/ClipItNav';
import { useState, useContext } from 'react';
import { makeRequest } from '../axios';
import Axios from 'axios';

function EditProfile() {
    const { currentUser } = useContext(AuthContext);

    
    const [pfp, setPfp] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState(null);


    

    return (
        <>
        <div className="default-bg-container"/>
        <ClipItNav/>
        <h4 className="text-center text-light" style={{padding: "1%"}}>Edit Profile</h4>
        <Container
                className="d-flex align-items-center justify-content-center" 
                style={{ minHeight: "50vh" }}>

            <div className="w-100" style={{ maxWidth: '500px' }}>        
          <Card className='my-post'>
                <Card.Body>
                        <br/>
                            <div>
                            {currentUser?.pfp ? <ProfilePicture src={currentUser?.pfp} alt="pfp"/> : 
                            <ProfilePicture src="images/blankpfp.jpg" alt="pfp"/>}   
                        
                            <input 
                                type = "file"
                                accept = "image/jpg, image/png, image/jpeg, image/gif"
                                id = "input-file"
                                style= {{display: "none"}}
                                onChange= {(e) => setPfp(e.target.files[0])}>
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
                            id="name"
                            className = "form-group input-group">
    
                        <Form.Control
                        className = {"form-control"}     
                        type="text" 
                        name="name" 
                        value={name}
                        placeholder = "Profile Name"
                        onChange={(e) => setName(e.target.value)}
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
                                href={`/profile/${currentUser?.username}`} 
                                role="button"
                                style={{background: "#263238"}}>
                                Cancel Changes        
                            </Button>

                            <Button 
                                className="btn btn-sm border-light"
                                type="button" 
                                href="#" 
                                role="button"
                                style={{background: "#263238"}}>Change Background
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
            role = "button">{<i className="fa-solid fa-gear" 
            style={{color: "#E8E2E2", padding: "3px 1px",}}></i>}  Save changes
        </Button>
        </>
    );
}

/*
const [bgCover, setCover] = useState(null);
    const [username, setUsername] = useState("");
    
     const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData);
            const contentUrl = res.data;
            return contentUrl;
        } catch (err) {
            console.log(err);
        }
    };

    const QueryClient = useQueryClient();

    //makes API req to db to add post and reload current posts shown
    const mutation = useMutation((user) => {
        return makeRequest.put("/updateuser", user);
    }, {
        onSuccess: () => {
            QueryClient.invalidateQueries(["user"]);
        }
    });

    //Handles post creation functions on btn click
    const handleUpdate = async (e) => {
        e.preventDefault();
        let coverUrl = ;
        if (file) coverUrl = await upload();
        mutation.mutate({ postDesc, postContent: contentUrl });
        setPostDesc("");
        setFile(null);
    };
*/

    /*
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
    */


export default EditProfile;