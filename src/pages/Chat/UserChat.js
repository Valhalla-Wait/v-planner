import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useDevice from "../../hooks/useDevice"
import ChatForm from "./ChatForm"
import ChatHeader from "./ChatHeader"
import ChatHistory from "./ChatHistory"
import ChatMenu from "./ChatMenu"
import ChatUsers from "./ChatUsers"
import { getMessages as getMessagesAction } from "../../Store/Actions/getAllMessages";
import { connect, useSelector } from "react-redux";
import { connectToChat, sendMessage } from "../../utils/webSocketChat"
import axios from "axios"

function UserChat({ chatState, getMessages, userId, userName }) {
  const currentUserId = useSelector(state => state.userInfo.userData.clientModel.id)
  const token = useSelector(state => state.userInfo.token)
  const { id } = useParams()

  const getRecipients = (chatRooms, userList) => {
    if (!chatRooms) return null
    const recipientsIds = chatRooms.map((room) => Number(room.recipientId))
    const recipients = []
    for (let i = 0; i < recipientsIds.length; i++) {
      recipients.push(userList.find((user) => user.vendorModel.id === recipientsIds[i]))
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

      const allVendors = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/vendors/getAll`,
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
            url: `${process.env.REACT_APP_API_URL}/messages/${currentUserId}/${recipients[i].vendorModel.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
          })

          console.log("fetch 4", chatMessages)

          const lastMessage = chatMessages.data.result.reverse().find((mess) => mess.status === "DELIVERED")
          const convertDate = new Date(lastMessage.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
          recipientsChats.push({
            id: recipients[i].vendorModel.id,
            avatar: recipients[i].vendorModel.photos[0].url,
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
        url: `${process.env.REACT_APP_API_URL}/vendors/getAll`,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      })
      const currentVendorId = id ?? users[0].id
      console.log(allVendors.data.result[0].vendorModel.id, currentVendorId)


      const currentVendor = allVendors.data.result.find((vendor) => vendor.vendorModel.id === Number(currentVendorId))


      setUser({
        id: currentVendor.vendorModel.id,
        avatar: currentVendor.vendorModel.photos[0],
        name: `${currentVendor.firstName} ${currentVendor.surname}`,
        description: currentVendor.vendorModel.companyName
      })

      const chatMessages = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/messages/${currentUserId}/${currentVendorId}`,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      })
      console.log("MESSAGES IN CHAT", chatMessages)
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
    fetchData()
    
    connectToChat(currentUserId)
  }, []);

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
                <div className="header-body-chat__action quote">
                  <span>Request Quote</span>
                  <i className="icon-quote"></i>
                </div>
                <div className="header-body-chat__action quote btn-circle">
                  <i className="icon-trash-outline"></i>
                </div>
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
