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
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../../Store/Actions/getCurrentUser"

const optionsBudget = [
  { value: "Budget", label: "Budget"},
  { value: "Max Budget", label: "Max Budget"},
  { value: "custom", label: "Your variant"}
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
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserUpdateWeddingInformation())
  })

  const userData = useSelector((state) => state.userInfo.userData);

  const [isCustomBudget, setIsCustomBudget] = useState(false)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    amountOfGuests: userData.clientModel.amountOfGuests,
    budget: userData.clientModel.budget,
    city: userData.city,
    description: userData.clientModel.description,
    engagementAddress: userData.clientModel.engagementAddress,
    engagementDate: userData.clientModel.engagementDate,
    firstName: userData.firstName,
    id: userData.id,
    partnerFirstName: userData.clientModel.partnerFirstName,
    partnerLastName: userData.clientModel.partnerLastName,
    phoneNumber: userData.phoneNumber,
    surname: userData.surname,
    username: userData.username,
    weddingAddress: userData.clientModel.weddingAddress,
    weddingDate: userData.clientModel.weddingDate,
  })

  console.log(formData)

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

    console.log(data)

    const reqBody = new FormData()

    const json = JSON.stringify({
      ...formData,
      firstName: data.firstName,
      partnerFirstName: data.partnersFirstName,
      partnerLastName: data.partnersLastName,
      surname: data.lastName,
      username: data.nickname,
    })

    const blob = new Blob([json], {
      type: "application/json",
    })

    // reqBody.append('updateClientModel', blob)
    // if(data.avatar[0]) reqBody.append('avatar', data.avatar[0])

    // axios({
    //   method: "put",
    //   url: `${process.env.REACT_APP_API_URL}/clients/update`,
    //   data: reqBody,
    //   headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }).then((res) => {
    //   dispatch(getCurrentUser(localStorage.getItem("token")))
    // })
    //   .catch((err) => {
    //     console.log(err)
    //   })

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
              defaultValue={new Date(userData.clientModel.engagementDate)}
              render={({ field }) => (
                <DatePicker
                  dateFormat="d MMMM yy"
                  {...field}
                  placeholderText="Engagement Date"
                  className="input-control"
                  selected={field.value}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
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
              defaultValue={new Date(userData.clientModel.weddingDate)}
              render={({ field }) => (
                <DatePicker
                dateFormat="d MMMM yy"
                {...field}
                placeholderText="Engagement Date"
                className="input-control"
                selected={field.value}
              ref={field.ref}
              onChange={field.onChange}
              onBlur={field.onBlur}
                readonly={true}
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
          defaultValue={optionsState.find(state => state.value == userData.clientModel.weddingAddress)}
          render={({ field }) => (
            <Select
              placeholder="State"
              options={optionsState}
              isClearable={false}
                isSearchable={false}
                {...field}
                onChange={(e) => {
                  if (e.value === "custom") {
                    setIsCustomBudget(true);
                    return;
                  }
                  field.onChange(e);
                }}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.location.default) && <FieldError text={getErrorField(f.location.default)} /> }
      </label>
      {/* <Input
        type="text"
        placeholder="Guests Number"
        label="Guests Number"
        defaultValue={userData.clientModel.amountOfGuests}
        register={register(f.count.guest)}
        error={getErrorField(f.count.guest)}
        isValid={isValidField(f.count.guest)}
      /> */}
      {/* <label className="input-label">
        Budget, $
        {
          isCustomBudget
            ? <Input
                type="text"
                placeholder="Budget"
                defaultValue={userData.clientModel.budget}
                register={register(f.customBudget)}
                error={getErrorField(f.customBudget)}
                isValid={isValidField(f.customBudget)}
              />
            : <Controller
                control={control}
                name={f.budget}
                defaultValue={optionsBudget}
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
      </label> */}
      <Button
        className="btn btn-accent m-t-8"
        disabled={!isValid}
      >Save</Button>
    </form>
  )
}

export default UserUpdateWeddingInformation