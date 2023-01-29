import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { AuthContext } from "../../context/AuthContext"

export default function ChatHistory({ messages, user, currentUser }) {

  const findMsg = messages.findIndex((m) => m.content == "createRoom")

  const chats = useSelector(state => state.chat.chats)

  const currentChatMessages = chats.find((chat) => chat.id === user.id)?.messageHistory


  
  if(findMsg !== -1) {
    messages.splice(findMsg, 1)
  }

  console.log(currentUser,user)
  console.log("MESAGES", messages)

  const auth = useContext(AuthContext)

  console.log("AUTH USER", auth)

  const serviceMessage = ({ id, message }) => {
    return <div className="message-body-chat__service" key={id}>{ message }</div>
  }

  const textMessage = ({ id, message, time, isRecipient, senderName, recipientName }) => {
    return (
      <div className="message-body-chat__user" key={id}>
        <div className="message-body-chat__avatar">
          <img src={ isRecipient ? user.avatar : auth.user.profile.avatar } alt="Vendor" />
        </div>
        <div className="message-body-chat__info">
          <div className="message-body-chat__name">{ isRecipient ? `${user.firstName}` : `${currentUser.firstName}` }</div>
          <div className="message-body-chat__text">{ message }</div>
        </div>
        <div className="message-body-chat__time">{ time }</div>
      </div>
    )
  }

  const fileMessage = ({ id, message, time, isRecipient, file }) => {
    return (
      <div className="message-body-chat__user" key={id}>
        <div className="message-body-chat__avatar">
          <img src={ isRecipient ? user.avatar : auth.user.profile.avatar } alt="Vendor" />
        </div>
        <div className="message-body-chat__info">
          <div className="message-body-chat__name">{ isRecipient ? user.name : `${auth.user.profile.firstName} ${auth.user.profile.lastName}` }</div>
          <div className="message-body-chat__text">{ message }</div>
          {
            file.type === "image"
              ? <img className="message-body-chat__img" src={ file.src } alt=""/>
              : <div className="message-body-chat__file"><a href={file.src} target="_blank" rel="noreferrer">View file</a></div>
          }
        </div>
        <div className="message-body-chat__time">{ time }</div>
      </div>
    )
  }

  const types = {
    serviceMessage,
    textMessage,
    fileMessage
  }

  useEffect(() => {
    const history = document.querySelector(".message-body-chat")
    history.scrollTo({
      top: history.scrollHeight,
      behavior: "smooth"
    })
  }, [currentChatMessages])
  

  return (
    <div className="body-chat__message message-body-chat">
      {
        currentChatMessages.map(message => types[message.type](message))
      }
    </div>
  )
}