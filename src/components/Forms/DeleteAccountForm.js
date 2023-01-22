import { useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TextModal from "../Modals/TextModal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { schemaDeleteAccount } from "../../validation/schemas"
import f from "../../validation/fieldName"
import { ModalContext } from "../../context/ModalContext"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const DeleteAccountForm = () => {

  const modal = useContext(ModalContext)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaDeleteAccount())
  })

  const onSubmit = data => {
    modal.start()
    modal.setContent(<TextModal text="Your account has been deleted. Come back to us" />)
    auth.logout()
    navigate("/")
  }

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="password"
        placeholder="Password"
        register={register(f.password)}
        error={getErrorField(f.password)}
        isValid={isValidField(f.password)}
      />
      <Button
        className="btn btn-accent d-block w-100"
        disabled={!isValid}
      >
        Delete Account
      </Button>
    </form>
  )
}

export default DeleteAccountForm