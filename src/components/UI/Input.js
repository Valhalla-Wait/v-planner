import { FieldError } from "./FieldError"

const Input = ({ error, isValid, className = "", register = {}, label, ...props}) => {

  const classes = isValid ? `input-control ${className}` : `input-control ${className} no-valid`

  const inputTemp = () => {
    return (
      <>
        <input {...register} {...props} className={classes} />
        { error && <FieldError text={error} />}
      </>
    )
  }

  if(label) {
    return (
      <label className="input-label">
        { label }
        { inputTemp() }
      </label>
    )
  }

  return inputTemp()
}

export default Input