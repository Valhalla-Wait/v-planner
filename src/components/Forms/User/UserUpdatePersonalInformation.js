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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCurrentUser } from "../../../Store/Actions/getCurrentUser";

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
  const userData = useSelector((state) => state.userInfo.userData);

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

    reqBody.append('updateClientModel', blob)
    if(data.avatar[0]) reqBody.append('avatar', data.avatar[0])

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/clients/update`,
      data: reqBody,
      headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      dispatch(getCurrentUser(localStorage.getItem("token")))
    })
      .catch((err) => {
        console.log(err)
      })
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
          {(src || userData.clientModel?.photoModel?.name) && (
            <img
              className="photo-upload__img"
              src={src || `https://images-and-videos.fra1.digitaloceanspaces.com/images/${userData.clientModel?.photoModel?.name}`}
              alt=""
            />
          )}
          {!src && !userData.clientModel?.photoModel?.name && <i className="icon-camera"></i>}
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
        <div
          className="btn btn-photo-delete"
          disabled={!isValid}
          onClick={removeAvatar}
        >
          Delete
        </div>
      </div>
      {/* {!isValidField(f.avatar) && <FieldError text={getErrorField(f.avatar)} />} */}
      <div className="input-row">
        <div>
          <Input
            type="text"
            placeholder="First Name"
            label="First Name"
            onChange={(e) => setFormData(prev => ({
              ...prev,
              firstName: e.currentTarget.value
            }))}
            defaultValue={userData.firstName}
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
            onChange={(e) => setFormData(prev => ({
              ...prev,
              surname: e.currentTarget.value
            }))}
            defaultValue={userData.surname}
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
        defaultValue={userData.email}
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <Input
        type="text"
        placeholder="Nickname"
        label="Nickname"
        defaultValue={userInfo.userData.username}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          username: e.currentTarget.value
        }))}
        register={register(f.nickname)}
        error={getErrorField(f.nickname)}
        isValid={isValidField(f.nickname)}
      />
      <Input
        type="text"
        placeholder="Partners First Name"
        onChange={(e) => setFormData(prev => ({
          ...prev,
          partnerFirstName: e.currentTarget.value
        }))}
        label="Partners First Name"
        defaultValue={userData.clientModel.partnerFirstName}
        register={register(f.partners.firstName)}
        error={getErrorField(f.partners.firstName)}
        isValid={isValidField(f.partners.firstName)}
      />
      <Input
        type="text"
        placeholder="Partners Last Name"
        label="Partners Last Name"
        onChange={(e) => setFormData(prev => {
          debugger
          return ({
            ...prev,
            partnerLastName: e.currentTarget.value
          })
        })}
        defaultValue={userData.clientModel.partnerLastName}
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
