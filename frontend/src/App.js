import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Container, Col, Modal, Carousel } from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Register from "./components/Home/RegisterModal";
// import Routes from "./services/Routes";
import Navigation from "./components/NavBar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Tasks/IncompletedTasks/Tasks.css";

import axios from "axios";

import Login from "./components/Home/LoginModal";
import "./components/Home/Home.css"


import Tasks from "./components/Tasks/IncompletedTasks/Tasks.js";
import CompletedTasks from "./components/Tasks/CompletedTasks/CompletedTasks";
function App() {
  const [loginmodalShow, setloginmodalShow] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [tasksShow, settasksShow] = useState(false);
  const [handleTasks, sethandleTasks] = useState(false);
  const [allData, setallData] = useState(null)
  
  const [userID, setUserID] = useState(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(null);

  const [completedData, setCompletedData] = useState([])
  const [incompletedData, setIncompletedData] = useState([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [modalShow, setModalShow] = useState(true)
  const [logOutSuccessful, setLogOutSuccessful] = useState(false)
  
  // const [completedTask, setCompletedTask] = React.useState(null)
  
  
  // if (loginmodalShow===true && registermodalShow===true){
  //   setregistermodalShow(false)
  // }
  // if (loginmodalShow===false && registermodalShow===true){
  //   setloginmodalShow(false)
  // }
  
  const handleShowLoginHideTasks = () =>{
    setModalShow(true); settasksShow(false); 
  }
  
  const handleData= (order = "tasks") => {
    axios
      .get(`http://127.0.0.1:8000/to_do_list/${userID}/${order}`)
      .then((response) => {
        setCompletedData(response.data.complete);
        setIncompletedData(response.data.incomplete)
        // isLoaded(true);
       
        
        
      });
  };
 
    
  
  useEffect(()=>handleData(), [userID])
  if (modalShow===false && tasksShow===false){
    
    settasksShow(true);
    
  }
  return (
    <div >
      <Navigation completeCount={Object.keys(completedData).length} showLoginHideTasks={()=>handleShowLoginHideTasks()}showComplete={(props) => setShowCompletedTasks(props)} />
      
      
            <Tasks
              updateTasks ={(props)=> setIncompletedData(props)}
              incompletedTasksData = {incompletedData}
              completedTasksData = {completedData}
              user_id={userID}
              show={tasksShow}
              completedhandleTasks={handleTasks}
              handledcompletedTasks ={ () => sethandleTasks(false)}
             
              
            />
            <CompletedTasks
              updateTasks ={(props)=> setCompletedData(props)}
              incompletedTasksData = {incompletedData}
              completedTasksData = {completedData}
              user_id={userID}
              show={showCompletedTasks}
              handleCompletedTasks={(props) => setShowCompletedTasks(props)}
              handleTasks={(props) => sethandleTasks(true)}
              completeCount={Object.keys(completedData).length}
              
              
            />
          <Modal show={modalShow} size="sm" keyboard={false} backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"  centered>
      
    <Modal.Title className="app-modal" id="contained-modal-title-vcenter">{carouselIndex===1?"Create an account":"Sign in"}</Modal.Title>
     <p className="text-center"> to continue to Do or Do not</p>
        
          <Carousel touch={false} keyboard={false} interval={null} indicators={false} controls={false} activeIndex={carouselIndex}>
          <Carousel.Item>
          <Login
            // show={loginmodalShow}
            // onHide={() => setloginmodalShow(false)}
            // backdrop="static"
            // keyboard={false}
            hideModal={()=>setModalShow(false)}
            user={(props) => setUserID(props)}
            showRegister={(props)=>setCarouselIndex(1)}
          />
          </Carousel.Item>
  <Carousel.Item>
          <Register
          //  show={showRegisterModal}
            // onHide={() => setregistermodalShow(false)}
            // backdrop="static"
            // keyboard={false}
            hideModal={()=>setModalShow(false)}
            user={(props) => setUserID(props)}
            showLogin={(props)=>setCarouselIndex(0)}
            />
            </Carousel.Item>
            
          </Carousel>
          
      </Modal>
            
      

      {/* <Routes /> */}
    </div>
  );
}

export default App;
