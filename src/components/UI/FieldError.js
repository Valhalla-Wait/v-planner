export const FieldError = ({ text }) => {
  return (
    text && <div className="field-error">{ text }</div>
  )
}