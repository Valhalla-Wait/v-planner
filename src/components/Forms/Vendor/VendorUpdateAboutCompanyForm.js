import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Textarea from "../../UI/Textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorUpdateAboutCompany } from "../../../validation/schemas";
import {
  allowerImageType,
  allowerVideoType,
} from "../../../utils/allowedFileTypes";
import f from "../../../validation/fieldName";
import { FieldError } from "../../UI/FieldError";
import { checkFileType } from "../../../utils/checkFileType";
import { useDispatch } from "react-redux";
import { updateVendor } from "../../../Store/Actions/updateUser";
import { replaceVendorPhoto } from "../../../Store/Actions/vendorPhotoAction";
import { ModalContext } from "../../../context/ModalContext";
import TextModal from "../../Modals/TextModal";

const VendorUpdateAboutCompanyForm = ({
  title,
  description,
  aboutCompany,
  aboutTeam,
  file,
}) => {
  const modal = useContext(ModalContext)
  const [src, setSrc] = useState(null);
  const [srcType, setSrcType] = useState(null);
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdateAboutCompany()),
  });

  const addPhoto = (e) => {
    if (e.target.files && e.target.files.length) {
      setSrcType(e.target.files[0].type);
      const reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      return;
    }
    setSrc(null);
    setSrcType(null);
  };

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  const onSubmit = (data) => {
    const updatedVendorFields = {
      companyTitle: data.title,
      companyDescription: data.description,
      aboutCompany: data.aboutCompany,
      aboutTeam: data.aboutTeam,
    }
    let promises = [];
    promises.push(dispatch(updateVendor(updatedVendorFields)))
    if (data.file.length) {
      promises.push(dispatch(replaceVendorPhoto(file.id, data.file)))
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="about_company">
      <h4>About Company</h4>
      <div className="m-t-24">
        <label className="file-upload">
          {src && srcType ? (
            <>
              {srcType.indexOf("image") === 0 && (
                <img
                  className="file-upload__file"
                  src={src}
                  alt="image"
                />
              )}
              {srcType.indexOf("video") === 0 && (
                <video
                  className="file-upload__file"
                  src={src}
                  autoPlay
                  muted
                  loop
                ></video>
              )}
            </>
          ) : (
            <>
              {file.url ? (
                <>
                  {checkFileType(file.url) === "image" && (
                    <img
                      className="file-upload__file"
                      src={file.url}
                      alt=""
                    />
                  )}
                  {checkFileType(file.url) === "video" && (
                    <video
                      className="file-upload__file"
                      src={file.url}
                      autoPlay
                      muted
                      loop
                    ></video>
                  )}
                </>
              ) : (
                <>
                  <div className="file-upload__icon">
                    <i className="icon-photo-add"></i>
                  </div>
                  <div className="file-upload__title">
                    Upload Cover Photo or Video
                  </div>
                </>
              )}
            </>
          )}
          <Input
            type="file"
            className="photo-add__input"
            accept={[...allowerImageType, ...allowerVideoType]}
            register={register(f.file.default)}
            onInput={addPhoto}
          />
        </label>
        {!isValidField(f.file.default) && (
          <FieldError text={getErrorField(f.file.default)} />
        )}
        <Input
          type="text"
          placeholder="Company Title"
          label="Company Title"
          defaultValue={title}
          register={register(f.title)}
          error={getErrorField(f.title)}
          isValid={isValidField(f.title)}
        />
        <Textarea
          type="text"
          placeholder="Company Description"
          label="Company Description"
          defaultValue={description}
          rows={3}
          register={register(f.description)}
          error={getErrorField(f.description)}
          isValid={isValidField(f.description)}
        />
        <Textarea
          type="text"
          placeholder="About Company"
          label="About Company"
          defaultValue={aboutCompany}
          rows={5}
          register={register(f.about.company)}
          error={getErrorField(f.about.company)}
          isValid={isValidField(f.about.company)}
        />
        <Textarea
          type="text"
          placeholder="About Team"
          label="About Team"
          defaultValue={aboutTeam}
          rows={5}
          register={register(f.about.team)}
          error={getErrorField(f.about.team)}
          isValid={isValidField(f.about.team)}
        />
      </div>
      <Button className="btn btn-accent m-t-24" disabled={!isValid || !isDirty}>
        Save
      </Button>
    </form>
  );
};

export default VendorUpdateAboutCompanyForm;
