import React from "react";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import EditProfile from "./EditProfile";
import MyProfile from "./MyProfile";
import Messages from "./Messages";
// import PrivateRoute from "./PrivateRoute";
// import AboutUs from "./AboutUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        {/* <Route path="/aboutus" element={<AboutUs />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
