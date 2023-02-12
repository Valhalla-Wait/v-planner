import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../UI/Input";
import { useState } from "react";
import { allowerImageType } from "../../../utils/allowedFileTypes";
import { FieldError } from "../../UI/FieldError";
import f from "../../../validation/fieldName";
import Button from "../../UI/Button";
import { schemaUserUpdatePersonalInformation } from "../../../validation/schemas";
import { useDispatch, useSelector } from "react-redux";
import { updateClient } from "../../../Store/Actions/updateUser";

const UserUpdatePersonalInformation = () => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserUpdatePersonalInformation()),
  });

  const dispatch = useDispatch()
  const [src, setSrc] = useState(null);
  const user = useSelector(state => state.userInfo.userData)

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
    const updatedUserData = {
      firstName: data.firstName,
      surname: data.lastName,
      username: data.nickname,
      partnerFirstName: data.partnersFirstName,
      partnerLastName: data.partnersLastName,
      id: user.id,
      phoneNumber: user.phoneNumber,
      city: user.city,
      weddingDate: user.clientModel.weddingDate,
      weddingAddress: user.clientModel.weddingAddress,
      amountOfGuests: user.clientModel.amountOfGuests,
      engagementDate: user.clientModel.engagementDate,
      engagementAddress: user.clientModel.engagementAddress,
      description: user.clientModel.description
    }
    dispatch(updateClient(updatedUserData, data.avatar[0]))
  };

  const removeAvatar = () => {
    setSrc(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="personal_information">
      <h4>Personal Informaton</h4>
      <div className="photo-upload m-t-24">
        <div className="photo-upload__photo">
          {(src || user.clientModel?.photoModel?.name) && (
            <img
              className="photo-upload__img"
              src={src || `https://images-and-videos.fra1.digitaloceanspaces.com/images/${user.clientModel?.photoModel?.name}`}
              alt=""
            />
          )}
          {!src && !user.clientModel?.photoModel?.name && <i className="icon-camera"></i>}
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
          type="button"
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
            defaultValue={user.firstName}
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
            defaultValue={user.surname}
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
        defaultValue={user.email}
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <Input
        type="text"
        placeholder="Nickname"
        label="Nickname"
        defaultValue={user.username}
        register={register(f.nickname)}
        error={getErrorField(f.nickname)}
        isValid={isValidField(f.nickname)}
      />
      <Input
        type="text"
        placeholder="Partners First Name"
        label="Partners First Name"
        defaultValue={user.clientModel.partnerFirstName}
        register={register(f.partners.firstName)}
        error={getErrorField(f.partners.firstName)}
        isValid={isValidField(f.partners.firstName)}
      />
      <Input
        type="text"
        placeholder="Partners Last Name"
        label="Partners Last Name"
        defaultValue={user.clientModel.partnerLastName}
        register={register(f.partners.lastName)}
        error={getErrorField(f.partners.lastName)}
        isValid={isValidField(f.partners.lastName)}
      />
      <Button className="btn btn-accent m-t-8" disabled={!isValid || !isDirty}>
        Save
      </Button>
    </form>
  );
};

export default UserUpdatePersonalInformation;
