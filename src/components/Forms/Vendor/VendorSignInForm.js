import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaVendorSignIn } from "../../../validation/schemas";
import f from "../../../validation/fieldName";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { ModalContext } from "../../../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../Store/Actions/AuthAction"

const VendorSignInForm = () => {
  const modal = useContext(ModalContext);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorSignIn()),
  });

  const signIn = (data) => {
    const reqData = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginAction(reqData));
    modal.destroy();
  };

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <Input
        type="text"
        placeholder="Email"
        isValid={isValidField(f.email)}
        error={getErrorField(f.email)}
        register={register(f.email)}
      />
      <Input
        type="password"
        placeholder="Password"
        isValid={isValidField(f.password)}
        error={getErrorField(f.password)}
        register={register(f.password)}
      />
      <Button
        className="btn btn-accent m-t-24 d-block w-100"
        disabled={!isValid}
      >
        Sign In
      </Button>
    </form>
  );
};

export default VendorSignInForm;
