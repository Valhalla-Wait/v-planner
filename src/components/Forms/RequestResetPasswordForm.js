import { useContext } from "react"
import { useForm } from "react-hook-form"
import f from "../../validation/fieldName"
import TextModal from "../Modals/TextModal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaRequestResetPassword } from "../../validation/schemas"
import { ModalContext } from "../../context/ModalContext"


const RequestResetPasswordForm = () => {

  const modal = useContext(ModalContext)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaRequestResetPassword())
  })

  const resetPassword = data => {
    modal.setContent(<TextModal text="To change your password, you need to follow the link that we sent you by e-mail" />)
  }

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message
  
  return (
    <form onSubmit={handleSubmit(resetPassword)}>
      <Input
        type="email"
        placeholder="Email"
        className="m-t-24"
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <Button
        className="btn btn-accent m-t-24 d-block w-100"
        disabled={!isValid}
      >Reset Password</Button>
    </form>
  )
}

export default RequestResetPasswordForm