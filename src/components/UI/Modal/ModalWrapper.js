import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

const ModalWrapper = () => {

  const modal = useContext(ModalContext)

  const closeModal = (e) => {
    if (e.currentTarget !== e.target) return;
    modal.destroy()
  }

  return (
    <div className={modal.isActive ? "modal active" : "modal"}>
      <div className="modal__wrapper" onClick={closeModal}>
        {modal.content}
      </div>
    </div>
  )
}


export default ModalWrapper