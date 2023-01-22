import DatePicker from "react-datepicker"
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldError } from "../../UI/FieldError"
import f from "../../../validation/fieldName"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import Input from "../../UI/Input"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import Button from "../../UI/Button"
import { schemaUserUpdateWeddingInformation } from "../../../validation/schemas"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { ThemeContext } from "../../../context/ThemeContext"

const optionsBudget = [
  { value: "Budget", label: "Budget"},
  { value: "Max Budget", label: "Max Budget"},
  { value: "custom", label: "Your variant"}
]

const optionsState = [
  { value: 'kiev', label: 'Kiev' },
  { value: 'new-yourk', label: 'New York' }
]

const UserUpdateWeddingInformation = () => {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserUpdateWeddingInformation())
  })

  const [isCustomBudget, setIsCustomBudget] = useState(false)

  const auth = useContext(AuthContext)
  const theme = useContext(ThemeContext)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const onSubmit = data => {
    auth.setUser({
      ...auth.user,
      wedding: {
        ...auth.user.wedding,
        ...data,
        budget: data.budget.value,
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="wedding_information">
      <h4>Wedding Information</h4>
      <div className="input-row m-t-24">
        <div>
          <label className="input-label">
            Engagement Date
            <Controller
              control={control}
              name={f.date.engagement}
              defaultValue={new Date(auth.user.wedding.engagementDate)}
              render={({ field }) => (
                <DatePicker
                  dateFormat="d MMMM yy"
                  {...field}
                  placeholderText="Engagement Date"
                  className="input-control"
                  readonly={true}
                />
              )}
            />
            { !isValidField(f.date.engagement) &&  <FieldError text={getErrorField(f.date.engagement)} /> }
          </label>
        </div>
        <div>
          <label className="input-label">
            Wedding Date
            <Controller
              control={control}
              name={f.date.wedding}
              defaultValue={new Date(auth.user.wedding.weddingDate)}
              render={({ field }) => (
                <DatePicker
                  dateFormat="d MMMM yy"
                  {...field}
                  placeholderText="Wedding Date"
                  className="input-control"
                  />
              )}
            />
            { !isValidField(f.date.wedding) &&  <FieldError text={getErrorField(f.date.wedding)} /> }
          </label>
        </div>
      </div>
      <label className="input-label">
        Wedding Location
        <Controller
          control={control}
          name={f.location.default}
          defaultValue={optionsState.filter(o => o.value === auth.user.wedding.location)[0]}
          render={({ field }) => (
            <Select
              placeholder="State"
              options={optionsState}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.location.default) && <FieldError text={getErrorField(f.location.default)} /> }
      </label>
      <Input
        type="text"
        placeholder="Guests Number"
        label="Guests Number"
        defaultValue={auth.user.wedding.countGuest}
        register={register(f.count.guest)}
        error={getErrorField(f.count.guest)}
        isValid={isValidField(f.count.guest)}
      />
      <label className="input-label">
        Budget, $
        {
          isCustomBudget
            ? <Input
                type="text"
                placeholder="Budget"
                register={register(f.customBudget)}
                error={getErrorField(f.customBudget)}
                isValid={isValidField(f.customBudget)}
              />
            : <Controller
                control={control}
                name={f.budget}
                defaultValue={optionsBudget.filter(o => o.value === auth.user.wedding.budget)[0]}
                render={({ field }) => (
                  <Select
                    placeholder="Budget"
                    options={optionsBudget}
                    isClearable={false}
                    isSearchable={false}
                    {...field}
                    onChange={e => {
                      if(e.value === "custom"){
                        setIsCustomBudget(true)
                        return
                      }
                      field.onChange(e)
                    }}
                    {...customReactSelectOptions(theme.get())}
                  />
                )}
              />
        }
        { !isValidField(f.budget) && <FieldError text={getErrorField(f.budget)} /> }
      </label>
      <Button
        className="btn btn-accent m-t-8"
        disabled={!isValid}
      >Save</Button>
    </form>
  )
}

export default UserUpdateWeddingInformation