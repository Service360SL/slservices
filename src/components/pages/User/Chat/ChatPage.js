import React,{useState,useEffect} from "react";
import { Row, Col, Card, InputGroup, Modal, Container } from "react-bootstrap";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import Aisu from "./../../../../assets/images/advertiser/aishu.jpg";
import Adam from "./../../../../assets/images/advertiser/Adam.jpg";
import Sara from "./../../../../assets/images/advertiser/sara.jpg";
import ProAd from "./../../../../assets/images/advertiser/proAd.jpg";
import cus1 from "./../../../../assets/images/home/Customer_1.png";
import cus2 from "./../../../../assets/images/home/Customer_2.png";
import cus3 from "./../../../../assets/images/home/Customer_3.png";
import BgImage from "../../../../assets/images/header/Background.png";
import "../../../../style/User/Chat/Chat.css";
import axios from "axios";

const ChatApp = () => {

  const [chatusers, setChatUsers] = useState([]);
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);
  const [chater, setChater] = useState("");
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");


  const getChatPersons = () => {
    axios
      .get(`http://localhost:8080/auth/chatpersons/${userDetail.userid}`)
      .then((response) => {
        console.log(response.data);
        setChatUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const getMessages = (userId) => {
    setChater(userId);
    axios
      .get(`http://localhost:8080/auth/chatmessages/${userDetail.userid}/${userId}`)
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }
      );
  }

useEffect(() => {
  const intervalId = setInterval(getChatPersons, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);


  const sendMessages = () => {
    console.log(msgInput);
    const data = {
      senderId: userDetail.userid,
      receiverId: chater,
      message: msgInput,
    };
    axios
      .post(`http://localhost:8080/auth/sendmessage`, data)
      .then((response) => {
        console.log(response.data);
        getMessages(chater);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }
      );
  }



  return (
    <Container>
      <div fluid>
        <h1>Chat</h1>
        <Row>
          <Col md="12">
            <Card id="chat3">
              <Card.Body style={{ backgroundImage: `url(${BgImage})` }}>
                <Row>
                  <Col md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                    <div className="p-3">
                      <InputGroup className="rounded mb-3 border">
                        <input
                          className="form-control rounded"
                          placeholder="Search"
                          type="search"
                        />
                        <InputGroup.Text className="border-0" id="search-addon">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </InputGroup.Text>
                      </InputGroup>

                      <Scrollbar
                        suppressScrollX
                        style={{ position: "relative", height: "40em" }}
                      >
                        {chatusers.map((user, index) => (
                          <li className="p-2 border-bottom chathover">
                            <a
                              onClick={getMessages(user.userId)}
                              className="d-flex justify-content-between"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src={Aisu}
                                    alt="avatar"
                                    className="chatProImg d-flex align-self-center me-3"
                                  />
                                </div>
                                <div className="pt-1">
                                  <p
                                    className="fw-bold mb-0"
                                    style={{ color: "#000000" }}
                                  >
                                    {user.name}
                                  </p>
                                  <p className="small text-muted">
                                    {user.lastMessage}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Just now
                                </p>
                                <span
                                  className="badge  rounded-pill float-end"
                                  style={{ backgroundColor: "#292D32" }}
                                >
                                  3
                                </span>
                              </div> */}
                            </a>
                          </li>
                        ))}
                      </Scrollbar>
                    </div>
                  </Col>
                  <Col md="6" lg="7" xl="8">
                    <Scrollbar
                      suppressScrollX
                      style={{ position: "relative", height: "40em" }}
                      className="pt-3 pe-3"
                    >
                      {messages.map((message, index) =>
                        message.senderId === userDetail.userid ? (
                          <div
                            className="d-flex flex-row justify-content-start"
                            key={index}
                          >
                            <img
                              src={Aisu}
                              alt="avatar"
                              className="chatProImg d-flex align-self-center me-3"
                            />
                            <div>
                              <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{ backgroundColor: "#f5f6f7" }}
                              >
                                {message.message}
                                {/* Display the message content */}
                              </p>
                              <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                {message.timestamp}
                                {/* Display the message timestamp */}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="d-flex flex-row justify-content-end"
                            key={index}
                          >
                            <div>
                              <p
                                className="small p-2 me-3 mb-1 text-white rounded-3"
                                style={{ backgroundColor: "#1f285a" }}
                              >
                                {message.message}
                                {/* Display the message content */}
                              </p>
                              <p className="small me-3 mb-3 rounded-3 text-muted">
                                {message.timestamp}{" "}
                                {/* Display the message timestamp */}
                              </p>
                            </div>
                            <img
                              src={cus3}
                              alt="avatar"
                              className="chatProImg d-flex align-self-center me-3"
                            />
                          </div>
                        )
                      )}
                    </Scrollbar>
                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img
                        src={cus3}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                      <div
                        className="d-flex border align-items-center rounded-3 px-3"
                        style={{ width: "100%" }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setMsgInput(e.target.value)}
                          className="form-control form-control-lg"
                          id="exampleFormControlInput2"
                          placeholder="Type message"
                        />
                        {/* <a className="ms-1 text-muted" href="#!">
                          <i
                            className="fa-solid fa-paperclip"
                            style={{
                              color: "#292D32",
                            }}
                          ></i>
                        </a>
                        <a className="ms-3 text-muted" href="#!">
                          <i
                            className="fa-solid fa-face-smile"
                            style={{
                              color: "#292D32",
                            }}
                          ></i>
                        </a> */}
                        
                          <i
                            className="fa-solid fa-paper-plane"
                            onClick={sendMessages}
                            style={{
                              color: "#292D32",
                            }}
                          ></i>
                       
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ChatApp;

// import React,{useState,useEffect} from "react";
// import { Row, Col, Card, InputGroup, Modal, Container } from "react-bootstrap";
// import Scrollbar from "react-perfect-scrollbar";
// import "react-perfect-scrollbar/dist/css/styles.css";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";
// import axios from "axios";

// import Aisu from "./../../../../assets/images/advertiser/aishu.jpg";
// import Adam from "./../../../../assets/images/advertiser/Adam.jpg";
// import Sara from "./../../../../assets/images/advertiser/sara.jpg";
// import ProAd from "./../../../../assets/images/advertiser/proAd.jpg";
// import cus1 from "./../../../../assets/images/home/Customer_1.png";
// import cus2 from "./../../../../assets/images/home/Customer_2.png";
// import cus3 from "./../../../../assets/images/home/Customer_3.png";
// import BgImage from "../../../../assets/images/header/Background.png";
// import "../../../../style/User/Chat/Chat.css";

// var stompClient = null;
// const ChatApp = () => {
//   const [privateChats, setPrivateChats] = useState(new Map());
//   const [publicChats, setPublicChats] = useState([]);
//   const [Users, setUsers] = useState([]);
//   const [tab, setTab] = useState("CHATROOM");
//   const [userData, setUserData] = useState({
//     username: "",
//     receivername: "",
//     connected: false,
//     message: "",
//   });

//   const response = sessionStorage.getItem("authenticatedUser");
//   const userDetail = JSON.parse(response);

//   useEffect(() => {
//     console.log(userData);
//   }, [userData]);

//   const connect = () => {
//     let Sock = new SockJS("http://localhost:8080/auth/ws");
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//   };

//   const onConnected = () => {
//     setUserData({ ...userData, connected: true });
//     stompClient.subscribe("/chatroom/public", onMessageReceived);
//     stompClient.subscribe(
//       "/user/" + userData.username + "/private",
//       onPrivateMessage
//     );
//     userJoin();
//   };

//   const userJoin = () => {
//     var chatMessage = {
//       senderName: userData.username,
//       status: "JOIN",
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   const onMessageReceived = (payload) => {
//     var payloadData = JSON.parse(payload.body);
//     switch (payloadData.status) {
//       case "JOIN":
//         if (!privateChats.get(payloadData.senderName)) {
//           privateChats.set(payloadData.senderName, []);
//           setPrivateChats(new Map(privateChats));
//         }
//         break;
//       case "MESSAGE":
//         publicChats.push(payloadData);
//         setPublicChats([...publicChats]);
//         break;
//     }
//   };

//   const onPrivateMessage = (payload) => {
//     console.log(payload);
//     var payloadData = JSON.parse(payload.body);
//     if (privateChats.get(payloadData.senderName)) {
//       privateChats.get(payloadData.senderName).push(payloadData);
//       setPrivateChats(new Map(privateChats));
//     } else {
//       let list = [];
//       list.push(payloadData);
//       privateChats.set(payloadData.senderName, list);
//       setPrivateChats(new Map(privateChats));
//     }
//   };

//   const onError = (err) => {
//     console.log(err);
//   };

//   const handleMessage = (event) => {
//     const { value } = event.target;
//     setUserData({ ...userData, message: value });
//   };

//   const sendPrivateValue = () => {
//     if (stompClient) {
//       var chatMessage = {
//         senderName: userData.username,
//         receiverName: tab,
//         message: userData.message,
//         status: "MESSAGE",
//       };

//       if (userData.username !== tab) {
//         privateChats.get(tab).push(chatMessage);
//         setPrivateChats(new Map(privateChats));
//       }
//       stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, message: "" });
//     }
//   };

//   useEffect(() => {
//     const apiUrl = `http://localhost:8080/auth/chatpersons/${userDetail.userid}`;

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         console.log(response.data);
//         setUsers(response.data);
//         setUserData({ ...userData, username: userDetail.email });
//         // conectOldusers();
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const conectOldusers = () => {
//     Users.map((user, index) => {
//       if (!privateChats.get(user.Email)) {
//         privateChats.set(user.Email, []);
//         setPrivateChats(new Map(privateChats));
//       }
//     }
//     )
//   }

//   const setupUser = (name) => {

//     if(userData.username !== "" && !userData.connected){
//       connect();
//     }
//     setTab(name);

//   }

//   return (
//     <div className="container">
//       <div className="chat-box">
//         <div className="member-list">
//           <ul>
//             {Users.map((user, index) => (
//               <li
//                 onClick={() => {
//                   setupUser(user.Email);
//                 }}
//                 className={`member ${tab === user.Email && "active"}`}
//                 key={index}
//               >
//                 {user.name}
//               </li>
//             ))}

//             {[...privateChats.keys()].map((name, index) => (
//               <li
//                 onClick={setupUser(name)}
//                 className={`member ${tab === name && "active"}`}
//                 key={index}
//               >
//                 {name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {tab !== "CHATROOM" && (
//           <div className="chat-content">
//             <ul className="chat-messages">
//               {[...privateChats.get(tab)].map((chat, index) => (
//                 <li
//                   className={`message ${
//                     chat.senderName === userData.username && "self"
//                   }`}
//                   key={index}
//                 >
//                   {chat.senderName !== userData.username && (
//                     <div className="avatar">{chat.senderName}</div>
//                   )}
//                   <div className="message-data">{chat.message}</div>
//                   {chat.senderName === userData.username && (
//                     <div className="avatar self">{chat.senderName}</div>
//                   )}
//                 </li>
//               ))}
//             </ul>

//             <div className="send-message">
//               <input
//                 type="text"
//                 className="input-message"
//                 placeholder="enter the message"
//                 value={userData.message}
//                 onChange={handleMessage}
//               />
//               <button
//                 type="button"
//                 className="send-button"
//                 onClick={sendPrivateValue}
//               >
//                 send
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
