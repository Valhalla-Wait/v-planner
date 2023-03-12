import { useContext } from "react"
import { useSelector } from "react-redux"
import { ModalContext } from "../../context/ModalContext"
import UserSignInForm from "../Forms/User/UserSignInForm"
import Loader from "../UI/Loader/Loader"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"
import RequestResetPasswordModal from "./RequestResetPasswordModal"
import SignInVendorModal from "./SignInVendorModal"
import SignUpUserModal from "./SignUpUserModal"

const SignInUserModal = () => {

  const modal = useContext(ModalContext)

  const signInVendor = () => modal.setContent(<SignInVendorModal />)
  const signUpUser = () => modal.setContent(<SignUpUserModal />)
  const requestResetPassword = () => modal.setContent(<RequestResetPasswordModal goBackCallback={() => modal.setContent(<SignInUserModal />)} />)

  const loading = useSelector(state => state.userInfo.loading)
// debugger
  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo" />
        <h4 className="middle-modal__title">Sign In</h4>
        <div className="middle-modal__subtitle middle-modal__link" onClick={signInVendor}>Vendor Sign in</div>
      </div>
      {loading ?
        <Loader />
        :
        <>
          <div className="middle-modal__body">
            <UserSignInForm />
          </div>
          <div className="middle-modal__footer">
            <p className="middle-modal__link" onClick={requestResetPassword}>Forgot Password?</p>
            <div>Not a member yet? <span className="middle-modal__link" onClick={signUpUser}>Join now</span></div>
          </div>
        </>
      }
    </ModalMiddleContent>
  )
}

export default SignInUserModal