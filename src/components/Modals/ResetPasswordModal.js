import Button from "../UI/Button"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"

const ResetPasswordModal = ({ goBackCallback }) => {

  return (
    <ModalMiddleContent>
      <div className="modal__header">
        <Logo className="modal__logo" />
        <h4>Reset Password</h4>
      </div>
      <div className="modal__content">
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <Button
          className="btn btn-accent"
        >Save New Password</Button>
      </div>
      <div className="modal__footer">
        <p>Not a member yet? <span className="pointer text-accent f-600">Join now</span></p>
      </div>
    </ModalMiddleContent>
  )
}

export default ResetPasswordModal