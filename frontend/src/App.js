import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Container, Col } from "react-bootstrap";
import React, {useEffect} from "react";
import Register from "./components/Home/RegisterModal";
import Routes from "./services/Routes";
import Navigation from "./components/NavBar.js";
import "bootstrap/dist/css/bootstrap.min.css";



import Login from "./components/Home/LoginModal";



import Tasks from "./components/Tasks/Tasks";
import CompletedTasks from "./components/Tasks/CompletedTasks";
function App() {
  const [loginmodalShow, setloginmodalShow] = React.useState(true);
  const [registermodalShow, setregistermodalShow] = React.useState(false);
  const [tasks, settasksShow] = React.useState(false);
  
  const [user, setUser] = React.useState(null);
  const [completedTasks, showcompletedTasks] = React.useState(null);
  if (loginmodalShow===false && registermodalShow===false && tasks===false){
    settasksShow(true)
  }
  // if (loginmodalShow===true && registermodalShow===true){
  //   setregistermodalShow(false)
  // }
  // if (loginmodalShow===false && registermodalShow===true){
  //   setloginmodalShow(false)
  // }
  useEffect(()=>setloginmodalShow(true),
  [registermodalShow]

  )
  
  return (
    <div className="container">
      <Navigation showComplete={(props) => showcompletedTasks(props)} />
      <div className="App">
      
            <Tasks
              user_id={user}
              show={tasks}
              
            />
            <CompletedTasks
              user_id={user}
              show={completedTasks}
              handleCompletedTasks={(props) => showcompletedTasks(props)}
            />
          
          <Register show={registermodalShow}
            onHide={() => setregistermodalShow(false)}
            backdrop="static"
            keyboard={false}
            user={(props) => setUser(props)}
            showLogin={(props)=>setloginmodalShow(props)}
            />
            
          <Login
            show={loginmodalShow}
            onHide={() => setloginmodalShow(false)}
            backdrop="static"
            keyboard={false}
            user={(props) => setUser(props)}
            showRegister={(props)=>setregistermodalShow(props)}
          />
          
            
            </div>
      

      <Routes />
    </div>
  );
}

export default App;