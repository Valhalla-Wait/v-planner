import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

const ModalCompareContent = ({ children }) => {

  const modal = useContext(ModalContext)

  return (
    <div className="compare-modal__content">
      <div className="modal__close" onClick={() => modal.destroy()}>
        <i className="icon-times"></i>
      </div>
      { children }
    </div>
  )
}

export default ModalCompareContent