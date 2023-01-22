import f from "../../../validation/fieldName"
import Input from "../../UI/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorServiceDetails } from "../../../validation/schemas"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const ServiceForm = ({callback, id}) => {
    const {
    //   register,
      formState: { errors, isValid },
    //   handleSubmit,
    //   control,
    } = useForm({
      mode: "all",
      resolver: yupResolver(schemaVendorServiceDetails()),
    });
    const isValidField = field => !errors[field]
    const getErrorField = field => errors[field]?.message
  
    console.log("ID", id)

    const [inputData, setInputData] = useState(null)

    return (
        <Input
          type="text"
          placeholder="title"
          label="Service title"

          onChange={(e) => setInputData({
            id: id,
            title: e.currentTarget.value,
            price: 0
          })}

          onBlur={() => {
            callback(inputData)
            }}

          error={getErrorField(f.amount)}
          isValid={isValidField(f.amount)}
        />
    )
  }