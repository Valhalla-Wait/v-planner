import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

const ModalMiddleContent = ({ children }) => {

  const modal = useContext(ModalContext)

  return (
    <div className="middle-modal__content">
      <div className="modal__close" onClick={() => modal.destroy()}>
        <i className="icon-times"></i>
      </div>
      { children }
    </div>
  )
}

export default ModalMiddleContent