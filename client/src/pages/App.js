import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreatePost from '../components/CreatePost';
import PrivateRoute from '../context/PrivateRoute';
import EditProfile from './EditProfile';
import Messages from './Messages';
import Friends from './Friends';
import Profile from './Profile';
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
                        <Route path="/profile/:username"
                        element={<PrivateRoute><Profile/></PrivateRoute>}/>
                        <Route path="/friends/:username"
                        element={<PrivateRoute><Friends/></PrivateRoute>}/>
                        <Route path="/messages" 
                        element={<PrivateRoute><Messages/></PrivateRoute>}/>
                        
                        <Route path="/signup" element={<Signup />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/createpost" element={<CreatePost/>}/>
                </Routes>
            </Router>
            </QueryClientProvider>
            
    );
}

export default App;