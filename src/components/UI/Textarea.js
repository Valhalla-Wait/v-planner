import { FieldError } from "./FieldError"

const Textarea = ({ error, isValid, className = "", register = {}, label, ...props}) => {

  const classes = isValid ? `textarea-control ${className}` : `textarea-control ${className} no-valid`

  const textareaTemp = () => {
    return (
      <>
        <textarea {...props} {...register} className={classes} ></textarea>
        { error && <FieldError text={error} />}
      </>
    )
  }

  if(label) {
    return (
      <label className="textarea-label">
        { label }
        { textareaTemp() }
      </label>
    )
  }

  return textareaTemp()
}

export default Textarea