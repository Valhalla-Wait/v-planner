import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
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
import { SetConnectChat } from "../../Store/Actions/setChatConnect"
import { setCurrentQuote } from "../../Store/Actions/quoteActions"

function UserChat({ getMessages, userId, userName }) {

  const dispatch = useDispatch()

  const chatState = useSelector(state => state.chat)
  const chatConnect = useSelector(state => state.chat.chatConnect)
  const currentUserId = useSelector(state => state.userInfo?.userData?.id)
  const currentUserData = useSelector(state => state.userInfo?.userData)
  // const token = useSelector(state => state.userInfo.token)
  const { id } = useParams()
  console.log('ID!', id)

  const [selectedUser, setSelectedUser] = useState(id ? chatState.chats.find((c) => c.id === Number(id)) : chatState.chats.length ? chatState.chats[0] : null)

  const [messages, setMessages] = useState([])

  // const selectedUsers = [
  //   {id: },
  // ]

  // {
  //   userId: currentUserData.id,
  //   vendorId: commonVendors?.id,
  //   userFirstName: currentUserData.firstName,
  //   vendorFirstName: commonVendors.firstName
  // }
  useEffect(() => {
    getMessages()
    connectToChat(currentUserId, onMessageReceived, () => dispatch(SetConnectChat()))
    // if (chatState.chats.length && !findCurrentRoom) {
    //   sendMessage('Room created', currentUserId, id, userName, 'none')
    // }


    // if(findCurrentRoom) {
    //   connectToChat(currentUserId, onMessageReceived)
    // }else{
    //   connectToChat(currentUserId, onMessageReceived, {
    //       userId: currentUserData.id,
    //       vendorId: id,
    //       userFirstName: currentUserData.firstName,
    //       vendorFirstName: commonVendors.firstName
    //     })
    // }

  }, []);

  const createRoom = async () => {
    await sendMessage('Room created', currentUserData.id, Number(id), currentUserData.firstName, 'none')
    await getMessages()
    // debugger
  }

  const requestQuote = async () => {
    await sendMessage('User requested a quote', currentUserData.id, Number(id), currentUserData.firstName, 'none')
    await getMessages()
  }

  useEffect(() => {
    // debugger
    const findCurrentRoom = id ? chatState.chats.find((c) => c.id === Number(id)) : chatState.chats[0]
    // debugger

    if (!findCurrentRoom && chatState.chatConnect) {
      if (!chatState.loading) createRoom()
    }
    setSelectedUser(chatState.chats.find((c) => c.id === Number(id)))

    // if(findCurrentRoom) {
    //   connectToChat(currentUserId, onMessageReceived)
    // }
    // if(!findCurrentRoom) {
    //   connectToChat(currentUserId, onMessageReceived, {
    //     userId: currentUserData.id,
    //     vendorId: id,
    //     userFirstName: currentUserData.firstName,
    //     vendorFirstName: 'none'
    //   })
    //   getMessages()
    // }
  }, [chatState])

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



  // const findSelectUser = () => {
  //   if (id && chatState.chats.length) {
  //     const findOnId = chatState.chats.filter((chat) => chat.recipientId === id)
  //     return chat
  //   }
  // }

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
    getMessages()
    setMessages([
      ...messages,
      {
        id: [...messages].reverse()[0]?.id + 1,
        content: message.message,
        message: message.message,
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

    // getMessages()


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
                <div className="header-body-chat__action quote">
                  {selectedUser.quote ?
                    <Link to={`/quote`} onClick={() => dispatch(setCurrentQuote(selectedUser.quote))}>
                      <span>See Quote</span>
                    </Link>
                    :
                    <span onClick={requestQuote}>Request Quote</span>}

                  <i className="icon-quote"></i>
                </div>
                <div className="header-body-chat__action quote btn-circle">
                  <i className="icon-trash-outline"></i>
                </div>
              </ChatHeader>
              <div>
                <ChatHistory messages={messages} user={selectedUser} currentUser={currentUserData} />
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
