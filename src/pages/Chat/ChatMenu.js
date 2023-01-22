export default function ChatMenu({ menu }) {
  return (
    <div className="sidebar-chat__menu menu-sibedar-chat">
      <div className="menu-sibedar-chat__list">
        {
          menu.map(item => (
            <div
              className={item.active ? "menu-sibedar-chat__item active" : "menu-sibedar-chat__item"}
              key={item.title}
            >{item.title}</div>
          ))
        }
      </div>
    </div>
  )
}