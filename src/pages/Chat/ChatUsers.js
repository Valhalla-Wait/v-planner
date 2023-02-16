import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/UI/Loader/Loader"
import { getMessages } from "../../Store/Actions/getAllMessages"
import { sendMessage } from "../../utils/webSocketChat"

export default function ChatUsers({ onCallback }) {
  // console.log('USERS IN CHAT', chats)
  const navigate = useNavigate()

  const users = useSelector(state => state.chat.chats)
  const loading = useSelector(state => state.chat.loading)

  console.log('USERS IN CHAT', users)

  return (
    <div className="user-sidebar-chat__list">
      {(!loading && users.length === 0) && <div className="err-chat-msg">Chats not found</div>}
      {
        loading ? 
        <Loader />
        :
        users.map(user => (
          <div className="user-sidebar-chat__item" key={user.id} onClick={() => {
            navigate(`/chat/${user.id}`)
            onCallback(user.id)
            }}>
            <div className="user-sidebar-chat__avatar">
              <img src={user.avatar} alt="Avatar" />
            </div>
            <div className="user-sidebar-chat__info">
              <div className="user-sidebar-chat__name">{user.firstName} {user.surname}</div>
              <div className="user-sidebar-chat__text">{user.lastMessage.type === 'text' ? user.lastMessage.message : "File"}</div>
            </div>
            <div className="user-sidebar-chat__labels">
              <div className="user-sidebar-chat__time">{user.lastMessage.time}</div>
              {!!user.newMessages && <div className="user-sidebar-chat__label">{user.newMessages}</div>}
            </div>
          </div>
        ))
      }
    </div>
  )
}