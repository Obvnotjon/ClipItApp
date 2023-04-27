import "../css/styles.css";

import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ClipItNav from "../components/ClipItNav";
function AboutUs() {
  return (
    <>
      <ClipItNav />
      <h1>Meet The ClipIt! Team </h1>
      <hr />
      <h2>
        {" "}
        The ClipIt! app is focusing on creating a platform around gaming,
        creativity, and content creation with an emphasis on promoting more
        interactivity and intimacy between users.{" "}
      </h2>
      <hr />

      {/* First member of the team  */}
      <div className="row">
        <div className="column" id="gfg">
          <div className="card">
            {/* <i className="fa fa-user-circle" style={{ fontSize: "68px" }}></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />

            <div className="container">
              <h2>Bryan Chavez</h2>

              <p>Role Here</p>

              {/* <img src=""> */}
              {/* <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            {/*  <i className="fa fa-user-circle" style="font-size: 68px"></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="container">
              <h2>Duncan Foutz</h2>

              <p>Role Here</p>

              <p></p>

              {/* <img src=""> */}
              {/* <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            {/* <i className="fa fa-user-circle" style="font-size: 68px"></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="container">
              <h2>Cynthia Ibarra</h2>

              <p>Role Here</p>

              <p></p>

              {/* <img src=""> */}
              {/* <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
      </div>

      {/*  Other members of the team */}
      <div className="row">
        <div className="column">
          <div className="card">
            {/* <i className="fa fa-user-circle" style="font-size: 68px"></i>*/}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="container">
              <h2>Tré Mitchell</h2>

              <p>Role Here</p>

              <p></p>
              {/* <img src="">
              <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            {/* <i className="fa fa-user-circle" style="font-size: 68px"></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="container">
              <h2>Fernando Nunez</h2>

              <p>Role Here</p>

              <p></p>
              {/* <img src="">
                  <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            {/* <i className="fa fa-user-circle" style="font-size: 68px"></i>  */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="container">
              <h2>Tani Ordaz</h2>

              <p>Role Here</p>

              <p></p>
              {/* <img src="">
                      <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="column">
          <div className="card">
            {/* <i className="fa fa-user-circle" style="font-size: 68px"></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="container">
              <h2>Jon Reyna</h2>

              <p>Role Here</p>

              {/* <p></p> */}
              {/* <img src="">
                          <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
