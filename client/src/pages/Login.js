import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await Axios.post("http://localhost:8803/login", {
            username,
            password,
          });
            navigate("/")
            console.log(response.data);
        } catch (error) {
            setError(error.response.data);
            console.error(error);
        }
      };

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-200" style={{ maxWidth: '500px' }}>
        <img src="/Assets/images/clipIt.png" alt="logo" width="400" height="100"/>
        <Card>
            <Card.Body>
                <h3 className="text-center">Welcome Back, Log In</h3>
                {error && <Alert variant="danger"> {error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="username">
                        <Form.Label htmlFor="username">Username</Form.Label>
                        <Form.Control type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  required />
                    </Form.Group>
                    <br/>
                    <Button className="w-100 btn-dark" type="submit">Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <br/>
                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign up!</Link>
                </div>
            <br/>
        </Card>
        </div>
        </Container>
    </>
  );
}

export default Login;