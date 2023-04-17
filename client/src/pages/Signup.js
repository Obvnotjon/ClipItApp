import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Signup() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null);
        const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
                Axios.post("http://localhost:8803/signup", {
                username,
                password
                }).then((response) => {
                    navigate("/editprofile");
                }).catch ((error) => {
                    setError(error.response.data);
            });
        };

  return (
    <>

        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-200" style={{ maxWidth: '500px' }}>
        <img src="/Assets/images/clipIt.png" alt="logo" width="400" height="100"/>
        <Card>
            <Card.Body>
                <h3 className="text-center">Welcome, Sign Up Today</h3>
                {error && <Alert variant="danger"> {error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>

                    
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <br/>
                    <Button className="w-100 btn-dark" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <br/>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log in!</Link>
                </div>
            <br/>
        </Card> 
        </div>
        </Container>
    </>
  );
}

export default Signup;