
function Home() {

    /*
    Everything Under the <nav> </nav> is just for testing routing pages to the other account page options.
    Change code as needed
    */
    return (
        <>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Welcome to Clip It!</span>
            </div>
        </nav>



        <br/>
        <a class="btn btn-dark" href="/myprofile" role="button">My Profile</a>
        </>
    );
}

export default Home;