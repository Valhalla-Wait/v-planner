import { useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TextModal from "../Modals/TextModal"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { schemaEmailSubscribe } from "../../validation/schemas"
import f from "../../validation/fieldName"
import { ModalContext } from "../../context/ModalContext"

const EmailSubscribeForm = () => {

  const modal = useContext(ModalContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schemaEmailSubscribe())
  })

  const subscribe = data => {
    modal.start()
    modal.setContent(<TextModal text="Congratulations. Subscribed successfully" />)
    reset()
  }

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message


  return (
    <form className="subscribe" onSubmit={handleSubmit(subscribe)}>
      <Input
        type="text"
        placeholder="Email"
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
        className="subscribe__input"
      />
      <Button
        className="btn btn-subscribe"
      >
        <span>Subscribe</span>
      </Button>
    </form>
  )
}

export default EmailSubscribeForm