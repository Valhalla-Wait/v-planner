import Input from "../../UI/Input"

export const ServiceForm = ({ title, register, index, isValidField, getErrorField, remove }) => {

  const handleRemove = () => {
    remove(index)
  }

  return (
    <div className="input-service-wrapper">
      <Input
        type="text"
        placeholder="title"
        label="Service title"
        defaultValue={title}
        register={register(`serviceModels[${index}].name`)}
        error={getErrorField(`serviceModels[${index}].name`)}
        isValid={isValidField(`serviceModels[${index}].name`)}
      />
      <div className="delete-service-icon" onClick={handleRemove}>
        <i className="icon-trash-outline"></i>
      </div>
    </div>
  )
}