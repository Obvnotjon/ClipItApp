import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/");
        } catch (error) {
            setError(error.response.data);
        }
      };

  return (
    <>
        <div className="bg-container"></div>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-200" style={{ maxWidth: '500px' }}>
        <Card className="text-light border" style={{background: "#212121"}}>
            <Card.Body>
                <img src = "images/clipitwhite.png" alt = "logo" width = "350px" hspace = "20"></img>
                <div className="row mt-3"/>
                <h3 className="text-center">Welcome Back, Log In</h3>
                <div className="row mt-3"/>
                {error && <Alert className="text-center" variant="danger"> {error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="username" className = "form-group input-group">
                        <i className="fa-solid fa-address-card" style={{color: "#212121", padding: "15px 11px", background: "#BCC0C0"}}/>
                        <Form.Control className = "form-control-sm border border-1" 
                        type="text" name="username" id="username"
                        placeholder="Enter Username" value={username} 
                        onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <div className="column mt-3"/>
                    <Form.Group id="password" className = "form-group input-group">
                    <i className="fa-solid fa-key" style={{color: "#212121", padding: "15px 12px",background: "#BCC0C0" }}/>
                        <Form.Control className = "form-control-sm border border-1"
                        type="password" name="password" id="password"
                        placeholder="Enter Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}  required />
                    </Form.Group>
                    <br/>
                    <Button className="w-100 btn-light" type="submit">Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <br/>
        <Card className="text-light border" style={{background: "#212121"}}>
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