import { useForm } from "react-hook-form"
import f from "../../../validation/fieldName"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorSocialNetvorks } from "../../../validation/schemas"

const VendorSocialNetvorksForm = ({ onCallback, onBack }) => {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorSocialNetvorks())
  })
  
  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message
  
  return (
    <form onSubmit={handleSubmit(onCallback)} className="social-form">
      <div className="social-form__list">
        <div className="social-form__item">
          <div className="social-form__label">
            <div className="social-form__icon">
              <i className="icon-facebook"></i>
            </div>
            Facebook
          </div>
          <div className="social-form__input">
            <Input
              type="text"
              placeholder="Link"
              register={register(f.social.facebook)}
              error={getErrorField(f.social.facebook)}
              isValid={isValidField(f.social.facebook)}
            />
          </div>
        </div>
        <div className="social-form__item">
          <div className="social-form__label">
            <div className="social-form__icon">
              <i className="icon-instagram"></i>
            </div>
            Instagram
          </div>
          <div className="social-form__input">
            <Input
              type="text"
              placeholder="Link"
              register={register(f.social.instagram)}
              error={getErrorField(f.social.instagram)}
              isValid={isValidField(f.social.instagram)}
            />
          </div>
        </div>
        <div className="social-form__item">
          <div className="social-form__label">
            <div className="social-form__icon">
              <i className="icon-youtube"></i>
            </div>
            Youtube
          </div>
          <div className="social-form__input">
            <Input
              type="text"
              placeholder="Link"
              register={register(f.social.youtube)}
              error={getErrorField(f.social.youtube)}
              isValid={isValidField(f.social.youtube)}
            />
          </div>
        </div>
        <div className="social-form__item">
          <div className="social-form__label">
            <div className="social-form__icon">
              <i className="icon-twitter"></i>
            </div>
            Twitter
          </div>
          <div className="social-form__input">
            <Input
              type="text"
              placeholder="Link"
              register={register(f.social.twitter)}
              error={getErrorField(f.social.twitter)}
              isValid={isValidField(f.social.twitter)}
            />
          </div>
        </div>
        <div className="social-form__item">
          <div className="social-form__label">
            <div className="social-form__icon">
              <i className="icon-tiktok"></i>
            </div>
            TikTok
          </div>
          <div className="social-form__input">
            <Input
              type="text"
              placeholder="Link"
              register={register(f.social.tiktok)}
              error={getErrorField(f.social.tiktok)}
              isValid={isValidField(f.social.tiktok)}
            />
          </div>
        </div>
      </div>
      <div className="input-row">
        <div
          className="btn btn-accent btn-circle m-t-24"
          onClick={onBack}
        >
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
        >Next</Button>
      </div>
    </form>
  )
}

export default VendorSocialNetvorksForm