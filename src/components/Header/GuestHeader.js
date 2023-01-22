import { useContext } from "react"
import { Link } from "react-router-dom"
import { ModalContext } from "../../context/ModalContext"
import useDevice from "../../hooks/useDevice"
import SignInUserModal from "../Modals/SignInUserModal"
import SignUpUserModal from "../Modals/SignUpUserModal"
import Button from "../UI/Button"
import Logo from "../UI/Logo"

const GuestHeader = () => {
 
  const modal = useContext(ModalContext)
  
  const { isMobile } = useDevice()

  const signUpClick = () => {
    modal.start()
    modal.setContent(<SignUpUserModal />)
  }

  const signInClick = () => {
    modal.start()
    modal.setContent(<SignInUserModal />)
  }

  const Actions = () => {
    return (
      <div className="header__actions">
        <div className="header__action">
          <Button
            className="btn btn-accent"
            onClick={signUpClick}
          >
            Sign UP
          </Button>
        </div>
        <div className="header__action">
          <Button
            className="btn btn-light"
            onClick={signInClick}
          >
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <header className={isMobile ? "header header-shadow" : "header"}>
      <div className="container">
        <div className="header__content">
          <Link to="/">
            <Logo alt="Alt logo" />
          </Link>
          {
            !isMobile && Actions()
          }
        </div>
      </div>
    </header>
  )
}

export default GuestHeader