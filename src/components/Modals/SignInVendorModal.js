import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import VendorSignInForm from "../Forms/Vendor/VendorSignInForm"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"
import RequestResetPasswordModal from "./RequestResetPasswordModal"
import SignInUserModal from "./SignInUserModal"
import SignUpVendorModal from "./SignUpVendorModal"

const SignInVendorModal = () => {

  const modal = useContext(ModalContext)

  const signInUser = () => modal.setContent(<SignInUserModal />)
  const signUpVendor = () => modal.setContent(<SignUpVendorModal />)
  const requestResetPassword = () => modal.setContent(<RequestResetPasswordModal goBackCallback={() => modal.setContent(<SignInVendorModal />)} />)

  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo"/>
        <h4 className="middle-modal__title">Sign In</h4>
        <div className="middle-modal__subtitle middle-modal__link" onClick={signInUser}>User Sign in</div>
      </div>
      <div className="middle-modal__body">
        <VendorSignInForm />
      </div>
      <div className="middle-modal__footer">
        <p className="middle-modal__link" onClick={requestResetPassword}>Forgot Password?</p>
        <div>Not a member yet? <span className="middle-modal__link" onClick={signUpVendor}>Join now</span></div>
      </div>
    </ModalMiddleContent>
  )
}

export default SignInVendorModal