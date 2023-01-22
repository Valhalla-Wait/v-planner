import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorCreatePassword } from "../../../validation/schemas";
import f from "../../../validation/fieldName";
import { FieldError } from "../../UI/FieldError";

const VendorCreatePasswordForm = ({ onCallback, onBack }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorCreatePassword()),
  });

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  return (
    <form onSubmit={handleSubmit(onCallback)}>
      <Input
        type="password"
        placeholder="Password"
        register={register(f.password)}
        error={getErrorField(f.password)}
        isValid={isValidField(f.password)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        register={register(f.confirmPassword)}
        error={getErrorField(f.confirmPassword)}
        isValid={isValidField(f.confirmPassword)}
      />
      <label className="check option">
        <input
          className="check__input"
          type="checkbox"
          {...register(f.checked)}
          defaultChecked
        />
        <span className="check__box"></span>I agree to The Knot's&nbsp;
        <a
          className="link"
          href="http://localhost:3000/policy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        &nbsp;and&nbsp;
        <a
          className="link"
          href="http://localhost:3000/rules"
          target="_blank"
          rel="noreferrer"
        >
          Terms of Use
        </a>
        .
      </label>
      {!isValidField(f.checked) && (
        <div style={{ marginTop: 16 }}>
          <FieldError text={getErrorField(f.checked)} />
        </div>
      )}
      <div className="input-row">
        <div className="btn btn-accent btn-circle m-t-24" onClick={onBack}>
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
        >
          Lest Go!
        </Button>
      </div>
    </form>
  );
};

export default VendorCreatePasswordForm;
