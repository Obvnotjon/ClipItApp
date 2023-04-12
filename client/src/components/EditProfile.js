import { Form, Button, Card } from 'react-bootstrap';

function EditProfile() {
    return (
        <>
          <nav className="navbar navbar-dark bg-dark bg">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">Clip It!</span>
            </div>
          </nav>
          <Card>
            <Card.Body>
            <h1 className="text-center"> Edit Profile</h1>
            <br/>
            <Form className="row g-3">
              <div className="row mb-3">
                <div className="form-floating col-md-5">
                  <input type="text" className="form-control" id="ProfileName" placeholder="Profile Name" />
                  <label htmlFor="ProfileName" className="col-form-label-sm"> Profile Name</label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="form-floating col-md-5">
                  <input type="text" className="form-control" id="UserName" placeholder="User name" />
                  <label htmlFor="UserName" className="col-form-label-sm"> Username</label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="form-floating col-md-5">
                  <textarea className="form-control" placeholder="Profile Bio" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                  <label htmlFor="floatingTextarea2" className="col-form-label-sm"> Profile Bio</label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="d-grid gap-1 col-5">
                  <Button type="submit" className="btn-dark btn-sm" href="/myprofile" >Cancel Changes</Button>
                  <Button type="submit" className="btn-dark btn-sm">Save Changes</Button>
                </div>
              </div> 
            </Form>
            </Card.Body>
          </Card>
        </>
    );
}

export default EditProfile;