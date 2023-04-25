import "../css/styles.css";

function AboutUs() {
  return (
    <>
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
      <div class="row">
        <div class="column" id="gfg">
          <div class="card">
            {/* <!-- <i class="fa fa-user-circle" style="font-size: 68px"></i> --> */}
            <div class="container">
              <h2>Bryan Chavez</h2>

              <p>Role Here</p>

              {/* <img src=""> */}
              {/* <p></p> */}
              <button class="button">View</button>
            </div>
          </div>
        </div>
      </div>

      {/*  Other members of the team */}
      <div class="row">
        <div class="column">
          <div class="card">
            {/*  <i class="fa fa-user-circle" style="font-size: 68px"></i> */}
            <div class="container">
              <h2>Duncan Foutz</h2>

              <p>Role Here</p>

              <p></p>

              {/* <img src=""> */}
              {/* <p></p> */}
              <button class="button">View</button>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            {/* <i class="fa fa-user-circle" style="font-size: 68px"></i> */}
            <div class="container">
              <h2>Cynthia Ibarra</h2>

              <p>Role Here</p>

              <p></p>

              {/* <img src=""> */}
              {/* <p></p> */}
              <button class="button">View</button>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            {/* <i class="fa fa-user-circle" style="font-size: 68px"></i>*/}
            <div class="container">
              <h2>Tré Mitchell</h2>

              <p>Role Here</p>

              <p></p>
              {/* <img src="">
              <p></p> */}
              <button class="button">View</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="card">
            {/* <i class="fa fa-user-circle" style="font-size: 68px"></i> */}
            <div class="container">
              <h2>Fernando Nunez</h2>

              <p>Role Here</p>

              <p></p>
              {/* <img src="">
                  <p></p> */}
              <button class="button">View</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="card">
            {/* <i class="fa fa-user-circle" style="font-size: 68px"></i>  */}
            <div class="container">
              <h2>Tani Ordaz</h2>

              <p>Role Here</p>

              <p></p>
              {/* <img src="">
                      <p></p> */}
              <button class="button">View</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="card">
              {/* <i class="fa fa-user-circle" style="font-size: 68px"></i> */}
              <div class="container">
                <h2>Jon Reyna</h2>

                <p>Role Here</p>

                {/* <p></p> */}
                {/* <img src="">
                          <p></p> */}
                <button class="button">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
