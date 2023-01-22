const fieldError = {
  string: "This is not string",
  number: {
    positive: "Number must be positive",
    default: "This is not number"
  },
  email: "This is not email",
  required: "This is required field",
  password: "Your passwords do no match",
  checked: "Field must be checked",
  phone: "Phone is invalid",
  min: ( length ) => `Minimum length ${length} characters`,
  max: ( length ) => `Maximum length ${length} characters`,
  file: {
    size: size => `File too large. Maximum ${size}mb`,
    format: formats => `Unsupported Format. Allowed ${formats.join(" ")}`,
    required: "This is required file"
  },
  date: "Date cannot be in the past"
}

export default fieldError