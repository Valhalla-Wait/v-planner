import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import Button from "../UI/Button"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"

const TextModal = ({ text }) => {

  const modal = useContext(ModalContext)

  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo"/>
      </div>
      <div className="middle-modal__body">
        <p>{ text }</p>
      </div>
      <div className="middle-modal__footer">
        <Button
          className="btn btn-light w-100"
          onClick={() => modal.destroy()}
        >Ok</Button>
      </div>
    </ModalMiddleContent>
  )
}

export default TextModal