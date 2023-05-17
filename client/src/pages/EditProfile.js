import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Form, Button, Card, Container, Image } from 'react-bootstrap';
import ProfilePicture from '../components/ProfilePicture';
import { AuthContext } from '../context/authContext';
import ClipItNav from '../components/ClipItNav';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { makeRequest } from '../axios';

function EditProfile() {
    const { currentUser } = useContext(AuthContext);

    const [selectedBanner, setSelectedBanner] = useState(null);
    const [selectedPfp, setSelectedPfp] = useState(null);
    const [selectedCover, setSelectedCover] = useState(null);
    const [ bgcover, setCover ] = useState(null);
    const [banner, setBanner ] = useState(null);
    const [pfp, setPfp] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery(["users"], () =>
        makeRequest.get(`/getprofile/${currentUser?.username}`).then((res) => {
        return res.data;
        })
    );
    const profilePic = data?.pfp || "images/blankpfp.jpg";
    const bannerPic = data?.banner || "images/212121.jpg";
    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData);
            return res.data;
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
        let updatedFields = {};
        if (name)
            updatedFields.name = name;
        if (bio)
            updatedFields.bio = bio;
        if (pfp) {
            let pfpUrl =  await upload(pfp);
            updatedFields.pfp = pfpUrl;
        }
        if (banner) {
            let bannerUrl =  await upload(banner);
            updatedFields.banner = bannerUrl;
        }
        if (bgcover) {
            let bgcoverUrl = await upload(bgcover);
            updatedFields.bgcover = bgcoverUrl;
        }
        
        if (Object.keys(updatedFields).length === 0) {
            navigate(`/profile/${currentUser?.username}`);
        } else {
            const updatedUser = {...data, ...updatedFields};
            await mutation.mutate(updatedUser);
            navigate(`/profile/${currentUser?.username}`);
        }   
    };

    return (
        <>
        <div className={`${selectedCover ? "custom-bg-container" : "default-bg-container"}`}
        style={{backgroundImage: selectedCover ? `url(${selectedCover})` : `url(${bgcover || data?.bgcover})`, backgroundPositionX: "center"}}/>
        <ClipItNav/>
        <h4 className="text-center text-light" style={{padding: "1%"}}>Edit Profile</h4>
        <Container className="d-flex align-items-center justify-content-center" 
        style={{minHeight: "31vh", maxWidth: "780px"}}>         
          <Card className='my-post'>
                <Card.Body>
                        <br/>
                        <div className="top-image">
                                <Image src={selectedBanner || bannerPic} alt="banner" style={{ width: "100%", height: "130%" }} />
                            </div>
                            <div>
                             <ProfilePicture src={selectedPfp || profilePic} alt="pfp"/>
                            <div className="d-flex align-items-center justify-content-between">
                            <input 
                                type = "file"
                                accept = "image/jpg, image/png, image/jpeg, image/gif"
                                id = "input-pfp"
                                style= {{display: "none"}}
                                onChange= {(e) => {
                                    if (e.target.files.length > 0) {
                                        setPfp(e.target.files[0]);
                                        setSelectedPfp(URL.createObjectURL(e.target.files[0]));
                                    }    
                                }}>
                            
                            </input>   
                            <label htmlFor = "input-pfp" 
                                className="rounded btn btn-primary d-flex align-items-center justify-content-center"
                                style = {{
                                    display: "block", 
                                    width: "150px",
                                    height: "48px",
                                    border: "1px solid white",
                                    background: "#212121", 
                                    color: "#fff", 
                                    padding: "5px 20px", 
                                    margin: "10px 1px"  
                                    }}>Update Image
                            </label>

                            <input 
                                type = "file"
                                accept = "image/jpg, image/png, image/jpeg, image/gif"
                                id = "input-banner"
                                style= {{display: "none"}}
                                onChange= {(e) => {
                                    if (e.target.files.length > 0) {
                                        setBanner(e.target.files[0]);
                                        setSelectedBanner(URL.createObjectURL(e.target.files[0]));
                                    }    
                                }}>
                            </input>   
                            <label htmlFor = "input-banner" 
                                className="rounded btn btn-primary d-flex align-items-center justify-content-center"
                                style = {{
                                    display: "block", 
                                    width: "150px",
                                    height: "48px",
                                    border: "1px solid white",
                                    background: "#212121", 
                                    color: "#fff", 
                                    padding: "5px 20px", 
                                    margin: "10px 1px"  
                                    }}>Update Banner
                            </label>

                            <input 
                                type = "file"
                                accept = "image/jpg, image/png, image/jpeg, image/gif"
                                id = "input-cover"
                                style= {{display: "none"}}
                                onChange= {(e) => {
                                    if (e.target.files.length > 0) {
                                        setCover(e.target.files[0]);
                                        setSelectedCover(URL.createObjectURL(e.target.files[0]));
                                    }    
                                }}>
                            </input>

                            <label htmlFor = "input-cover" 
                                className="rounded btn btn-primary d-flex align-items-center justify-content-center"
                                style = {{
                                    display: "block", 
                                    width: "150px",
                                    height: "48px",
                                    border: "1px solid white",
                                    background: "#212121", 
                                    color: "#fff", 
                                    padding: "5px 20px", 
                                    margin: "10px 1px"  
                                    }}>Update cover
                            </label>
                            </div>
                            </div>
                        <br/>

                <Form.Group id="name" className = "form-group input-group">
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
        htmlFor="bio" 
        className="form-label"></label>

        <textarea className="form-control" name="bio" placeholder = "Bio"
         id="bio" value={bio} rows="3"
         onChange={(e) => setBio(e.target.value)}></textarea>
        </div>
                <div className="row mt-4"></div>
                        <div 
                        className="d-grid gap-1 d-md-flex justify-content-md-start">
                            <Button 
                                className="btn btn-sm border-light" 
                                type="button" 
                                href={`/profile/${currentUser?.username}`} 
                                role="button"
                                style={{background: "#212121"}}>
                                Cancel Changes        
                            </Button>

                            <Button 
                                className="btn btn-sm border-light"
                                type="submit" 
                                onClick={handleUpdate}
                                role="button"
                                style={{background: "#212121"}}>
                                {<i className="fa-solid fa-gear" 
                                style={{color: "#E8E2E2", padding: "3px 3px",}}></i>}
                                 Save Changes
                            </Button>
                        </div>
                </Card.Body>    
            </Card>
      
        </Container>
        </>
    );
}

export default EditProfile;