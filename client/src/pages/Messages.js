import ClipItNav from "../components/ClipItNav";
import { Form }from "react-bootstrap";
import React from 'react'

function Messages() {
  return (
      <>
        <ClipItNav/>
        <div style={{display: "flex", height: "95.5vh"}}>
          <div className="border" style={{width: "15%"}}>

            <div className="friends">
              <button href="#" style={{backgroundColor: "white", border: "0px", width: "100%", padding: "2%", marginTop: "2%",}}>
                <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                <span > Username </span>                
              </button>
            </div>

            <div className="friends" style={{position: "sticky"}}>
              <button href="#" style={{backgroundColor: "white", border: "0px", width: "100%", padding: "2%", marginTop: "2%",}}>
                <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                <span > Username </span>                
              </button>
            </div>
          </div>
          
          <div style={{width: "85%"}}>
            <div className="message" style={{height: "95%", overflow: "auto"}}>
              
              <div className="Recieved" style={{width: "50%", padding: "2%"}}>
                <div className="border border-secondary" style={{borderRadius: "5px", backgroundColor: "#bababa"}}>
                  <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                  className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                  <span> Username </span>
                  <div style={{padding: "1%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus. Diam sit amet nisl suscipit adipiscing bibendum. Morbi tincidunt augue interdum velit euismod. Amet consectetur adipiscing elit pellentesque. Nunc eget lorem dolor sed viverra. Quis lectus nulla at volutpat diam ut. Laoreet sit amet cursus sit amet dictum sit amet justo. Nibh sed pulvinar proin gravida hendrerit lectus. Justo eget magna fermentum iaculis eu non diam phasellus. Egestas egestas fringilla phasellus faucibus. Enim nec dui nunc mattis enim ut tellus elementum. Elementum eu facilisis sed odio morbi. Faucibus ornare suspendisse sed nisi lacus. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Facilisi morbi tempus iaculis urna id volutpat lacus. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Eget est lorem ipsum dolor sit. Quam id leo in vitae turpis massa sed elementum.
                  </div>
                </div>
              </div>


              <div className="Sent" style={{width: "50%", padding: "2%", marginLeft: "50%"}}>
                <div className="border border-secondary" style={{borderRadius: "5px", backgroundColor: "#478bff"}}>
                  <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                  className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                  <span> Username </span>
                  <div style={{padding: "1%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus. Diam sit amet nisl suscipit adipiscing bibendum. Morbi tincidunt augue interdum velit euismod. Amet consectetur adipiscing elit pellentesque. Nunc eget lorem dolor sed viverra. Quis lectus nulla at volutpat diam ut. Laoreet sit amet cursus sit amet dictum sit amet justo. Nibh sed pulvinar proin gravida hendrerit lectus. Justo eget magna fermentum iaculis eu non diam phasellus. Egestas egestas fringilla phasellus faucibus. Enim nec dui nunc mattis enim ut tellus elementum. Elementum eu facilisis sed odio morbi. Faucibus ornare suspendisse sed nisi lacus. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Facilisi morbi tempus iaculis urna id volutpat lacus. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Eget est lorem ipsum dolor sit. Quam id leo in vitae turpis massa sed elementum.
                  </div>
                </div>
              </div>


              <div className="Recieved" style={{width: "50%", padding: "2%"}}>
                <div className="border border-secondary" style={{borderRadius: "5px", backgroundColor: "#bababa"}}>
                  <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                  className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                  <span> Username </span>
                  <div style={{padding: "1%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus. Diam sit amet nisl suscipit adipiscing bibendum. Morbi tincidunt augue interdum velit euismod. Amet consectetur adipiscing elit pellentesque. Nunc eget lorem dolor sed viverra. Quis lectus nulla at volutpat diam ut. Laoreet sit amet cursus sit amet dictum sit amet justo. Nibh sed pulvinar proin gravida hendrerit lectus. Justo eget magna fermentum iaculis eu non diam phasellus. Egestas egestas fringilla phasellus faucibus. Enim nec dui nunc mattis enim ut tellus elementum. Elementum eu facilisis sed odio morbi. Faucibus ornare suspendisse sed nisi lacus. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Facilisi morbi tempus iaculis urna id volutpat lacus. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Eget est lorem ipsum dolor sit. Quam id leo in vitae turpis massa sed elementum.
                  </div>
                </div>
              </div>


              <div className="Recieved" style={{width: "50%", padding: "2%"}}>
                <div className="border border-secondary" style={{borderRadius: "5px", backgroundColor: "#bababa"}}>
                  <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                  className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                  <span> Username </span>
                  <div style={{padding: "1%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus. Diam sit amet nisl suscipit adipiscing bibendum. Morbi tincidunt augue interdum velit euismod. Amet consectetur adipiscing elit pellentesque. Nunc eget lorem dolor sed viverra. Quis lectus nulla at volutpat diam ut. Laoreet sit amet cursus sit amet dictum sit amet justo. Nibh sed pulvinar proin gravida hendrerit lectus. Justo eget magna fermentum iaculis eu non diam phasellus. Egestas egestas fringilla phasellus faucibus. Enim nec dui nunc mattis enim ut tellus elementum. Elementum eu facilisis sed odio morbi. Faucibus ornare suspendisse sed nisi lacus. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Facilisi morbi tempus iaculis urna id volutpat lacus. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Eget est lorem ipsum dolor sit. Quam id leo in vitae turpis massa sed elementum.
                  </div>
                </div>
              </div>


              <div className="Sent" style={{width: "50%", padding: "2%", marginLeft: "50%"}}>
                <div className="border border-secondary" style={{borderRadius: "5px", backgroundColor: "#478bff"}}>
                  <img src="https://images.pexels.com/photos/4041122/pexels-photo-4041122.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" 
                  className="rounded-circle" alt="" style={{height: "32px", width: "32px"}}></img>
                  <span> Username </span>
                  <div style={{padding: "1%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus. Diam sit amet nisl suscipit adipiscing bibendum. Morbi tincidunt augue interdum velit euismod. Amet consectetur adipiscing elit pellentesque. Nunc eget lorem dolor sed viverra. Quis lectus nulla at volutpat diam ut. Laoreet sit amet cursus sit amet dictum sit amet justo. Nibh sed pulvinar proin gravida hendrerit lectus. Justo eget magna fermentum iaculis eu non diam phasellus. Egestas egestas fringilla phasellus faucibus. Enim nec dui nunc mattis enim ut tellus elementum. Elementum eu facilisis sed odio morbi. Faucibus ornare suspendisse sed nisi lacus. Amet risus nullam eget felis eget nunc lobortis. Lobortis mattis aliquam faucibus purus in massa tempor nec. Facilisi morbi tempus iaculis urna id volutpat lacus. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Eget est lorem ipsum dolor sit. Quam id leo in vitae turpis massa sed elementum.
                  </div>
                </div>
              </div>
            </div>
            
            
            <Form>
            <div className="border-top" style={{display: "flex", height: "5%"}}>
              <div className="left" style={{width: "90%", display: "flex", justifyContent: "center"}}>
                
                <div class="form-floating" style={{width: "99%"}}>
                  <textarea class="form-control" placeholder="Message" id="floatingTextarea"></textarea>
                  <label for="floatingTextarea">Message</label>
                </div>
              </div>
              <div className="right" style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <button type="submit" class="btn btn-dark">Send</button>
              </div>
            </div>
            </Form>
          </div>
        </div>
      </>
  )
}

export default Messages;