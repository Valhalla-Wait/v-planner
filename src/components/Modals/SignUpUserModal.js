import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import UserSignUpForm from "../Forms/User/UserSignUpForm"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"
import SignInUserModal from "./SignInUserModal"
import SignUpVendorModal from "./SignUpVendorModal"

const SignUpUserModal = () => {

  const modal = useContext(ModalContext)

  const signUpVendor = () => modal.setContent(<SignUpVendorModal />)
  const signInUser = () => modal.setContent(<SignInUserModal />)

  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo"/>
        <h4 className="middle-modal__title">User Signup</h4>
        <div className="middle-modal__subtitle middle-modal__link" onClick={signUpVendor}>Vendor SignUp</div>
      </div>
      <div className="middle-modal__body">
        <UserSignUpForm />
      </div>
      <div className="middle-modal__footer">
        <div>Already a member? <span className="middle-modal__link" onClick={signInUser}>Sign In</span></div>
      </div>
    </ModalMiddleContent>
  )
}

export default SignUpUserModal