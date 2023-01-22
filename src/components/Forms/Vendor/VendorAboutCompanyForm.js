import { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import Textarea from "../../UI/Textarea"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorAboutCompany } from "../../../validation/schemas"
import { allowerImageType, allowerVideoType } from "../../../utils/allowedFileTypes"
import f from "../../../validation/fieldName"
import { FieldError } from "../../UI/FieldError"

const VendorAboutCompanyForm = ({ onCallback, onBack }) => {

  const [src, setSrc] = useState(null)
  const [srcType, setSrcType] = useState(null)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorAboutCompany())
  })

  const addPhoto = (e) => {
    if(e.target.files && e.target.files.length){
      setSrcType(e.target.files[0].type)
      const reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0]);
      return
    }
    setSrc(null)
    setSrcType(null)
  }
console.log("data in form ",f)
  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message
 
  return (
    <form onSubmit={handleSubmit(onCallback)}>
      <label className="file-upload">
        { src && srcType && (srcType.indexOf("image") === 0) && <img className="file-upload__file" src={src} alt="" /> }
        { src && srcType && (srcType.indexOf("video") === 0) && <video className="file-upload__file" src={src} autoPlay loop></video> }
        { !src && (
            <>
              <div className="file-upload__icon">
                <i className="icon-photo-add"></i>
              </div>
              <div className="file-upload__title">Upload Cover Photo or Video</div>
            </>
          )
        }
        <Input
          type="file"
          className="photo-add__input"
          accept={[...allowerImageType, ...allowerVideoType]}
          register={register(f.file.default)}
          onInput={addPhoto}
        />
      </label>
      { !isValidField(f.file.default) &&  <FieldError text={getErrorField(f.file.default)} /> }
      <Input
        type="text"
        placeholder="Company Title"
        label="Company Title"
        register={register(f.title)}
        error={getErrorField(f.title)}
        isValid={isValidField(f.title)}
      />
      <Textarea
        type="text"
        placeholder="Company Description"
        label="Company Description"
        rows={3}
        register={register(f.description)}
        error={getErrorField(f.description)}
        isValid={isValidField(f.description)}
      />
      <Textarea
        type="text"
        placeholder="About Company"
        label="About Company"
        rows={5}
        register={register(f.about.company)}
        error={getErrorField(f.about.company)}
        isValid={isValidField(f.about.company)}
      />
      <Textarea
        type="text"
        placeholder="About Team"
        label="About Team"
        rows={5}
        register={register(f.about.team)}
        error={getErrorField(f.about.team)}
        isValid={isValidField(f.about.team)}
      />
      <div className="input-row">
        <div
          className="btn btn-accent btn-circle m-t-24"
          onClick={onBack}
        >
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
        >Next</Button>
      </div>
    </form>
  )
}

export default VendorAboutCompanyForm