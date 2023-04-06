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
                    <Route path="/editprofile" element={<EditProfile />}/>
                    <Route path="/myprofile" element={<MyProfile />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </AuthProvider>
            </Router>
    );
}

export default App;
