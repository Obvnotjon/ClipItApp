import { AuthContext } from "../context/authContext";
import ProfilePicture from "./ProfilePicture";
import PostPfp from "./PostPfp";
import { useContext } from "react";

function ClipItNav () {
    const { currentUser, logout } = useContext(AuthContext);

    return (
            <nav className="navbar navbar-dark" style={{background: "#292929"}}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> 
                    <a className="navbar-brand" href="/">
                        <img src="images/clipitwhite.png" alt="1" width="125px"/>
                    </a>
                    <div className="offcanvas offcanvas-start " 
                        style={{ '--bs-offcanvas-width': 'min(95vw, 250px)', background: "#292929", color: "white"}} data-bs-scroll="true" 
                        data-bs-backdrop="false" tabIndex="-1"
                        id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                            {currentUser?.pfp ? <PostPfp src={currentUser?.pfp} alt="pfp"/> : 
                            <PostPfp src="images/blankpfp.jpg" alt="pfp"/>}{currentUser?.username}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" 
                            data-bs-dismiss="offcanvas" 
                            aria-label="Close">
                        </button>
                    </div>
                    <div className="offcanvas-body ">
                        <form className="d-flex" role="search">
                            <input className="form-control rounded-start" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-sm btn-light" style={{color: "#263238"}} type="submit">
                                {<i className="fa-solid fa-magnifying-glass"></i>}
                            </button>
                        </form>

                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-1  align-items-start">
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    {<i className="fa-solid fa-house" 
                                    style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/myprofile">
                                    {<i className="fa-solid fa-address-card" 
                                    style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/messages">
                                    {<i className="fa-solid fa-message" 
                                    style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Messages
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    {<i className="fa-solid fa-gear"
                                    style={{color: "#E8E2E2", padding: "10px 1px"}}/>}  Settings
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
    );
}

export default ClipItNav;