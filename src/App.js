import './App.css';
import Loadvideo from './component/loadvideo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './feattures/useSlice';
import Register from './component/register';
import { Button, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Homepage from './Page/Homepage';
import { Person } from '@material-ui/icons';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Lazyload from './component/lazyload';
function App() {
  const [show, setShow] = useState(false);
  const [Color, setColor] = useState("home");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const [Tabmodal, setTabmodal] = useState(true)
  const user = useSelector(selectUser)
  console.log(user)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div className="container">
        <Router>
            <Nav >
            <Nav.Item onClick={() => setColor("home")} style={{ backgroundColor: Color === "home" ?"#194D33":""}}>
              <Link to ="/">Home</Link>
                </Nav.Item>
            <Nav.Item onClick={() => setColor("lazyload")} style={{ backgroundColor: Color === "lazyload" ? "#194D33" : "" }}>
              <Link to="/lazyload">Test Lazyload</Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
              {user && user.lenght!==0 ?
              <div>
                {user.map(item=>(
                  <span>
                    <a href="" className="text_name">
                     User:{  item.username}
                    </a>
                    <Button className="btn_logout" onClick={() => dispatch(logout())}>Logout</Button>
                  </span>
                ))}
              </div>
                 :
              <Nav.Link onClick={handleShow}>
                <Person />
                Login
              </Nav.Link>}
                </Nav.Item>
            </Nav>


            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal Account</Modal.Title> 
              </Modal.Header>
              <Modal.Body>
                <Nav variant="tabs" style={{ backgroundColor:'#04DEAB' }} defaultActiveKey="/login">
                <Nav.Item style={{ width: "50%", color: Tabmodal===true?"red":""  }}>
                  <Nav.Link style={{color: Tabmodal === true ? "blue" : "" }} onClick={()=> setTabmodal(true)}>Log in</Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{width:"50%"}}>
                  <Nav.Link style={{ color: Tabmodal === false ? "blue" : "" }} onClick={() => setTabmodal(false)} >Registration</Nav.Link>
                  </Nav.Item>
                </Nav>
              {Tabmodal === true ? <Login onChild2Event={setShow} /> : <Register onChild2Event={setTabmodal}/>}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
               
              </Modal.Footer>
            </Modal>


          <Switch>
            <Route path="/lazyload">
              <Lazyload />
            </Route>
            <Route path="/">
              <Loadvideo />
            </Route>
           

           
           
          </Switch>
    </Router>
        {/* {
        data && data.length ? <Loadvideo data={data}/>: <Login />
      } */}
        {/* <Homepage /> */}

        
      </div>
     
    </div>
  );
}

export default App;
