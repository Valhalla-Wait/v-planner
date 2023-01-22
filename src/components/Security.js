import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import ChangePasswordModal from "./Modals/ChangePasswordModal"
import DeleteAccountModal from "./Modals/DeleteAccountModal"

export default function Security() {

  const modal = useContext(ModalContext)

  const changePassword = () => {
    modal.start()
    modal.setContent(<ChangePasswordModal />)
  }

  const deleteAccount = () => {
    modal.start()
    modal.setContent(<DeleteAccountModal />)
  }

  return (
    <>
      <h4 data-to="security">Security</h4>
      <div className="account-security m-t-24">
        <div className="account-security__item" onClick={changePassword}>
          <div className="account-security__icon">
            <i className="icon-lock"></i>
          </div>
          <span>Change Password</span>
        </div>
        <div className="account-security__item" onClick={deleteAccount}>
          <div className="account-security__icon">
            <i className="icon-times-circle"></i>
          </div>
          <span>Delete Account</span>
        </div>
      </div>
    </>
  )
}