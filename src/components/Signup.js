import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Please type matching passwords')
    }

    try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate("/editprofile")
    }
    catch {
        setError('Error: Account could not be created')
    }
    setLoading(false)
 
}

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-200" style={{ maxWidth: '500px' }}>
        <Card>
            <Card.Body>
                <h3 className="text-center">Welcome, Sign Up Today</h3>
                {error && <Alert variant="danger"> {error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <br/>
                    <Button disabled={loading} className="w-100 btn-dark" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <br/>
        <Card>
            <br/>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/Login">Log in!</Link>
                </div>
            <br/>
        </Card> 
        </div>
        </Container>
    </>
  );
}

export default Signup;