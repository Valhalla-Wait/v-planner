import { useContext } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { ModalContext } from "../../context/ModalContext"
import { logout } from "../../Store/Reducers/UserReducer"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const LogoutModal = () => {

  const modal = useContext(ModalContext)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
            localStorage.removeItem('token')
            dispatch(logout())
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