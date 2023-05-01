import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoute from './PrivateRoute';
import EditProfile from './EditProfile';
import MyProfile from './MyProfile';
import Messages from './Messages';
import AboutUs from './AboutUs';
import Signup from './Signup';
import Login from './Login';
import React from 'react';
import Home from './Home';

const queryClient = new QueryClient();

//For developing purposes, remove <PrivateRoute> tags so that you do not need
//to Log in to view all the protected pages when testing changes
function App() {
    return(
            <QueryClientProvider client={queryClient}>
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
                        <Route path="/aboutus" element={<AboutUs />} />
                </Routes>
            </Router>
            </QueryClientProvider>
            
    );
}

export default App;