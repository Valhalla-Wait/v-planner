import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const UnlikeModal = ({ onCallback }) => {

  const modal = useContext(ModalContext)

  return (
    <ModalSmallContent>
      <div className="small-modal__header">
        <div className="small-modal__icon">
          <img src="/assets/images/unlike.png" alt="" />
        </div>
        <div className="small-modal__title">Unlike Vendor</div>
        <div className="small-modal__subtitle">Vendor will disappear from your list of vendors</div>
      </div>
      <div className="small-modal__body">
        <Button
          className="btn btn-accent m-t-8 d-block w-100"
          onClick={() => {
            onCallback()
            modal.destroy()
          }}
        >Unlike Vendor</Button>
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={modal.destroy}
        >Cancel</Button>
      </div>
    </ModalSmallContent>
  )
}

export default UnlikeModal