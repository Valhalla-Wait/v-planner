import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import { FieldError } from "../../UI/FieldError"
import Select from "react-select"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import f from "../../../validation/fieldName"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { ThemeContext } from "../../../context/ThemeContext"


const optionsTypes = [
  { value: 'Day After Session', label: 'Day After Session' },
  { value: 'Engagement', label: 'Engagement' }
]

const optionsTypes1 = [
  { value: 'Day After Session', label: 'Day After Session' },
  { value: 'Engagement', label: 'Engagement' }
]

const optionsTypes2 = [
  { value: "Digital Files", label: "Digital Files"},
  { value: "Drone", label: "Drone"},
  { value: "Film Photography", label: "Film Photography"},
  { value: "Online Proofing", label: "Online Proofing"},
  { value: "Photo", label: "Photo"},
  { value: "Printed Enlargements", label: "Printed Enlargements"},
  { value: "Printed Proofs", label: "Printed Proofs"},
  { value: "Same-Day Edits", label: "Same-Day Edits"},
  { value: "Second Shooter Available", label: "Second Shooter Available"},
  { value: "Social Media Sharing", label: "Social Media Sharing"},
  { value: "SWedding Albums", label: "Wedding Albums"},
]

const optionsTypes3 = [
  { value: "Artistic", label: "Artistic"},
  { value: "Classic", label: "Classic"},
]

const optionsPriceRange = [
  {value: "$0-$999", label: "$0-$999"},
  {value: "$1,000-$1,999", label: "$1,000-$1,999"},
  {value: "$2,000-$2,999", label: "$2,000-$2,999"},
  {value: "$3,000-$4,999", label: "$3,000-$4,999"},
  {value: "$5,000+", label: "$5,000+"}
]

const optionsActivities = [
  {value: "Getting Engaged", label: "Getting Engaged"}
]

const VendorUpdateServiceDetailsForm = () => {

  const {
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all"
  })

  const auth = useContext(AuthContext)
  const theme = useContext(ThemeContext)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const onSubmit = data => {
    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        blocks: {
          ...auth.user.profile.blocks,
          service: Object.keys(data).filter(item => {
            return Array.isArray(data[item]) ? data[item].length : data[item]?.value?.length
          }).filter(Boolean).length === Object.keys(data).length
        }
      },
      service: {
        types: data.types.map(o => o.value),
        types_1: data.types_1.map(o => o.value),
        types_2: data.types_2.map(o => o.value),
        types_3: data.types_3.map(o => o.value),
        priceRange: (data?.priceRange && data.priceRange.value) || "",
        activities: (data?.activities && data.activities.value) || ""
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="service_details">
      <h4>Service Details</h4>
      <div className="m-t-24">
        <label className="input-label">
          Service
          <Controller
            control={control}
            name={f.photo.types}
            defaultValue={optionsTypes.filter(o => auth.user.service.types.includes(o.value))}
            render={({ field }) => (
              <Select
                closeMenuOnSelect={false}
                placeholder="Service"
                options={optionsTypes}
                isClearable={false}
                isMulti
                {...field}
                {...customReactSelectOptions(theme.get())}
              />
            )}
          />
          { !isValidField(f.photo.types) && <FieldError text={getErrorField(f.photo.types)} />}
        </label>

        <label className="input-label">
          Type of services
          <Controller
            control={control}
            name={f.photo.types_1}
            defaultValue={optionsTypes1.filter(o => auth.user.service.types_1.includes(o.value))}
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
          { !isValidField(f.photo.types_1) && <FieldError text={getErrorField(f.photo.types_1)} />}
        </label>

        <label className="input-label">
          Photo & Video Styles
          <Controller
            control={control}
            name={f.photo.types_3}
            defaultValue={optionsTypes3.filter(o => auth.user.service.types_3.includes(o.value))}
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
          { !isValidField(f.photo.types_3) && <FieldError text={getErrorField(f.photo.types_3)} />}
        </label>

        <label className="input-label">
          Starting Price Range
          <Controller
            control={control}
            name={f.priceRange}
            defaultValue={optionsPriceRange.filter(o => o.value === auth.user.service.priceRange)[0]}
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
          { !isValidField(f.priceRange) && <FieldError text={getErrorField(f.priceRange)} />}
        </label>

        <label className="input-label">
          Wedding Activities
          <Controller
            control={control}
            name={f.activities}
            defaultValue={optionsActivities.filter(o => o.value === auth.user.service.activities)[0]}
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
          { !isValidField(f.activities) && <FieldError text={getErrorField(f.activities)} />}
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