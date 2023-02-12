import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import InputPasswordForm from "../Forms/InputPasswordForm"
import Button from "../UI/Button"
import ModalSmallContent from "../UI/Modal/ModalSmallContent"

const InputPasswordModal = ({ handlePasswordInput, vendor }) => {

    const modal = useContext(ModalContext)

    return (
        <ModalSmallContent>
            <div className="small-modal__header">
                <div className="small-modal__icon">
                    <img src="/assets/images/lock.png" alt="" />
                </div>
                <div className="small-modal__title">Input password to change email</div>
            </div>
            <div className="small-modal__body">
                <InputPasswordForm setPassword={handlePasswordInput} vendor={vendor} />
                <Button
                    className="btn btn-light m-t-8 d-block w-100"
                    onClick={modal.destroy}
                >Cancel</Button>
            </div>
        </ModalSmallContent>
    )
}

export default InputPasswordModal