import { useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { schemaInputPassword } from "../../validation/schemas"
import f from "../../validation/fieldName"
import { ModalContext } from "../../context/ModalContext"
import { useSelector } from "react-redux"

const InputPasswordForm = ({ setPassword, vendor }) => {

    const modal = useContext(ModalContext)

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "all",
        resolver: yupResolver(schemaInputPassword())
    })

    const email = useSelector(state => state.userInfo.userData.email)

    const onSubmit = data => {
        setPassword(data.password, vendor)
        reset()
        modal.destroy()
    }

    const isValidField = field => !errors[field]
    const getErrorField = field => errors[field]?.message

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="password"
                placeholder="password"
                register={register(f.password)}
                error={getErrorField(f.password)}
                isValid={isValidField(f.password)}
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

export default InputPasswordForm