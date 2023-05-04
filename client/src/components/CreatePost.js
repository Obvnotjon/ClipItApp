import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { makeRequest } from "../axios";

function CreatePost () {
    const [file, setFile] = useState(null);
    const [postDesc, setPostDesc] = useState("");
    
    const upload = async () => {
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

    //Leave this alone
    const mutation = useMutation((newPost) => {
        return makeRequest.post("/addpost", newPost);
    }, {
        onSuccess: () => {
            QueryClient.invalidateQueries(["posts"]);
        }
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ postDesc, postContent: imgUrl });
        setPostDesc("");
        setFile(null);
    };

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh", maxWidth: "900px"}}>
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
                        <input className = "form-control-sm border border-1" 
                        type="file" name="file" id="file" 
                        onChange={(e) => setFile(e.target.files[0])} required/>
                    </Form.Group>
                    <Button className="w-100 btn-light" onClick={handleCreate}>Create Post</Button>
                </Card>
            </Container>
        </>
    )

}

export default CreatePost;