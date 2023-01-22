import { useNavigate } from "react-router-dom"

export default function ChatUsers({ users }) {
  console.log('USERS IN CHAT', users)
  const navigate = useNavigate()

  return (
    <div className="user-sidebar-chat__list">
      {
        users.map(user => (
          <div className="user-sidebar-chat__item" key={user.id} onClick={() => navigate(`/chat/${user.id}`)}>
            <div className="user-sidebar-chat__avatar">
              <img src={user.avatar} alt="Avatar" />
            </div>
            <div className="user-sidebar-chat__info">
              <div className="user-sidebar-chat__name">{user.firstName} {user.surname}</div>
              <div className="user-sidebar-chat__text">{user.type === "text" ? user.lastMessage.message : "File"}</div>
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