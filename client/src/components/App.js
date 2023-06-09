import React from 'react';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import EditProfile from './EditProfile';
import MyProfile from './MyProfile';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter as  Router, Routes, Route} from 'react-router-dom';


function App() {
    return(
            <Router>
                <Routes>
                    <Route exact path="/"
                    element={<Home/>}/>
                    <Route exact path="/editprofile"
                    element={<EditProfile />}/>
                    <Route exact path="/myprofile"
                    element={<MyProfile />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>

                </Routes>
            </Router>
    );
}

export default App;
