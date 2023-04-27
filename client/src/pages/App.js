import {BrowserRouter as  Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import EditProfile from './EditProfile';
import MyProfile from './MyProfile';
import Messages from './Messages';
import Signup from './Signup';
import Login from './Login';
import React from 'react';
import Home from './Home';

//For developing purposes, remove <PrivateRoute> tags so that you do not need
//to Log in to view all the protected pages when testing changes
function App() {
    return(
            <Router>
                <Routes>
                    <Route exact path="/"
                        element={<PrivateRoute><Home/></PrivateRoute>}/>
                        <Route path="/editprofile"
                        element={<PrivateRoute><EditProfile/></PrivateRoute>}/>
                        <Route path="/myprofile"
                        element={<PrivateRoute><MyProfile/></PrivateRoute>}/>
                        <Route path="/messages" 
                        element={<PrivateRoute><Messages/></PrivateRoute>}/>
                        
                        <Route path="/signup" element={<Signup />}/>
                        <Route path="/login" element={<Login />}/>
                </Routes>
            </Router>
    );
}

export default App;
