import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useDevice from "../../hooks/useDevice"
import ChatForm from "./ChatForm"
import ChatHeader from "./ChatHeader"
import ChatHistory from "./ChatHistory"
import ChatMenu from "./ChatMenu"
import ChatUsers from "./ChatUsers"
import {connect, useSelector} from "react-redux";
import {getMessages as getMessagesAction} from "../../Store/Actions/getAllMessages";
import { connectToChat, sendMessage, stompClient } from "../../utils/webSocketChat"
import axios from "axios"
import QuoteForm from "../QuoteForm/QuoteForm"
import { getTimeFromDate } from "../../utils/getTimeFromDate"

function VendorChat({getMessages,userId,userName, stateMessages}) {

  const chatState = useSelector(state => state.chat)
  const currentUserId = useSelector(state => state.userInfo?.userData?.id)
  const currentUserData = useSelector(state => state.userInfo?.userData)

  const { id } = useParams()



  useEffect(() => {
    // fetchData()
    getMessages()
    connectToChat(currentUserId, onMessageReceived)
  }, []);


  const onMessageReceived = (msg) => {
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

    setMessages([
      ...messages,
      {
        senderId: currentUserId,
        recipientId: selectedUser.id,
        senderName: currentUserData.firstName,
        recipientName: selectedUser.firstName,
        id: messages.reverse()[0]?.id + 1,
        content: message.message,
        message:  message.message,
        time: getTimeFromDate(new Date()),
        timestamp: new Date(),
        type: message.type,
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
            <Link to={'/quoteForm'}>
              <div className="header-body-chat__action quote">
                
                  <span>Send Quote</span>
                
                <i className="icon-quote"></i>
              </div>
              </Link>
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
            ''
          )
        }
      </div>
    </section>
  )
}

const mapStateToProps = function (state) {
  return {
    chatState:state.chat,
    userId:state.userInfo.userData.id,
    userName:state.userInfo.userData.firstName,
    stateMessages: state.chat.messages
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: ()=> dispatch(getMessagesAction())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(VendorChat);