import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { ModalContext } from "../../context/ModalContext"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const LogoutModal = () => {

  const modal = useContext(ModalContext)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <ModalSmallContent>
      <div className="small-modal__header">
        <div className="small-modal__icon">
          <img src="/assets/images/door.png" alt="" />
        </div>
        <div className="small-modal__title">Log out</div>
      </div>
      <div className="small-modal__body">
        <Button
          className="btn btn-accent d-block w-100"
          onClick={() => {
            auth.logout()
            modal.destroy()
            navigate("/")
          }}
        >Log Out</Button>
        <Button
          className="btn btn-light m-t-8 d-block w-100"
          onClick={modal.destroy}
        >Cancel</Button>
      </div>
    </ModalSmallContent>
  )
}

export default LogoutModal