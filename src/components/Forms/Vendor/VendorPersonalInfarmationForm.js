import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import "react-phone-input-2/lib/style.css"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorPersonalInformation } from "../../../validation/schemas"
import f from "../../../validation/fieldName"
import { allowerImageType } from "../../../utils/allowedFileTypes"
import { FieldError } from "../../UI/FieldError"

const VendorPersonalInfarmationForm = ({ onCallback }) => {
  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorPersonalInformation())
  })

  const [src, setSrc] = useState(null)

  const addPhoto = (e) => {
    if(e.target.files && e.target.files.length){
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result)
      }
      console.log(e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
    }
    setSrc(null)
  }

  console.log(src)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const testFunc = (e) => {
    // debugger
    console.log(e)
  }

  return (
    <form onSubmit={handleSubmit(testFunc)}>
      <div className="photo-add">
        <label className="photo-add__label">
          <div className="photo-add__header">
            {
              src ? <img className="photo-add__photo" src={src} alt="" /> : <i className="icon-camera"></i>
            }
          </div>
          <div className="photo-add__title">Add Photo</div>
          <Input
            type="file"
            className="photo-add__input"
            accept={allowerImageType}
            register={register(f.budget)}
            onInput={addPhoto}
          />
        </label>
      </div>
      { !isValidField(f.avatar) &&  <FieldError text={getErrorField(f.avatar)} /> }
      <div className="input-row">
        <div>
          <Input
            type="text"
            placeholder="First Name"
            label="First Name"
            register={register(f.firstName)}
            error={getErrorField(f.firstName)}
            isValid={isValidField(f.firstName)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Last Name"
            label="Last Name"
            register={register(f.lastName)}
            error={getErrorField(f.lastName)}
            isValid={isValidField(f.lastName)}
          />
        </div>
      </div>
      <Input
        type="email"
        placeholder="Email"
        label="Email"
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <label className="input-label">
        Phone Number
        <Controller
          control={control}
          name={f.phone}
          defaultValue=""
          render={({ field }) => (
            <PhoneInput
              className="input-control"
              country={'us'}
              {...field}
            />)
          }
        />
        { !isValidField(f.phone) &&  <FieldError text={getErrorField(f.phone)} /> }
      </label>
      <Button
        className="btn btn-accent w-100 m-t-8"
        disabled={!isValid}
      >Next</Button>
    </form>
  )
}

export default VendorPersonalInfarmationForm