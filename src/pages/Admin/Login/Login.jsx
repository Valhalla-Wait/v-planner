import React, { useLayoutEffect } from 'react'
import Button from '../../../components/Admin/UI/Button/Button'
import Input from '../../../components/Admin/UI/Input/Input'
import useTheme from '../../../hooks/useTheme'

import cls from "./Login.module.scss"

const Login = () => {
  const theme = useTheme()

  useLayoutEffect(() => {
    theme.setAdmin();
  })

  return (
    <div className={cls.container}>
      <div className={cls.login}>
        <h4 className={cls.loginHeader}>Login</h4>
        <label className={cls.loginLabel}>Email Address</label>
        <Input className={cls.loginInput} />
        <label className={cls.loginLabel}>Password</label>
        <Input className={cls.loginInput} type='password' />
        <Button className={cls.loginBtn}>Login</Button>
      </div >
    </div >
  )
}

export default Login