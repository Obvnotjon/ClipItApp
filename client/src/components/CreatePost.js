import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { makeRequest } from "../axios";

function CreatePost ({setOpenCreate}) {
    const [file, setFile] = useState(null);
    const [postDesc, setPostDesc] = useState("");
    
    //makes API req to cloudinary to upload file and return url
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
    const mutation = useMutation((newPost) => {
        return makeRequest.post("/addpost", newPost);
    }, {
        onSuccess: () => {
            QueryClient.invalidateQueries(["posts"]);
        }
    });

    //Handles post creation functions on btn click
    const handleCreate = async (e) => {
        e.preventDefault();
        let contentUrl = "";
        if (file) contentUrl = await upload();
        mutation.mutate({ postDesc, postContent: contentUrl });
        setPostDesc("");
        setFile(null);
    };

    return (
        <>
        <div className="upload-card">
            <Button onClick={() => setOpenCreate(false)}> X </Button>
            <Container className="d-flex align-items-center justify-content-center">
                <Card className="makepost-card">
                    <h4>What moment do you want to share?</h4>
                    <Form.Group className = "form-group input-group">
                        <i className="fa-solid fa-pencil" style={{color: "#212121", padding: "15px 11px", background: "#BCC0C0"}}/>
                        <Form.Control className = "form-control-sm border border-1" 
                        type="text" name="postDesc" id="postDesc"
                        placeholder="Type a caption" value={postDesc} 
                        onChange={(e) => setPostDesc(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className = "form-group input-group">
                        <input type="file" name="file" id="file" accept="video/*, image/*"
                        onChange={(e) => setFile(e.target.files[0])} required/>
                    </Form.Group>
                    <Button className="w-100 btn-light" onClick={handleCreate}>Create Post</Button>
                </Card>
            </Container>
        </div>
        
        </>
    )

}

export default CreatePost;