import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../UI/Input";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { allowerImageType } from "../../../utils/allowedFileTypes";
import { FieldError } from "../../UI/FieldError";
import f from "../../../validation/fieldName";
import Button from "../../UI/Button";
import { schemaUserUpdatePersonalInformation } from "../../../validation/schemas";
import { useSelector } from "react-redux";

const UserUpdatePersonalInformation = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserUpdatePersonalInformation()),
  });

  const auth = useContext(AuthContext);
  const [src, setSrc] = useState(null);
  const { userInfo } = useSelector((state) => state);
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
      <h4>Personal Informaton</h4>
      <div className="photo-upload m-t-24">
        <div className="photo-upload__photo">
          {(src || auth.user.profile.avatar) && (
            <img
              className="photo-upload__img"
              src={`https://images-and-videos.fra1.digitaloceanspaces.com/images/${userInfo.userData.clientModel?.photoModel?.name}`}
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
            defaultValue={auth.user.profile.firstName}
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
            defaultValue={auth.user.profile.lastName}
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
        defaultValue={auth.user.profile.email}
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <Input
        type="text"
        placeholder="Nickname"
        label="Nickname"
        defaultValue={userInfo.userData.username}
        register={register(f.nickname)}
        error={getErrorField(f.nickname)}
        isValid={isValidField(f.nickname)}
      />
      <Input
        type="text"
        placeholder="Partners First Name"
        label="Partners First Name"
        defaultValue={userInfo.userData.partnerFirstName}
        register={register(f.partners.firstName)}
        error={getErrorField(f.partners.firstName)}
        isValid={isValidField(f.partners.firstName)}
      />
      <Input
        type="text"
        placeholder="Partners Last Name"
        label="Partners Last Name"
        defaultValue={userInfo.userData.partnerSecondName}
        register={register(f.partners.lastName)}
        error={getErrorField(f.partners.lastName)}
        isValid={isValidField(f.partners.lastName)}
      />
      <Button className="btn btn-accent m-t-8" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
};

export default UserUpdatePersonalInformation;
