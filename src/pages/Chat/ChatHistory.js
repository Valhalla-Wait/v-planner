import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function ChatHistory({ messages, user }) {

  console.log("USERS",user)

  const auth = useContext(AuthContext)

  const serviceMessage = ({ id, message }) => {
    return <div className="message-body-chat__service" key={id}>{ message }</div>
  }

  const textMessage = ({ id, message, time, isRecipient }) => {
    return (
      <div className="message-body-chat__user" key={id}>
        <div className="message-body-chat__avatar">
          <img src={ isRecipient ? user.avatar : auth.user.profile.avatar } alt="Vendor" />
        </div>
        <div className="message-body-chat__info">
          <div className="message-body-chat__name">{ isRecipient ? user.name : `${auth.user.profile.firstName} ${auth.user.profile.lastName}` }</div>
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
  }, [messages])
  

  return (
    <div className="body-chat__message message-body-chat">
      {
        messages.map(message => types[message.type](message))
      }
    </div>
  )
}