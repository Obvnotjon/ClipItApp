import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/styles.css"
import ClipItNav from "../components/ClipItNav";

function AboutUs() {
  return (
    <>
      <ClipItNav />
      <h1>Meet The ClipIt! Team </h1>
      <hr />
      <h2>
        {" "}
        What is ClipIt? We are a social media website focused on giving our users an intimate experience
        where they can interact with their friends and share their favorite gaming clips or moments. We aim
        to inspire creativity by offering users more customization features to express their personality online.
        We also aim to keep things simple and remove any corporate influence that ruins the intimate user 
        experience like shallow ads or sponsorships that clutter your feeds on other platforms. 
        {" "}
      </h2>
      <hr />

      {/* First member of the team  */}
      <div className="row" style={{minwidth: "150px"}}>
        <div className="column" id="gfg">
          <div className="card">
            {/* <i className="fa fa-user-circle" style={{ fontSize: "68px" }}></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />

            <div className="about-container">
              <h2>Bryan Chavez</h2>

              <p>Product Manager/QA Tester</p>

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
            <div className="about-container">
              <h2>Jonathan Reyna</h2>

              <p>Assistant Product Manager/Fullstack Developer</p>

              {/* <p></p> */}
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
            <div className="about-container">
              <h2>Fernando Nunez</h2>

              <p>Fullstack Developer</p>

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
            <div className="about-container">
              <h2>Cynthia Ibarra</h2>

              <p>Frontend Developer</p>

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
            <div className="about-container">
              <h2>Tré Mitchell</h2>

              <p>Frontend Developer</p>

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
            <div className="about-container">
              <h2>Tani Ordaz</h2>

              <p>Frontend Developer</p>

              <p></p>
              {/* <img src="">
                      <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="column">
          <div className="card">
            {/*  <i className="fa fa-user-circle" style="font-size: 68px"></i> */}
            <FontAwesomeIcon className="fa" icon={faUserCircle} size="4x" />
            <div className="about-container">
              <h2>Duncan Foutz</h2>

              <p>Role Here</p>

              <p></p>

              {/* <img src=""> */}
              {/* <p></p> */}
              {/* <button className="button">View</button> */}
            </div>
          </div>
      </div>

    </>
  );
}

export default AboutUs;