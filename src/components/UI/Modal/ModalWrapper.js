import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

const ModalWrapper = () => {

  const modal = useContext(ModalContext)

  return (
    <div className={modal.isActive ? "modal active" : "modal"}>
      <div className="modal__wrapper">
        { modal.content }
      </div>
    </div>
  )
}


export default ModalWrapper