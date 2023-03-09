import React, { useLayoutEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../../hooks/useTheme'

import { yupResolver } from "@hookform/resolvers/yup";

import { schemaUserSignIn } from "../../../validation/schemas";
import f from "../../../validation/fieldName";

import Button from '../../../components/Admin/UI/Button/Button'
import Input from '../../../components/Admin/UI/Input/Input'


import cls from "./Login.module.scss"
import { loginAdminAction } from '../../../Store/Actions/Admin/AdminAuthAction';

const Login = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.userInfo)


  useLayoutEffect(() => {
    theme.setAdmin();
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserSignIn()),
  });

  const isValidField = (field) => !errors[field];
  const getErrorField = (field) => errors[field]?.message;

  const signIn = (data) => {
    const reqData = {
      email: data[f.email],
      password: data[f.password],
    };
    dispatch(loginAdminAction(reqData))
  }


  return (
    <div className={cls.container}>
      <form className={cls.login} onSubmit={handleSubmit(signIn)}>
        <h4 className={cls.loginHeader}>Login</h4>
        {error && <div className={cls.loginError}>{error}</div>}
        <label className={cls.loginLabel}>Email Address</label>
        <Input
          className={cls.loginInput}
          isValid={isValidField(f.email)}
          error={getErrorField(f.email)}
          register={register(f.email)} />
        <label className={cls.loginLabel}>Password</label>
        <Input
          className={cls.loginInput}
          type='password'
          isValid={isValidField(f.password)}
          error={getErrorField(f.password)}
          register={register(f.password)}
        />
        <Button
          className={cls.loginBtn}
          type="submit"
        >Login</Button>
      </form >
    </div >
  )
}

export default Login