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
import { AuthContext } from "../../../context/AuthContext";

const VendorUpdateAboutCompanyForm = ({
  title,
  description,
  aboutCompany,
  aboutTeam,
  img,
}) => {
  const [src, setSrc] = useState(null);
  const [srcType, setSrcType] = useState(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdateAboutCompany()),
  });

  const auth = useContext(AuthContext);

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
    let isFilled = false;

    if (
      data.title &&
      data.description &&
      data.aboutCompany &&
      data.aboutTeam &&
      (data.file.length || auth.user.about.file.src)
    ) {
      isFilled = true;
    }

    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        blocks: {
          ...auth.user.profile.blocks,
          about: isFilled,
        },
      },
      about: {
        ...auth.user.about,
        ...data,
        file: {
          type:
            (src && srcType && srcType.split("/")[0]) ||
            auth.user.about.file.type,
          src: src || auth.user.about.file.src,
        },
      },
    });
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
                  src={`http://localhost:7000/${img}`}
                  alt=""
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
              {auth.user.about.file.src ? (
                <>
                  {auth.user.about.file.type === "image" && (
                    <img
                      className="file-upload__file"
                      src={auth.user.about.file.src}
                      alt=""
                    />
                  )}
                  {auth.user.about.file.type === "video" && (
                    <video
                      className="file-upload__file"
                      src={auth.user.about.file.src}
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
      <Button className="btn btn-accent m-t-24" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
};

export default VendorUpdateAboutCompanyForm;
