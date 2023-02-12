import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import { FieldError } from "../../UI/FieldError"
import Select from "react-select"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import f from "../../../validation/fieldName"
import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"
import { useDispatch, useSelector } from "react-redux"
import { updateVendor } from "../../../Store/Actions/updateUser"
import { ModalContext } from "../../../context/ModalContext"
import TextModal from "../../Modals/TextModal"
import VendorInputService from "../../VendorInputService"

const optionsTypes1 = [
  { value: 'Day After Session', label: 'Day After Session' },
  { value: 'Engagement', label: 'Engagement' }
]

const optionsTypes2 = [
  { value: "Digital Files", label: "Digital Files" },
  { value: "Drone", label: "Drone" },
  { value: "Film Photography", label: "Film Photography" },
  { value: "Online Proofing", label: "Online Proofing" },
  { value: "Photo", label: "Photo" },
  { value: "Printed Enlargements", label: "Printed Enlargements" },
  { value: "Printed Proofs", label: "Printed Proofs" },
  { value: "Same-Day Edits", label: "Same-Day Edits" },
  { value: "Second Shooter Available", label: "Second Shooter Available" },
  { value: "Social Media Sharing", label: "Social Media Sharing" },
  { value: "SWedding Albums", label: "Wedding Albums" },
]

const optionsTypes3 = [
  { value: "Artistic", label: "Artistic" },
  { value: "Classic", label: "Classic" },
]

const optionsPriceRange = [
  {
    value: {
      priceFrom: 0,
      priceTo: 999
    }, label: "$0-$999"
  },
  {
    value: {
      priceFrom: 1000,
      priceTo: 1999
    }, label: "$1,000-$1,999"
  },
  {
    value: {
      priceFrom: 2000,
      priceTo: 2999
    }, label: "$2,000-$2,999"
  },
  {
    value: {
      priceFrom: 3000,
      priceTo: 3999
    }, label: "$3,000-$4,999"
  },
  { value: "$5,000+", label: "$5,000+" }
]

const optionsActivities = [
  { value: "Getting Engaged", label: "Getting Engaged" }
]

const VendorUpdateServiceDetailsForm = () => {

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    register,
    control,
    setValue
  } = useForm({
    mode: "all",
    defaultValues: {
      serviceModels: [{ id: 0, name: "", price: 0 }]
    }
  })

  const user = useSelector(state => state.userInfo.userData)
  const theme = useContext(ThemeContext)
  const modal = useContext(ModalContext)
  const dispatch = useDispatch()

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const onSubmit = data => {
    const updatedVendorFields = {
      serviceModels: data.serviceModels.map(s => ({
        name: s.name,
        price: s.price
      })),
      serviceType: data.types_1?.map(el => el.value).join(", "),
      photoStyle: data.types_3?.map(el => el.value).join(", "),
      priceFrom: data.priceRange.value?.priceFrom,
      priceTo: data.priceRange.value?.priceTo,
      weddingActivity: data.activities.value
    }
    dispatch(updateVendor(updatedVendorFields))
      .then(() => {
        modal.start()
        modal.setContent(<TextModal text="Changes have been saved" />)
      })
      .catch((err) => {
        console.log(err)
        modal.start()
        modal.setContent(<TextModal text={err.message} />)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="service_details">
      <h4>Service Details</h4>
      <div className="m-t-24">
        <VendorInputService register={register} control={control} setValue={setValue} isValidField={isValidField} getErrorField={getErrorField} />
        {!isValidField(f.serviceModels) && <FieldError text={getErrorField(f.serviceModels)} />}
        <label className="input-label">
          Type of services
          <Controller
            control={control}
            name={f.photo.types_1}
            defaultValue={optionsTypes1.filter(o => user.vendorModel.serviceType)}
            render={({ field }) => (
              <Select
                closeMenuOnSelect={false}
                placeholder="Type of services"
                options={optionsTypes1}
                isClearable={false}
                isMulti
                {...field}
                {...customReactSelectOptions(theme.get())}
              />
            )}
          />
          {!isValidField(f.photo.types_1) && <FieldError text={getErrorField(f.photo.types_1)} />}
        </label>

        <label className="input-label">
          Photo & Video Styles
          <Controller
            control={control}
            name={f.photo.types_3}
            defaultValue={optionsTypes3.filter(o => user.vendorModel.photoStyle.includes(o.value))}
            render={({ field }) => (
              <Select
                placeholder="Photo & Video Styles"
                options={optionsTypes3}
                isClearable={false}
                isMulti
                closeMenuOnSelect={false}
                {...field}
                {...customReactSelectOptions(theme.get())}
              />
            )}
          />
          {!isValidField(f.photo.types_3) && <FieldError text={getErrorField(f.photo.types_3)} />}
        </label>

        <label className="input-label">
          Starting Price Range
          <Controller
            control={control}
            name={f.priceRange}
            defaultValue={optionsPriceRange.find((o) => o.value.priceFrom === user.vendorModel.priceFrom)}
            render={({ field }) => (
              <Select
                placeholder="Starting Price Range"
                options={optionsPriceRange}
                isClearable={false}
                isSearchable={false}
                {...field}
                {...customReactSelectOptions(theme.get())}
              />
            )}
          />
          {!isValidField(f.priceRange) && <FieldError text={getErrorField(f.priceRange)} />}
        </label>

        <label className="input-label">
          Wedding Activities
          <Controller
            control={control}
            name={f.activities}
            defaultValue={optionsActivities.find(o => o.value === user.vendorModel.weddingActivity)}
            render={({ field }) => (
              <Select
                placeholder="Wedding Activities"
                options={optionsActivities}
                isClearable={false}
                isSearchable={false}
                {...field}
                {...customReactSelectOptions(theme.get())}
              />
            )}
          />
          {!isValidField(f.activities) && <FieldError text={getErrorField(f.activities)} />}
        </label>
      </div>
      <Button
        className="btn btn-accent m-t-24"
        disabled={!isValid}
      >Save</Button>
    </form>
  )
}

export default VendorUpdateServiceDetailsForm