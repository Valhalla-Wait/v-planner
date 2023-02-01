import * as yup from "yup"
import { allowerImageType, allowerVideoType } from "../utils/allowedFileTypes"
import { regexpEmail } from "../utils/regexp"
import e from "./fieldError"
import f from "./fieldName"

yup.setLocale({
  mixed: {
    required: e.required
  }
})


export const schemaRequestResetPassword = () => yup.object().shape({
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email })
})

export const schemaEmailSubscribe = () => yup.object().shape({
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email })
})

export const schemaDeleteAccount = () => yup.object().shape({
  [f.password]: yup.string().typeError(e.string).required()
})

export const schemaChangePassword = () => yup.object().shape({
  [f.oldPassword]: yup.string().typeError(e.string).required(),
  [f.password]: yup.string().typeError(e.string).required().min(6, e.min(6)),
  [f.confirmPassword]: yup.string().typeError(e.string).oneOf([yup.ref(f.password), null], e.password),
})


// User schemas
export const schemaUserSignIn = () => yup.object().shape({
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),
  [f.password]: yup.string().typeError(e.string).required()
})

export const schemaUserSignUp = () => yup.object().shape({
  [f.avatar]: yup.mixed()
    .test(f.file.required, e.file.required,
      value => value.length
    )
    .test(f.file.size, e.file.size(1),
      value => value.length && value[0].size <= 1 * 1000 * 1024
    )
    .test(f.file.format, e.file.format(allowerImageType),
      value => value.length && allowerImageType.includes(value[0].type)
    ),
  [f.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),

  [f.nickname]: yup.string().typeError(e.string),
  [f.partners.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.partners.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),

  [f.date.engagement]: yup.date().required().min(new Date(), e.date),
  [f.date.wedding]: yup.date().required().min(new Date(), e.date),

  [f.location.default]: yup.mixed().required(),
  [f.count.guest]: yup.number().typeError(e.number.default).required().positive(),
  [f.budget]: yup.mixed(),
  [f.customBudget]: yup.number().typeError(e.number.default).positive(),

  [f.password]: yup.string().typeError(e.string).required().min(6, e.min(6)),
  [f.confirmPassword]: yup.string().typeError(e.string).oneOf([yup.ref(f.password), null], e.password),
})


// User update schemas
export const schemaUserUpdatePersonalInformation = () => yup.object().shape({
  [f.avatar]: yup.mixed()
    .test(f.file.size, e.file.size(1), value => {
      if (!value || !value.length) return true
      return value[0].size <= 1 * 1000 * 1024
    })
    .test(f.file.format, e.file.format(allowerImageType), value => {
      if (!value || !value.length) return true
      return allowerImageType.includes(value[0].type)
    }),
  [f.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),
  [f.nickname]: yup.string().typeError(e.string),
  [f.partners.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.partners.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
})

export const schemaUserUpdateWeddingInformation = () => yup.object().shape({
  [f.date.engagement]: yup.date().required().min(new Date(), e.date),
  [f.date.wedding]: yup.date().required().min(new Date(), e.date),
  [f.location.default]: yup.mixed().required(),
  [f.count.guest]: yup.number().typeError(e.number.default).required().positive(),
  [f.budget]: yup.mixed(),
  [f.customBudget]: yup.number().typeError(e.number.default).positive()
})

// Vendor schemas
export const schemaVendorSignIn = () => yup.object().shape({
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),
  [f.password]: yup.string().typeError(e.string).required()
})

export const schemaVendorPersonalInformation = () => yup.object().shape({
  [f.avatar]: yup.mixed()
    .test(f.file.required, e.file.required,
      value => value.length
    )
    .test(f.file.size, e.file.size(1),
      value => value.length && value[0].size <= 1 * 1000 * 1024
    )
    .test(f.file.format, e.file.format(allowerImageType),
      value => value.length && allowerImageType.includes(value[0].type)
    ),
  [f.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),
  [f.phone]: yup.mixed().test(f.phone, e.phone, value => value.length),
})

export const schemaVendorCompanyInformation = () => yup.object().shape({
  [f.name]: yup.string().typeError(e.string).required(),
  [f.type]: yup.mixed().required(),
  [f.amount]: yup.number().typeError(e.number.default).required().positive(e.number.positive),
  [f.state]: yup.mixed().required(),
  [f.country]: yup.string().typeError(e.string).required()
})

export const schemaVendorServiceDetails = () => yup.object().shape({
  [f.photo.types]: yup.mixed(),
  [f.photo.types_1]: yup.mixed(),
  [f.photo.types_3]: yup.mixed(),
  [f.priceRange]: yup.mixed(),
  [f.activities]: yup.mixed(),
})

export const schemaVendorAboutCompany = () => yup.object().shape({
  [f.file.default]: yup.mixed()
    .test(f.file.size, e.file.size(1), value => {
      if (!value || !value.length) return true
      return value[0].size <= 1 * 1000 * 1024
    })
    .test(f.file.format, e.file.format([...allowerImageType, ...allowerVideoType]), value => {
      if (!value || !value.length) return true
      return [...allowerImageType, ...allowerVideoType].includes(value[0].type)
    }),
  [f.title]: yup.string().typeError(e.string),
  [f.description]: yup.string().typeError(e.string),
  [f.about.company]: yup.string().typeError(e.string),
  [f.about.team]: yup.string().typeError(e.string),
})

export const schemaVendorPhotoAndVideo = () => yup.object().shape({})

export const schemaVendorSocialNetvorks = () => yup.object().shape({
  [f.social.facebook]: yup.string().typeError(e.string),
  [f.social.instagram]: yup.string().typeError(e.string),
  [f.social.youtube]: yup.string().typeError(e.string),
  [f.social.twitter]: yup.string().typeError(e.string),
  [f.social.tiktok]: yup.string().typeError(e.string)
})

export const schemaVendorCreatePassword = () => yup.object().shape({
  [f.password]: yup.string().typeError(e.string).required().min(6, e.min(6)),
  [f.confirmPassword]: yup.string().typeError(e.string).oneOf([yup.ref(f.password), null], e.password),
  [f.checked]: yup.bool().oneOf([true], e.checked)
})


// Vendor update schemas
export const schemaVendorUpdatePersonalInformation = () => yup.object().shape({
  [f.avatar]: yup.mixed()
    .test(f.file.size, e.file.size(1), value => {
      if (!value || !value.length) return true
      return value[0].size <= 1 * 1000 * 1024
    })
    .test(f.file.format, e.file.format(allowerImageType), value => {
      if (!value || !value.length) return true
      return allowerImageType.includes(value[0].type)
    }),
  [f.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),
  [f.phone]: yup.mixed().test(f.phone, e.phone, value => value.length),
})


export const schemaVendorUpdateCompanyInformation = () => yup.object().shape({
  [f.photo.default]: yup.mixed()
    .test(f.file.size, e.file.size(1), value => {
      if (!value || !value.length) return true
      return value[0].size <= 1 * 1000 * 1024
    })
    .test(f.file.format, e.file.format(allowerImageType), value => {
      if (!value || !value.length) return true
      return allowerImageType.includes(value[0].type)
    }),
  [f.name]: yup.string().typeError(e.string).required(),
  [f.type]: yup.mixed().required(),
  [f.amount]: yup.number().typeError(e.number.default).required().positive(e.number.positive),
  [f.state]: yup.mixed().required(),
  [f.country]: yup.string().typeError(e.string).required()
})

export const schemaVendorUpdateServiceDetails = () => yup.object().shape({
  [f.photo.types]: yup.mixed(),
  [f.photo.types_1]: yup.mixed(),
  [f.photo.types_3]: yup.mixed(),
  [f.priceRange]: yup.mixed(),
  [f.activities]: yup.mixed(),
})


export const schemaVendorUpdateAboutCompany = () => yup.object().shape({
  [f.file.default]: yup.mixed()
    .test(f.file.size, e.file.size(1), value => {
      if (!value || !value.length) return true
      return value[0].size <= 1 * 1000 * 1024
    })
    .test(f.file.format, e.file.format([...allowerImageType, ...allowerVideoType]), value => {
      if (!value || !value.length) return true
      return [...allowerImageType, ...allowerVideoType].includes(value[0].type)
    }),
  [f.title]: yup.string().typeError(e.string),
  [f.description]: yup.string().typeError(e.string),
  [f.about.company]: yup.string().typeError(e.string),
  [f.about.team]: yup.string().typeError(e.string),
})

export const schemaVendorUpdateSocialNetvorks = () => yup.object().shape({
  [f.social.facebook]: yup.string().typeError(e.string),
  [f.social.instagram]: yup.string().typeError(e.string),
  [f.social.youtube]: yup.string().typeError(e.string),
  [f.social.twitter]: yup.string().typeError(e.string),
  [f.social.tiktok]: yup.string().typeError(e.string)
})

export const schemaHelp = () => yup.object().shape({
  [f.firstName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.lastName]: yup.string().typeError(e.string).required().min(2, e.min(2)).max(20, e.max(20)),
  [f.email]: yup.string().typeError(e.string).required().matches(regexpEmail, { message: e.email }),
  [f.message]: yup.string().typeError(e.string).required().min(50, e.min(50)).max(1000, e.max(1000))
})