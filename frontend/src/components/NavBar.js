import {React, useState} from "react";

import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Navigation = (props) => {
  
  
  return (
    
    <Navbar collapseOnSelect className="Navcontainer">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          
          <Nav.Link className="Navbtn" href="/home-login">
            Log Out
          </Nav.Link>
          <Nav.Link className="Navbtn" onClick={()=>props.showComplete(true)} >
            Completed Tasks
            
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
};

export default withRouter(Navigation);