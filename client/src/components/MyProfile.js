import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyProfile () {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        }
        catch {
            setError("Log out unsuccessful")
        }
    }
    /*
    Everything Under the <nav> </nav> is just for testing routing pages to the other account page options.
    Change code as needed
    */
    return (
        <>
            <nav class="navbar navbar-dark bg-dark bg">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Clip It!</span>
                </div>
            </nav>
            <br/>




                <a class="btn btn-dark" href="/editprofile" role="button">Edit Profile</a>
                <br/>
                <a class="btn btn-dark" href="/" role="button">Home Page</a>

                <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
        </>
    );
}
export default MyProfile;