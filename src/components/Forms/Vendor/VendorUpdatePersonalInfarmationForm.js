import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import "react-phone-input-2/lib/style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorUpdatePersonalInformation } from "../../../validation/schemas";
import f from "../../../validation/fieldName";
import { allowerImageType } from "../../../utils/allowedFileTypes";
import { FieldError } from "../../UI/FieldError";
import { AuthContext } from "../../../context/AuthContext";

const VendorUpdatePersonalInfarmationForm = ({
  img,
  name,
  surname,
  mail,
  phone,
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdatePersonalInformation()),
  });

  const auth = useContext(AuthContext);

  const [src, setSrc] = useState(null);

  const addPhoto = (e) => {
    if (e.target.files && e.target.files.length) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setSrc(null);
  };

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  const onSubmit = (data) => {
    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        ...data,
        avatar: src || auth.user.profile.avatar,
      },
    });
  };

  const removeAvatar = () => {
    setSrc(null);
    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        avatar: null,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="personal_information">
      <h4>Personal Information</h4>
      <div className="photo-upload m-t-24">
        <div className="photo-upload__photo">
          {(src || auth.user.profile.avatar) && (
            <img
              className="photo-upload__img"
              src={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${img}`}
              alt=""
            />
          )}
          {!src && !auth.user.profile.avatar && <i className="icon-camera"></i>}
        </div>
        <label className="photo-upload__label">
          <Input
            type="file"
            className="photo-upload__input"
            accept={allowerImageType}
            register={register(f.avatar)}
            onInput={addPhoto}
          />
          <div className="btn btn-light photo-upload__btn" disabled={!isValid}>
            Upload New Photo
          </div>
        </label>
        <Button
          className="btn btn-photo-delete"
          disabled={!isValid}
          onClick={removeAvatar}
        >
          Delete
        </Button>
      </div>
      {!isValidField(f.avatar) && <FieldError text={getErrorField(f.avatar)} />}
      <div className="input-row">
        <div>
          <Input
            type="text"
            placeholder="First Name"
            label="First Name"
            defaultValue={name}
            register={register(f.firstName)}
            error={getErrorField(f.firstName)}
            isValid={isValidField(f.firstName)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Last Name"
            label="Last Name"
            defaultValue={surname}
            register={register(f.lastName)}
            error={getErrorField(f.lastName)}
            isValid={isValidField(f.lastName)}
          />
        </div>
      </div>
      <Input
        type="email"
        placeholder="Email"
        label="Email"
        defaultValue={mail}
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <label className="input-label">
        Phone Number
        <Controller
          control={control}
          name={f.phone}
          defaultValue={phone}
          render={({ field }) => (
            <PhoneInput className="input-control" country={"us"} {...field} />
          )}
        />
        {!isValidField(f.phone) && <FieldError text={getErrorField(f.phone)} />}
      </label>
      <Button className="btn btn-accent m-t-8" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
};

export default VendorUpdatePersonalInfarmationForm;
