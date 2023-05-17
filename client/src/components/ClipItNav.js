import { AuthContext } from "../context/authContext";
import PostPfp from "./PostPfp";
import { useContext, useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../axios";
import { Link, useParams } from "react-router-dom";

function ClipItNav () {
    const { currentUser, logout } = useContext(AuthContext);
    const [value, setValue] = useState('');
    const {username } = useParams();
    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
    }

    const { isLoading, error, data } = useQuery(['finduser'], () =>
        makeRequest.get("/suggestusers").then((res) => {
            return res.data;
        }));


        const handleProfileClick = (username) => {
            onSearch(username);
            window.location.href =`/profile/${username}`;
            setValue("");
        }
    
    return (
        <div>
            <div style={{position: "fixed", width: "100%", zIndex: "2"}}>
                <nav className="navbar navbar-dark" style={{background: "#292929"}}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> 
                        <a className="navbar-brand" href="/">
                            <img src="/images/clipitwhite.png" alt="1" width="125px"/>
                        </a>
                        <div className="offcanvas offcanvas-start " 
                            style={{ '--bs-offcanvas-width': 'min(95vw, 250px)', background: "#292929", color: "white"}} data-bs-scroll="true" 
                            data-bs-backdrop="false" tabIndex="-1"
                            id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                            <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                                {currentUser?.pfp ? <PostPfp src={currentUser?.pfp} alt="pfp"/> : 
                                <PostPfp src="/images/blankpfp.jpg" alt="pfp"/>}{currentUser?.username}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" 
                                data-bs-dismiss="offcanvas" 
                                aria-label="Close">
                            </button>
                        </div>
                        {/* Search bar*/}
                        <div className="offcanvas-body ">
                            <div className = "search-container" 
                            style = {{
                            width: "40px",
                            display: "flex",
                            flexDirection: "column"
                            }}>
                                <div className = "search-inner">
                                <form 
                                    className = "d-flex" 
                                    role = "search">

                                    <input 
                                    className = "search" 
                                    type = "text" 
                                    placeholder = "Search" 
                                    aria-label = "Search"
                                    value = {value}
                                    onChange = {onChange} />
                                    <button 
                                        className = "btn btn-sm btn-light" 
                                        style = {{
                                        color: "#263238"}}
                                        type = "button"
                                        onClick = {() => onSearch(value)}>
                                            {<i className="fa-solid fa-magnifying-glass"></i>}
                                    </button>
                                </form>
                                <div className="finduser">
                                    <div className="dropdown"
                                    style = {{
                                    display: "flex",
                                    width: "200px",
                                    background: "#fff",
                                    color: "#36454F",
                                    flexDirection: "column",
                                    }}>
                                        { error ? "Uh Oh, Something went wrong. Please go back" : 
                                        isLoading ? "Loading" :
                                        data && data.filter(item => {
                                        const searchTerm = value.toLowerCase();
                                        const user = item.username.toLowerCase();

                                        return searchTerm && user.startsWith(searchTerm) && user !== searchTerm;
                                        }).map((item) => (
                                            <Link to={`/profile/${item.username}`} style={{textDecoration: "none", color: "inherit"}}>
                                                <div 
                                                    className = "dropdown-row" key = {item.id}
                                                    onClick = { () => handleProfileClick(item.username)}>
                                                    {item.pfp ? <PostPfp src={item.pfp} alt="pfp"/> : 
                                                    <PostPfp src="images/blankpfp.jpg" alt="pfp"/>}{item.username}
                                                </div>
                                            </Link>  
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-1  align-items-start">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">
                                        {<i className="fa-solid fa-house" 
                                        style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/profile/${currentUser?.username}`}>
                                        {<i className="fa-solid fa-address-card" 
                                        style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Profile
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/notifications">
                                        {<i class="fa-solid fa-bell"
                                        style={{color: "#E8E2E2", padding: "10px 1px"}}></i>}  Notifications
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/messages">
                                        {<i className="fa-solid fa-message" 
                                        style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Messages
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/aboutus">
                                        {<i className="fa-solid fa-circle-info" 
                                        style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  About Us
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={logout}>
                                        {<i className="fa-solid fa-right-from-bracket" 
                                        style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Log Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div style={{height: "80px"}}>
                
            </div>
        </div>
    );
}

export default ClipItNav;