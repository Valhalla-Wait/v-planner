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
import { quoteStatuses } from "../../Store/Actions/quoteActions"

function VendorChat({getMessages,userId,userName, stateMessages}) {

  const chatState = useSelector(state => state.chat)
  const currentUserId = useSelector(state => state.vendorInfo?.vendorData?.id)
  const currentUserData = useSelector(state => state.vendorInfo?.vendorData)
  const token = useSelector(state => state.vendorInfo.token)

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

  const [selectedUser, setSelectedUser] = useState(id ? chatState.chats.find((c) => c.id === Number(id)) : chatState.chats.length ? chatState.chats[0] : null)

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
        id: [...messages].reverse()[0]?.id + 1,
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

  const onCallback = async (selectUserId) => {
    const selectUser = chatState.chats.find((chat) => chat.id === selectUserId)

    // const clientId = await axios({
    //   method: "get",
    //   url: `${process.env.REACT_APP_API_URL}/clients/getById?id=${id}`,
    //    headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
    // })

    // const newSelectUser = {...selectUser, clientId: clientId.data.result.clientModel.id}
     
    setMessages(selectUser?.messageHistory)
    setSelectedUser(selectUser)

  }

// debugger
  
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
            
              {(!selectedUser.quote || selectedUser.quote.status === quoteStatuses.ACCEPTED.value ) && <><Link to={`/quote-form/${selectedUser.id}`}><div className="header-body-chat__action quote">
                
                <span>Send Quote</span>
              
              <i className="icon-quote"></i>
            </div></Link>
            <div className="header-body-chat__action quote btn-circle">
                <i className="icon-trash-outline"></i>
            </div>
            </>
            }
            
            
              {(selectedUser.quote.status === quoteStatuses.NEW.value || selectedUser.quote.status === quoteStatuses.VIEWED.value) && <div className="quote-status">Quote Status: <span className="await-accept-quote">Awaiting Acceptance</span></div>}

              {selectedUser.quote.status === quoteStatuses.DECLINED.value && <div className="quote-status">Quote Status: <span className="declined-quote">Declined</span></div>}
              

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
    userId:state.vendorInfo.vendorData.id,
    userName:state.vendorInfo.vendorData.firstName,
    stateMessages: state.chat.messages
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: ()=> dispatch(getMessagesAction())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(VendorChat);