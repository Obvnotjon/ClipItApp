import React from 'react';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import EditProfile from './EditProfile';
import MyProfile from './MyProfile';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import {BrowserRouter as  Router, Routes, Route} from 'react-router-dom';

function App() {
    return(
            <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }/>
                    <Route exact path="/editprofile"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }/>
                    <Route exact path="/myprofile"
                    element={
                        <PrivateRoute>
                            <MyProfile />
                        </PrivateRoute>
                    }/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </AuthProvider>
            </Router>
    );
}

export default App;
