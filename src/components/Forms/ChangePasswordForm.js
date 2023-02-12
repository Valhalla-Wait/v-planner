import { useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TextModal from "../Modals/TextModal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { schemaChangePassword } from "../../validation/schemas"
import f from "../../validation/fieldName"
import { ModalContext } from "../../context/ModalContext"
import { useSelector } from "react-redux"

import AuthService from "../../services/AuthService"
import VendorService from "../../services/VendorService"

const ChangePasswordForm = () => {

  const modal = useContext(ModalContext)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaChangePassword())
  })

  const email = useSelector(state => state.userInfo.userData.email)

  const onSubmit = data => {
    AuthService.login(email, data.oldPassword)
      .then(() => {
        VendorService.changeCredentials(email, data.password)
          .then(() => {
            modal.start()
            modal.setContent(<TextModal text="Your password has been successfully changed" />)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch((err) => {
        console.log(err)
        modal.start()
        modal.setContent(<TextModal text={err.message} />)
      })
  }

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="password"
        placeholder="Old Password"
        register={register(f.oldPassword)}
        error={getErrorField(f.oldPassword)}
        isValid={isValidField(f.oldPassword)}
      />
      <Input
        type="password"
        placeholder="New Password"
        register={register(f.password)}
        error={getErrorField(f.password)}
        isValid={isValidField(f.password)}
      />
      <Input
        type="password"
        placeholder="Confirm New Password"
        register={register(f.confirmPassword)}
        error={getErrorField(f.confirmPassword)}
        isValid={isValidField(f.confirmPassword)}
      />
      <Button
        className="btn btn-accent d-block w-100"
        disabled={!isValid}
      >
        Change Password
      </Button>
    </form>
  )
}

export default ChangePasswordForm