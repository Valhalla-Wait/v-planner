import { Controller, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Select from "react-select";
import { FieldError } from "../../UI/FieldError";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorUpdateCompanyInformation } from "../../../validation/schemas";
import f from "../../../validation/fieldName";
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions";
import { useContext, useState } from "react";
import { allowerImageType, allowerVideoType } from "../../../utils/allowedFileTypes";
import { ThemeContext } from "../../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { updateVendor } from "../../../Store/Actions/updateUser";
import { replaceVendorPhoto } from "../../../Store/Actions/vendorPhotoAction";
import { checkFileType } from "../../../utils/checkFileType";
import { ModalContext } from "../../../context/ModalContext";
import TextModal from "../../Modals/TextModal";

const optionsState = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "Arkansas", label: "Arkansas" },
  { value: " California", label: " California" },
  { value: "Colorado", label: "Colorado" },
  { value: " Connecticut", label: "Connecticut" },
  { value: "Delaware", label: "Delaware" },
  { value: " Florida", label: " Florida" },
  { value: " Georgia", label: " Georgia" },
  { value: " Hawaii", label: " Hawaii" },
  { value: " Idaho", label: " Idaho" },
  { value: "Illinois", label: "Illinois" },
  { value: " Indiana", label: "Indiana" },
  { value: "  Iowa", label: " Iowa" },
  { value: "  Kansas", label: " Kansas" },
  { value: " Kentucky", label: "Kentucky" },
  { value: "  Louisiana", label: " Louisiana" },
  { value: " Maine", label: "Maine" },
  { value: "   Massachusetts", label: " Massachusetts" },
  { value: "   Michigan", label: " Michigan" },
  { value: "   Mississippi", label: " Mississippi" },
  { value: "   Missouri", label: " Missouri" },
  { value: "  Montana", label: "Montana" },
  { value: "   Nebraska", label: " Nebraska" },
  { value: "   Nevada", label: " Nevada" },
  { value: "   New Hampshire", label: " New Hampshire" },
  { value: "    New Jersey", label: "  New Jersey" },
  { value: "    New Mexico", label: "  New Mexico" },
  { value: "     New York", label: "  New York" },
  { value: "    North Carolina", label: "  North Carolina" },
  { value: "    North Dakota", label: "North Dakota" },
  { value: "    Ohio", label: "   Ohio" },
  { value: "      Oregon", label: "    Oregon" },
  { value: "     Pennsylvania", label: "   Pennsylvania" },
  { value: "      Rhode Island", label: "    Rhode Island" },
  { value: "      South Carolina", label: "    South Carolina" },
  { value: "      South Dakota  ", label: "    South Dakota  " },
  { value: "    Texas ", label: "     Texas " },
  { value: "     Utah", label: "   Utah" },
  { value: "      Vermont", label: "    Vermont" },
  { value: "      Washington", label: "    Washington" },
  { value: "      West Virginia", label: "   West Virginia" },
  { value: "       Wisconsin", label: "    Wisconsin" },
  { value: "      Wyoming", label: " Wyoming" },
];

const optionTypes = [
  { value: "Business Category", label: "Business Category" },
  { value: "Wedding Bands", label: "Wedding Bands" },
  { value: "Wedding Cakes", label: "Wedding Cakes" },
  { value: "Wedding Dresses", label: "Wedding Dresses" },
  { value: "Wedding Hair & Makeup", label: "Wedding Hair & Makeup" },
  { value: "Wedding Photographers", label: "Wedding Photographers" },
  { value: "Wedding Planners", label: "Wedding Planners" },
  { value: "Bar Services & Beverages", label: "Bar Services & Beverages" },
  { value: "Caterers", label: "Caterers" },
  { value: "Dance Lessons", label: "Dance Lessons" },
  { value: "DJs", label: "DJs" },
  { value: "Musicians", label: "Musicians" },
  { value: "Favors", label: "Favors" },
  { value: "Florists", label: "Florists" },
  { value: "Invitations", label: "Invitations" },
  { value: "Officiants", label: "Officiants" },
  { value: "Photo Booths", label: "Photo Booths" },
  { value: "Venue", label: "Venue" },
  { value: "Rehearsal Dinner", label: "Rehearsal Dinner" },
  { value: "Rentals", label: "Rentals" },
  { value: "Limos", label: "Limos" },
  { value: "Videographers", label: "Videographers" },
];

const VendorUpdateCompanyInformationForm = ({ file, name, amount, city, serviceType, county }) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    control,
    resetField
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdateCompanyInformation()),
  });

  const theme = useContext(ThemeContext);
  const dispatch = useDispatch()
  const [src, setSrc] = useState(null);
  const [srcType, setSrcType] = useState(null);
  const modal = useContext(ModalContext)


  const addPhoto = (e) => {
    if (e.target.files && e.target.files.length) {
      setSrcType(e.target.files[0].type);
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  const onSubmit = (data) => {
    const updatedVendorFields = {
      companyName: data.name,
      fieldOfActivity: data.type.value,
      yearsOnMarket: data.amount,
      city: data.state.value,
      country: data.county
    }
    let promises = [];
    promises.push(dispatch(updateVendor(updatedVendorFields)))
    if (data.avatar.length) {
      dispatch(replaceVendorPhoto(file.id, data.avatar))
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
  };

  const removeLogo = () => {
    setSrc(null);
    resetField(f.avatar)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="company_information">
      <h4>Company Information</h4>
      <div className="photo-upload m-t-24">
        <div className="photo-upload__photo">
          {(src) ? (
            <>
              {srcType.includes("image") && <img
                className="photo-upload__img"
                src={src}
                alt=""
              />}
              {srcType.includes("video") && <video
                className="photo-upload__img"
                src={src}
                alt=""
                autoPlay
                muted
                loop
              />}
            </>
          ) :
            (file.url) ? (
              <>
                {checkFileType(file.url) === "image" && <img
                  className="photo-upload__img"
                  src={file.url}
                  alt=""
                />}
                {checkFileType(file.url) === "video" && <video
                  className="photo-upload__img"
                  src={file.url}
                  alt=""
                  autoPlay
                  muted
                  loop
                />
                }
              </>
            )
              : <i className="icon-camera"></i>
          }
        </div>
        <label className="photo-upload__label">
          <Input
            type="file"
            className="photo-upload__input"
            accept={[...allowerImageType, ...allowerVideoType]}
            register={register(f.avatar)}
            onInput={addPhoto}
          />
          <div className="btn btn-light photo-upload__btn">
            Upload New Photo
          </div>
        </label>
        <Button
          className="btn btn-photo-delete"
          onClick={removeLogo}
          type="button"
        >
          Delete
        </Button>
      </div>
      {!isValidField(f.photo.default) && (
        <FieldError text={getErrorField(f.photo.default)} />
      )}
      <Input
        type="text"
        placeholder="Company Name"
        label="Company Name"
        defaultValue={name}
        register={register(f.name)}
        error={getErrorField(f.name)}
        isValid={isValidField(f.name)}
      />
      <label className="input-label">
        Service Type
        <Controller
          control={control}
          name={f.type}
          defaultValue={optionTypes.find((o) => o.value === serviceType)}
          render={({ field }) => (
            <Select
              defaultValue={optionTypes.find((o) => o.value === serviceType)}
              placeholder="Service Type"
              options={optionTypes}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.type) && <FieldError text={getErrorField(f.type)} />}
      </label>
      <Input
        type="text"
        placeholder="Years on Market"
        label="Years on Market"
        defaultValue={amount}
        register={register(f.amount)}
        error={getErrorField(f.amount)}
        isValid={isValidField(f.amount)}
      />
      <div className="input-row">
        <div>
          <label className="input-label">
            State
            <Controller
              control={control}
              name={f.state}
              defaultValue={optionsState.filter((o) => o.value === city)}
              render={({ field }) => (
                <Select
                  placeholder="Adilet"
                  options={optionsState}
                  isClearable={false}
                  isSearchable={false}
                  {...field}
                  {...customReactSelectOptions(theme.get())}
                />
              )}
            />
            {!isValidField(f.state) && (
              <FieldError text={getErrorField(f.state)} />
            )}
          </label>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Country"
            label="County"
            defaultValue={county}
            register={register(f.county)}
            error={getErrorField(f.county)}
            isValid={isValidField(f.county)}
          />
        </div>
      </div>
      <Button className="btn btn-accent m-t-24"
        disabled={!isValid || !isDirty}
      >
        Save
      </Button>
    </form>
  );
};

export default VendorUpdateCompanyInformationForm;
