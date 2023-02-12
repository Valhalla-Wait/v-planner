import { useForm } from "react-hook-form";
import f from "../../../validation/fieldName";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorUpdateSocialNetvorks } from "../../../validation/schemas";
import { useDispatch } from "react-redux";
import { updateVendor } from "../../../Store/Actions/updateUser";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext";
import TextModal from "../../Modals/TextModal";

const VendorUpdateSocialNetvorksForm = ({
  instagram,
  facebook,
  youtube,
  twitter,
  tiktok
}) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdateSocialNetvorks()),
  });

  const dispatch = useDispatch()
  const modal = useContext(ModalContext)

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  const onSubmit = (data) => {
    dispatch(updateVendor(data))
      .then(() => {
        modal.start()
        modal.setContent(<TextModal text="Changes have been saved" />)
      })
      .catch((err) => {
        console.log(err)
        modal.start()
        modal.setContent(<TextModal text={err.message} />)
      })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="social-form"
      data-to="social_networks"
    >
      <h4>Social Networks</h4>
      <div className="social-form__list m-t-24">
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
              defaultValue={facebook}
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
              defaultValue={instagram}
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
              defaultValue={youtube}
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
              defaultValue={twitter}
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
              defaultValue={tiktok}
              register={register(f.social.tiktok)}
              error={getErrorField(f.social.tiktok)}
              isValid={isValidField(f.social.tiktok)}
            />
          </div>
        </div>
      </div>
      <Button className="btn btn-accent m-t-16" disabled={!isValid || !isDirty}>
        Save
      </Button>
    </form>
  );
};

export default VendorUpdateSocialNetvorksForm;
