import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Row,
  Container,
  Col,
  Modal,
  Carousel,
  Alert,
  Tabs,
  Tab,
  Nav,
  Offcanvas,
  Navbar
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Register from "./components/Home/RegisterModal";
// import Routes from "./services/Routes";
import Navigation from "./components/NavBar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Tasks/SoloTasks/Tasks.css";

import axios from "axios";
import "./components/Friends/Friends.css";
import Login from "./components/Home/LoginModal";
import "./components/Home/Home.css";
import "./components/NavBar.css";
import "./components/Tasks/SoloTasks/CompletedTasks/CompletedTasks.css";
import SharedTasks from "./components/Tasks/SharedTasks/SharedTasks.js";
import Tasks from "./components/Tasks/SoloTasks/Tasks.js";
import CompletedTasks from "./components/Tasks/SoloTasks/CompletedTasks/CompletedTasks";
import Friends from "./components/Friends/Friends.js";
import SharedCompletedTasks from "./components/Tasks/SharedTasks/SharedCompletedTasks/SharedCompletedTasks";
function App() {
  const [loginmodalShow, setloginmodalShow] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [tasksShow, settasksShow] = useState(false);
  const [handleTasks, sethandleTasks] = useState(false);
  const [allData, setallData] = useState(null);

  const [userID, setUserID] = useState();
  const [showFriends, setShowFriends] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(null);
  const [showSharedTasks, setShowSharedTasks] = useState(false);

  const [allFriendsData, setAllFriendsData] = useState([]);

  const [completedData, setCompletedData] = useState([]);
  const [incompletedData, setIncompletedData] = useState([]);
  const [allReceivedFriendRequestsData, setAllReceivedFriendRequestsData] =
    useState([]);
  const [allSentFriendRequestsData, setAllSentFriendRequestsData] = useState(
    []
  );

  const [loginRegisterCarouselIndex, setloginRegisterCarouselIndex] =
    useState(0);
  const [tasksCarouselIndex, setTasksCarouselIndex] = useState(0);
  const [completedTasksCarouselIndex, setcompletedTasksCarouselIndex] =
    useState(0);

  const [modalShow, setModalShow] = useState(true);
  const [logOutSuccessful, setLogOutSuccessful] = useState(false);
  const [tasksTabKey, setTasksTabKey] = useState("Solo");
  const [completedTasksTabKey, setCompletedTasksTabKey] =
    useState("SoloCompleted");
  const handleTasksTabSelect = (key) => {
    setTasksTabKey(key);
    if (key === "Solo") {
      return setTasksCarouselIndex(0);
    }
    if (key === "Shared") {
      return setTasksCarouselIndex(1);
    }
  };
  const handleCompletedTasksTabSelect = (key) => {
    setCompletedTasksTabKey(key);
    if (key === "SoloCompleted") {
      return setcompletedTasksCarouselIndex(0);
    }
    if (key === "SharedCompleted") {
      return setcompletedTasksCarouselIndex(1);
    }
  };
  useEffect(() => handleFriendsData(userID), [userID]);
  useEffect(() => handleSentFriendRequestsData(), [userID]);
  useEffect(() => handleTasksData(userID), [userID]);
  // const [completedTask, setCompletedTask] = React.useState(null)

  // if (loginmodalShow===true && registermodalShow===true){
  //   setregistermodalShow(false)
  // }
  // if (loginmodalShow===false && registermodalShow===true){
  //   setloginmodalShow(false)
  // }

  const handleShowLoginHideTasks = () => {
    setModalShow(true);
    settasksShow(false);
  };
  const handleReceivedFriendRequestsData = () => {
    axios
      .get(
        `http://127.0.0.1:8000/to_do_list/${userID}/user-received-friend-requests`
      )
      .then((response) => {
        setAllReceivedFriendRequestsData(response.data.user_friend_requests);
        // isLoaded(true);
      });
  };
  const handleSentFriendRequestsData = () => {
    axios
      .get(
        `http://127.0.0.1:8000/to_do_list/${userID}/user-sent-friend-requests`
      )
      .then((response) => {
        setAllSentFriendRequestsData(response.data.user_sent_friend_requests);
        // isLoaded(true);
      });
  };
  const MINUTE_MS = 30000;
  // useEffect(() => handleReceivedFriendRequestsData(userID), [userID]);
  useEffect(() => {
    const interval = setInterval(() => {
      handleReceivedFriendRequestsData(userID);
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [userID]);
  const handleTasksData = () => {
    axios
      .get(`http://127.0.0.1:8000/to_do_list/${userID}/tasks`)
      .then((response) => {
        setCompletedData(response.data.complete);
        setIncompletedData(response.data.incomplete);
        // isLoaded(true);
      });
  };
  const handleFriendsData = () => {
    axios
      .get(`http://127.0.0.1:8000/to_do_list/${userID}/user-friends`)
      .then((response) => {
        handleReceivedFriendRequestsData(userID);
        setAllFriendsData(response.data.user_friends);
        // isLoaded(true);
      });
  };

  if (modalShow === false && tasksShow === false) {
    settasksShow(true);
  }
  return (
    <div>
      <Navigation
        showFriends={() => setShowFriends(true)}
        showShared={() => setShowSharedTasks(true)}
        completeCount={tasksShow ? Object.keys(completedData).length : null}
        showLoginHideTasks={() => handleShowLoginHideTasks()}
        showComplete={(props) => setShowCompletedTasks(props)}
        userID={userID}
      />
     <Navbar fixed="bottom" bg="light">
      <Nav navbar={false} fill variant="pills" className="tasks-tab" activeKey={tasksTabKey}
  onSelect={(k)=>handleTasksTabSelect(k)}
 
  >
      
              <Nav.Item className="solo-shared-buttons">
              <Nav.Link eventKey="Solo">Solo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link eventKey="Shared"> Shared
              </Nav.Link>
       </Nav.Item>
      
       </Nav>
       </Navbar>
       
      {/* <Tabs
        variant="pills"
        activeKey={tasksTabKey}
        onSelect={(k) => handleTasksTabSelect(k)}
        id="noanim-tab-example"
        className="tasks-tab"
      >
        <Tab eventKey="Solo" title="Solo"></Tab>

        <Tab eventKey="Shared" title="Shared"></Tab>
      </Tabs> */}

      <Carousel
        touch={false}
        keyboard={false}
        interval={null}
        indicators={false}
        controls={false}
        activeIndex={tasksCarouselIndex}
      >
        <Carousel.Item>
          <Tasks
            handleSharedSelected={() => setTasksCarouselIndex(1)}
            updateTasks={(props) => setIncompletedData(props)}
            incompletedTasksData={incompletedData}
            completedTasksData={completedData}
            userID={userID}
            show={tasksShow}
            completedhandleTasks={handleTasks}
            handledcompletedTasks={() => sethandleTasks(false)}
          />
        </Carousel.Item>

        <Carousel.Item>
          <SharedTasks
            handleSoloSelected={() => setTasksCarouselIndex(0)}
            updateTasks={(props) => setIncompletedData(props)}
            incompletedTasksData={incompletedData}
            completedTasksData={completedData}
            userID={userID}
            show={tasksShow}
            completedhandleTasks={handleTasks}
            handledcompletedTasks={() => sethandleTasks(false)}
          />
        </Carousel.Item>
        
      </Carousel>
      <Offcanvas
        show={showCompletedTasks}
        onHide={() => setShowCompletedTasks(false)}
      >
        <Offcanvas.Header
          closeButton
          onClick={() => setShowCompletedTasks(false)}
        >
          <Offcanvas.Title className="completed-title">Completed</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Tabs
         
          fill variant="pills" 
            
            activeKey={completedTasksTabKey}
            onSelect={(k) => handleCompletedTasksTabSelect(k)}
            id="noanim-tab-example"
            className="completed-tabs"
          >
            <Tab eventKey="SoloCompleted" title="Solo"></Tab>

            <Tab eventKey="SharedCompleted" title="Shared"></Tab>
          </Tabs>
          
          <Carousel
            touch={false}
            keyboard={false}
            interval={null}
            indicators={false}
            controls={false}
            activeIndex={completedTasksCarouselIndex}
          >
            <Carousel.Item>
              <CompletedTasks
                updateTasks={(props) => setCompletedData(props)}
                incompletedTasksData={incompletedData}
                completedTasksData={completedData}
                userID={userID}
                show={showCompletedTasks}
                hideCompletedTasks={(props) => setShowCompletedTasks(false)}
                // handleTasks={(props) => sethandleTasks(true)}
              
              />
            </Carousel.Item>
            <Carousel.Item>
              <SharedCompletedTasks
                updateTasks={(props) => setCompletedData(props)}
                incompletedTasksData={incompletedData}
                completedTasksData={completedData}
                userID={userID}
                show={showCompletedTasks}
                hideCompletedTasks={(props) => setShowCompletedTasks(false)}
              />
            </Carousel.Item>
          </Carousel>
        </Offcanvas.Body>
      </Offcanvas>
      <Friends
        allReceivedFriendRequestsData={allReceivedFriendRequestsData}
        allSentFriendRequestsData={allSentFriendRequestsData}
        allFriendsData={allFriendsData}
        updateAllReceivedFriendRequestsData={(data) =>
          setAllReceivedFriendRequestsData(data)
        }
        updateAllFriendsData={(data) => setAllFriendsData(data)}
        userID={userID}
        show={showFriends}
        hideFriends={(props) => setShowFriends(false)}
      />
      <Modal
        show={modalShow}
        size="sm"
        keyboard={false}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Title className="app-modal" id="contained-modal-title-vcenter">
          {loginRegisterCarouselIndex === 1 ? "Create an account" : "Sign in"}
        </Modal.Title>
        <p className="text-center"> to continue to Do or Do not</p>

        <Carousel
          touch={false}
          keyboard={false}
          interval={null}
          indicators={false}
          controls={false}
          activeIndex={loginRegisterCarouselIndex}
        >
          <Carousel.Item>
            <Login
              // show={loginmodalShow}
              // onHide={() => setloginmodalShow(false)}
              // backdrop="static"
              // keyboard={false}
              hideModal={() => setModalShow(false)}
              user={(props) => setUserID(props)}
              showRegister={(props) => setloginRegisterCarouselIndex(1)}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Register
              //  show={showRegisterModal}
              // onHide={() => setregistermodalShow(false)}
              // backdrop="static"
              // keyboard={false}
              hideModal={() => setModalShow(false)}
              user={(props) => setUserID(props)}
              showLogin={(props) => setloginRegisterCarouselIndex(0)}
            />
          </Carousel.Item>
        </Carousel>
      </Modal>
             

       

      {/* <Routes /> */}
    </div>
  );
}

export default App;
