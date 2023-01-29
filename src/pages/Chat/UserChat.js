import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useDevice from "../../hooks/useDevice"
import ChatForm from "./ChatForm"
import ChatHeader from "./ChatHeader"
import ChatHistory from "./ChatHistory"
import ChatMenu from "./ChatMenu"
import ChatUsers from "./ChatUsers"
import { getMessages as getMessagesAction } from "../../Store/Actions/getAllMessages";
import { connect, useDispatch, useSelector } from "react-redux";
import { connectToChat, sendMessage } from "../../utils/webSocketChat"
import axios from "axios"
import { getChatMessages } from "../../Store/Actions/getChatMessages"
import { getTimeFromDate } from "../../utils/getTimeFromDate"
import { updateChatMessages } from "../../Store/Actions/updateChatMessages"

function UserChat({ getMessages, userId, userName }) {

  const dispatch = useDispatch()

  const chatState = useSelector(state => state.chat)
  const currentUserId = useSelector(state => state.userInfo?.userData?.id)
  const currentUserData = useSelector(state => state.userInfo?.userData)
  // const token = useSelector(state => state.userInfo.token)
  const { id } = useParams()

  // const selectedUsers = [
  //   {id: },
  // ]

  useEffect(() => {
    getMessages()
    connectToChat(currentUserId, onMessageReceived)
  }, []);

  const onMessageReceived = async (msg) => {
      const notification = JSON.parse(msg.body);
  
      console.log('MSG ANSWER', notification)
      getMessages()
      // dispatch(updateChatMessages(notification))

      // if (currentUserId === notification.senderId) {
      //   findChatMessage(notification.id).then((message) => {
      //     const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
      //       .chatMessages;
      //     newMessages.push(message);
      //     setMessages(newMessages);
      //   });
      // } else {
      //   message.info("Received a new message from " + notification.senderName);
      // }
    };

  const [selectedUser, setSelectedUser] = useState(chatState.chats ? chatState.chats[0] : null)

  const [messages, setMessages] = useState()

  const { isMobile, isLaptop } = useDevice()

  const [menu, setMenu] = useState([
    { title: "All Chats", active: true },
    { title: "Archive", active: false }
  ])

  console.log(chatState)
  console.log(selectedUser)
  const addMessage = async (message) => {

    await sendMessage(message.message, currentUserId, selectedUser.id, userName, selectedUser.firstName)
    // () => dispatch(getChatMessages(currentUserId, selectedUser.id))
    
    setMessages([
      ...messages,
      {
        id: messages.reverse()[0]?.id + 1,
        content: message.message,
        message:  message.message,
        senderId: currentUserId,
        recipientId: selectedUser.id,
        senderName: currentUserData.firstName,
        recipientName: selectedUser.firstName,
        time: getTimeFromDate(new Date()),
        timestamp: new Date(),
        type: 'textMessage',
        status: "DELIVERED",
        isRecipient: false
    }
    ])

    getMessages()


  }

  const onCallback = (selectUserId) => {
    const selectUser = chatState.chats.find((chat) => chat.id === selectUserId)
    setMessages(selectUser?.messageHistory)
    setSelectedUser(selectUser)

  }


    //COPY

  // const connect = () => {
  //   const Stomp = require("stompjs");
  //   var SockJS = require("sockjs-client");
  //   SockJS = new SockJS("http://localhost:8080/ws");
  //   stompClient = Stomp.over(SockJS);
  //   stompClient.connect({}, onConnected, onError);
  // };

  // const onConnected = () => {
  //   console.log("connected");
  //   console.log(currentUser);
  //   stompClient.subscribe(
  //     "/user/" + currentUser.id + "/queue/messages",
  //     onMessageReceived
  //   );
  // };

  // const onError = (err) => {
  //   console.log(err);
  // };

  // const onMessageReceived = (msg) => {
  //   const notification = JSON.parse(msg.body);
  //   const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
  //     .chatActiveContact;

  //   if (active.id === notification.senderId) {
  //     findChatMessage(notification.id).then((message) => {
  //       const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
  //         .chatMessages;
  //       newMessages.push(message);
  //       setMessages(newMessages);
  //     });
  //   } else {
  //     message.info("Received a new message from " + notification.senderName);
  //   }
  //   loadContacts();
  // };

  // const sendMessage = (msg) => {
  //   if (msg.trim() !== "") {
  //     const message = {
  //       senderId: currentUser.id,
  //       recipientId: activeContact.id,
  //       senderName: currentUser.name,
  //       recipientName: activeContact.name,
  //       content: msg,
  //       timestamp: new Date(),
  //     };
  //     stompClient.send("/app/chat", {}, JSON.stringify(message));

  //     const newMessages = [...messages];
  //     newMessages.push(message);
  //     setMessages(newMessages);
  //   }
  // };

  // const loadContacts = () => {
  //   const promise = getUsers().then((users) =>
  //     users.map((contact) =>
  //       countNewMessages(contact.id, currentUser.id).then((count) => {
  //         contact.newMessages = count;
  //         return contact;
  //       })
  //     )
  //   );

  //   promise.then((promises) =>
  //     Promise.all(promises).then((users) => {
  //       setContacts(users);
  //       if (activeContact === undefined && users.length > 0) {
  //         setActiveContact(users[0]);
  //       }
  //     })
  //   );
  // };



  return (
    <section className="chat shadow">
      <div className="chat__content">
        {
          (((isMobile || isLaptop) && !id) || (!isMobile && !isLaptop)) && (
            <div className="chat__sidebar sidebar-chat">
              <h3 className="sidebar-chat__title">Chat</h3>
              <ChatMenu menu={menu} />
              <ChatUsers users={chatState.chats} onCallback={onCallback} />
            </div>
          )
        }
        {
          (((isMobile || isLaptop) && id) || (!isMobile && !isLaptop)) && (
            selectedUser ? <div className="chat__body body-chat">
            <ChatHeader user={selectedUser}>
              <div className="header-body-chat__action quote">
                <span>Request Quote</span>
                <i className="icon-quote"></i>
              </div>
              <div className="header-body-chat__action quote btn-circle">
                <i className="icon-trash-outline"></i>
              </div>
            </ChatHeader>
            <div>
              <ChatHistory messages={messages} user={selectedUser} currentUser={currentUserData}/>
              <ChatForm onCallback={addMessage} />
            </div>
          </div>
            :
            'Select chat'
          )
        }
      </div>
    </section>
  )
}
const mapStateToProps = function (state) {
  return {
    chatState: state.chat,
    userId: state.userInfo.userData.id,
    userName: state.userInfo.userData.firstName
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: () => dispatch(getMessagesAction())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserChat);
