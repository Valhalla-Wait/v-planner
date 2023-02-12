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
import { useDispatch } from "react-redux";
import { updateVendor } from "../../../Store/Actions/updateUser";
import { replaceVendorPhoto } from "../../../Store/Actions/vendorPhotoAction";
import { ModalContext } from "../../../context/ModalContext";
import InputPasswordModal from "../../Modals/InputPasswordModal"
import TextModal from "../../Modals/TextModal";
import VendorService from "../../../services/VendorService"

const VendorUpdatePersonalInfarmationForm = ({
  img,
  name,
  surname,
  mail,
  phone,
}) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    control,
    resetField
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdatePersonalInformation()),
  });

  const modal = useContext(ModalContext)

  const dispatch = useDispatch()
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

  const handlePasswordInput = (password, data) => {
    postChanges(data, password)
  }

  const postChanges = (data, password) => {
    const updatedVendorFields = {
      firstName: data.firstName,
      surname: data.lastName,
      phoneNumber: data.phone
    }

    let promises = [];
    promises.push(dispatch(updateVendor(updatedVendorFields)))
    if (data.avatar.length) {
      promises.push(dispatch(replaceVendorPhoto(img.id, data.avatar)))
    }
    if (password) {
      promises.push(VendorService.changeCredentials(data.email, password))
    }

    Promise.all(promises)
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

  const onSubmit = (data) => {
    if (data.email !== mail) {
      modal.start()
      modal.setContent(<InputPasswordModal handlePasswordInput={handlePasswordInput} vendor={data} />)
    } else {
      postChanges(data)
    }
  };

  const removeAvatar = () => {
    setSrc(null);
    resetField(f.avatar)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="personal_information">
      <h4>Personal Information</h4>
      <div className="photo-upload m-t-24">
        <div className="photo-upload__photo">
          {(src || img.name) && (
            <img
              className="photo-upload__img"
              src={src || `https://images-and-videos.fra1.digitaloceanspaces.com/images/${img.name}`}
              alt=""
            />
          )}
          {!src && !img.name && <i className="icon-camera"></i>}
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
          type="button"
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
        name="email"
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
      <Button className="btn btn-accent m-t-8" disabled={!isValid || !isDirty}>
        Save
      </Button>
    </form>
  );
};

export default VendorUpdatePersonalInfarmationForm;
