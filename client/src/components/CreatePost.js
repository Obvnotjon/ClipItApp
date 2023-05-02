import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { makeRequest } from "../axios";

function CreatePost () {
    const [file, setFile] = useState(null);
    const [postDesc, setPostDesc] = useState("");
    
    const QueryClient = useQueryClient();

    const mutation = useMutation((newPost) => {
        return makeRequest.post("/addpost", newPost);
    }, {
        onSuccess: () => {
            QueryClient.invalidateQueries(["posts"]);
        }
    });

    const handleCreate = (e) => {
        e.preventDefault();
        mutation.mutate({postDesc, file})
    };

    /*
    <input type="file" onChange={(e) =>
        setFile(e.target.value)} required>
        </input>
    */
    //UI commented out in case I screw up a UI element when attempting
    //to inject database data into the UI 
     /*
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
        */
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "31vh", maxWidth: "900px"}}>
                <Card className="makepost-card">
                    <h4>What moment do you want to share?</h4>
                    <Form.Group className = "form-group input-group">
                        <i className="fa-solid fa-pencil" style={{color: "#212121", padding: "15px 11px", background: "#BCC0C0"}}/>
                        <Form.Control className = "form-control-sm border border-1" 
                        type="text" name="caption" id="caption"
                        placeholder="Type a caption" value={postDesc} 
                        onChange={(e) => setPostDesc(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className = "form-group input-group">
                        <Form.Control className = "form-control-sm border border-1" 
                        type="file" name="file" id="file"
                        placeholder="Type a caption" value={file} 
                        onChange={(e) => setPostDesc(e.target.value)} required />
                    </Form.Group>
                    <Button className="w-100 btn-light" onClick={handleCreate}>Create Post</Button>
                </Card>
            </Container>
        </>
    )

}

export default CreatePost;