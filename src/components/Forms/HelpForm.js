import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import f from "../../validation/fieldName"
import { schemaHelp } from "../../validation/schemas"
import Input from "../UI/Input"
import Textarea from "../UI/Textarea"
import Button from "../UI/Button"
import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"
import TextModal from "../Modals/TextModal"

const HelpForm = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaHelp())
  })

  const modal = useContext(ModalContext)

  const onSubmit = data => {
    console.log(data)
    modal.start()
    modal.setContent(<TextModal text="We are already reading your letter. We promise you an answer soon. Please wait" />)
    reset()
  }
  
  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-row">
        <div>
          <Input
            type="text"
            placeholder="First Name"
            register={register(f.firstName)}
            error={getErrorField(f.firstName)}
            isValid={isValidField(f.firstName)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Last Name"
            register={register(f.lastName)}
            error={getErrorField(f.lastName)}
            isValid={isValidField(f.lastName)}
          />
        </div>
      </div>
      <Input
        type="email"
        placeholder="Email"
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <Textarea
        type="text"
        placeholder="Message"
        rows={5}
        register={register(f.message)}
        error={getErrorField(f.message)}
        isValid={isValidField(f.message)}
      />
      <Button
        className="btn btn-accent"
      >Send</Button>
    </form>
  )
}

export default HelpForm