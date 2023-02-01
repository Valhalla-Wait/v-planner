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
import { ThemeContext } from "../../../context/ThemeContext"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../../Store/Actions/updateUser"

const optionsBudget = [
  { value: "Budget", label: "Budget" },
  { value: "Max Budget", label: "Max Budget" },
  { value: "custom", label: "Your variant" }
]

const optionsState = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "Arkansas", label: "Arkansas" },
  { value: " California", label: " California" },
  { value: "Colorado", label: "Colorado" },
  { value: " Connecticut", label: "Connecticut" },
  { value: "Delaware", label: "Delaware" },
  { value: " Florida", label: " Florida" },
  { value: " Georgia", label: " Georgia" },
  { value: " Hawaii", label: " Hawaii" },
  { value: " Idaho", label: " Idaho" },
  { value: "Illinois", label: "Illinois" },
  { value: " Indiana", label: "Indiana" },
  { value: "  Iowa", label: " Iowa" },
  { value: "  Kansas", label: " Kansas" },
  { value: " Kentucky", label: "Kentucky" },
  { value: "  Louisiana", label: " Louisiana" },
  { value: " Maine", label: "Maine" },
  { value: "   Massachusetts", label: " Massachusetts" },
  { value: "   Michigan", label: " Michigan" },
  { value: "   Mississippi", label: " Mississippi" },
  { value: "   Missouri", label: " Missouri" },
  { value: "  Montana", label: "Montana" },
  { value: "   Nebraska", label: " Nebraska" },
  { value: "   Nevada", label: " Nevada" },
  { value: "   New Hampshire", label: " New Hampshire" },
  { value: "    New Jersey", label: "  New Jersey" },
  { value: "    New Mexico", label: "  New Mexico" },
  { value: "     New York", label: "  New York" },
  { value: "    North Carolina", label: "  North Carolina" },
  { value: "    North Dakota", label: "North Dakota" },
  { value: "    Ohio", label: "   Ohio" },
  { value: "      Oregon", label: "    Oregon" },
  { value: "     Pennsylvania", label: "   Pennsylvania" },
  { value: "      Rhode Island", label: "    Rhode Island" },
  { value: "      South Carolina", label: "    South Carolina" },
  { value: "      South Dakota  ", label: "    South Dakota  " },
  { value: "    Texas ", label: "     Texas " },
  { value: "     Utah", label: "   Utah" },
  { value: "      Vermont", label: "    Vermont" },
  { value: "      Washington", label: "    Washington" },
  { value: "      West Virginia", label: "   West Virginia" },
  { value: "       Wisconsin", label: "    Wisconsin" },
  { value: "      Wyoming", label: " Wyoming" },
];

const UserUpdateWeddingInformation = () => {

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    control
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserUpdateWeddingInformation())
  })

  const [isCustomBudget, setIsCustomBudget] = useState(false)

  const theme = useContext(ThemeContext)
  const dispatch = useDispatch()
  const user = useSelector(state => state.userInfo.userData)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const onSubmit = data => {
    const updatedUserData = {
      engagementDate: data.engagementDate,
      weddingDate: data.weddingDate,
      weddingAddress: data.location.value || data.location,
      amountOfGuests: data.countGuest,
      budget: data.budget.value || data.budget,
      firstName: user.firstName,
      surname: user.surname,
      username: user.username,
      partnerFirstName: user.clientModel.partnerFirstName,
      partnerLastName: user.clientModel.partnerLastName,
      id: user.id,
      phoneNumber: user.phoneNumber,
      city: user.city,
      engagementAddress: user.clientModel.engagementAddress,
      description: user.clientModel.description
    }

    dispatch(updateUser(updatedUserData))
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
              defaultValue={new Date(user.clientModel.engagementDate)}
              render={({ field }) => (
                <DatePicker
                  dateFormat="d MMMM yy"
                  selected={field.value}
                  ref={field.ref}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholderText="Engagement Date"
                  className="input-control"
                />
              )}
            />
            {!isValidField(f.date.engagement) && <FieldError text={getErrorField(f.date.engagement)} />}
          </label>
        </div>
        <div>
          <label className="input-label">
            Wedding Date
            <Controller
              control={control}
              name={f.date.wedding}
              defaultValue={new Date(user.clientModel.weddingDate)}
              render={({ field }) => (
                <DatePicker
                  dateFormat="d MMMM yy"
                  selected={field.value}
                  ref={field.ref}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholderText="Wedding Date"
                  className="input-control"
                />
              )}
            />
            {!isValidField(f.date.wedding) && <FieldError text={getErrorField(f.date.wedding)} />}
          </label>
        </div>
      </div>
      <label className="input-label">
        Wedding Location
        <Controller
          control={control}
          name={f.location.default}
          defaultValue={user.clientModel.weddingAddress}
          render={({ field }) => (
            <Select
              placeholder={user.clientModel.weddingAddress}
              options={optionsState}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.location.default) && <FieldError text={getErrorField(f.location.default)} />}
      </label>
      <Input
        type="text"
        placeholder="Guests Number"
        label="Guests Number"
        defaultValue={user.clientModel.amountOfGuests}
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
              defaultValue={user.clientModel.budget}
              render={({ field }) => (
                <Select
                  placeholder="Budget"
                  options={optionsBudget}
                  isClearable={false}
                  isSearchable={false}
                  {...field}
                  onChange={e => {
                    if (e.value === "custom") {
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
        {!isValidField(f.budget) && <FieldError text={getErrorField(f.budget)} />}
      </label>
      <Button
        className="btn btn-accent m-t-8"
        disabled={!isValid || !isDirty}
      >Save</Button>
    </form>
  )
}

export default UserUpdateWeddingInformation