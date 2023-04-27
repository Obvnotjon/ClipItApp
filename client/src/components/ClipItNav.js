import { AuthContext } from "../context/authContext";
import { useContext } from "react";

function ClipItNav () {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>    
                    <a className="navbar-brand" href="/"><img src="/Assets/images/clipIt.png" alt="logo" width="100" height="25" className="d-inline-block align-text-top"/></a>
                    <div className="offcanvas offcanvas-start text-bg-dark" style={{ '--bs-offcanvas-width': 'min(95vw, 200px)' }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">{currentUser?.username}</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body ">
                    <form className="d-flex mt-1" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-sm btn-light" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-1  align-items-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/myprofile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/messages">Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={logout}>Log Out</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default ClipItNav;