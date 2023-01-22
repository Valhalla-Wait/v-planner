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

function VendorChat({chatState,getMessages,userId,userName, stateMessages}) {

  const currentUserId = useSelector(state => state.vendorInfo?.vendorData?.vendorModel?.id)
  const token = useSelector(state => state.vendorInfo.token)
  const { id } = useParams()

  const getRecipients = (chatRooms, userList) => {
    if (!chatRooms) return null
    const filteredChatRooms = chatRooms.filter((r) => r.recipientId !== null )
    const recipientsIds = filteredChatRooms.map((room) => Number(room.recipientId))
    const recipients = []
    for (let i = 0; i < recipientsIds.length; i++) {
      console.log("LISTs", recipientsIds[i], filteredChatRooms)
      recipients.push(userList.find((user) => user.clientModel.id === recipientsIds[i]))
    }
    return recipients
  }



    const fetchData = async () => {
      try {
        const chatRoomData = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/chat-rooms/${currentUserId}`,
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
  
        console.log("fetch 1", chatRoomData)

        if(!chatRoomData.data.result.length) return
  
        const allVendors = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/clients/getAll`,
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
        console.log("fetch 2", allVendors)
        const recipients = getRecipients(chatRoomData.data.result, allVendors.data.result)
        const recipientsChats = []
        console.log("fetch 3", recipients)
  
        if (recipients) {
          for (let i = 0; i < recipients.length; i++) {
  
            const chatMessages = await axios({
              method: "get",
              url: `${process.env.REACT_APP_API_URL}/messages/${currentUserId}/${recipients[i].clientModel.id}`,
              headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            })
  
            console.log("fetch 4", chatMessages)
  
            const lastMessage = chatMessages.data.result.reverse().find((mess) => mess.status === "DELIVERED")
            const convertDate = new Date(lastMessage.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  
            console.log("REC", recipients[0].clientModel.photoModel.url)
  
            recipientsChats.push({
              id: recipients[i].clientModel.id,
              avatar: recipients[i].clientModel.photoModel.url,
              firstName: recipients[i].firstName,
              surname: recipients[i].surname,
              lastMessage: {
                message: lastMessage.content,
                time: convertDate
              },
              newMessages: 0,
              type: 'text'
            })
          }
          setUsers(recipientsChats)
          await fetchActiveChatData()
        } else {
          return setUsers([])
        }
  
      } catch (err) {
        console.log(err)
      }
    }
  
    const fetchActiveChatData = async () => {
      try {
        const allVendors = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/clients/getAll`,
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
  
        console.log(id, users[0].id)
  
        const currentVendorId = id ?? users[0].id
  
        console.log(allVendors.data.result[0].clientModel.id, currentVendorId)
  
        const currentVendor = allVendors.data.result.find((vendor) => vendor.clientModel.id === Number(currentVendorId))
  
  
        setUser({
          id: currentVendor.clientModel.id,
          avatar: currentVendor.clientModel.photoModel.url,
          name: `${currentVendor.firstName} ${currentVendor.surname}`,
          description: currentVendor.clientModel.companyName
        })
  
        const chatMessages = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/messages/${currentUserId}/${currentVendorId}`,
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
        const messageList = chatMessages.data.result.map((m) => ({
          id: m.id,
          type: "textMessage",
          message: m.content,
          time: new Date(m.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          isRecipient: m.senderId === Number(id)
        }))
        setMessages(messageList)
      } catch (err) {
        console.log(err)
      }
    }

  useEffect(() => {
    if(currentUserId && token) {
      fetchData()
      connectToChat(currentUserId)
    }
    
  }, [currentUserId]);

  const [currentChatRoom, setCurrentChatRoom] = useState()

  const [messList, setMessList] = useState([])
  console.log(messList, token)
  const [users, setUsers] = useState([])

  const [messages, setMessages] = useState([
     ])

  const [user, setUser] = useState({
    id: '',
    avatar: "",
    name: "",
    description: ""
  })
  const { isMobile, isLaptop } = useDevice()

  const [menu, setMenu] = useState([
    { title: "All Chats", active: true },
    { title: "Archive", active: false }
  ])

  const addMessage = async (message) => {

    await sendMessage(message.message, currentUserId, 1, userName, 'quoteVendor')

    setMessages([
      ...messages,
      message
    ])


  }



  return (
    <section className="chat shadow">
      {/* {!user.id ? <div className="err-msg">Chat not found</div> : */}
      <div className="chat__content">
      {
        (((isMobile || isLaptop) && !id) || (!isMobile && !isLaptop)) && (
          <div className="chat__sidebar sidebar-chat">
            <h3 className="sidebar-chat__title">Chat</h3>
            <ChatMenu menu={menu} />
            <ChatUsers users={users} />
          </div>
        )
      }
      {
        (((isMobile || isLaptop) && id) || (!isMobile && !isLaptop)) && (
          <div className="chat__body body-chat">
            <ChatHeader user={user}>
              <Link className="link" to='/quote-form' element={<QuoteForm />} >
                <div className="header-body-chat__action quote">
                  <span>Send Quote</span>
                  <i className="icon-quote"></i>
                </div>
              </Link>
            </ChatHeader>
            <div>
              <ChatHistory messages={messages} user={user} />
              <ChatForm onCallback={addMessage} />
            </div>
          </div>
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
    userName:state.vendorInfo.vendorData.username,
    stateMessages: state.chat.messages
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: ()=> dispatch(getMessagesAction())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(VendorChat);