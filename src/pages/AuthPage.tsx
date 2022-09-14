import React, { useState, useRef } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from 'graphql/mutations'
import store from 'store'

const AuthPage = () => {
  const [showLogin] = useState(true)
  const [formData, setFormData] = useState<{
    username: string
    password: string
  }>({ username: '', password: '' })
  const authForm = useRef<any>(null)

  const [signUpUser, { data: signUpData, loading: l1, error: e1 }] =
    useMutation(LOGIN_USER)

  const [loginUser, { loading: l2, error: e2 }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem('jwt', data.loginUser.token)
      localStorage.setItem(
        'roles',
        data.loginUser.roles.map(
          (item: { name: string; __typename: string }) => item.name
        )
      )
      localStorage.setItem('id', data.loginUser.id)
      store.api.setLoggedIn()
    },
  })

  if (l1 || l2) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Авторизация...</Typography>
        </Box>
      </Box>
    )
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (showLogin) {
      loginUser({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      }).then()
    } else {
      signUpUser({
        variables: {
          input: formData,
        },
      }).then()
    }
  }

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card variant="outlined" sx={{ padding: '10px' }}>
        <Stack direction="column" spacing={2} sx={{ width: '400px' }}>
          {signUpData && (
            <Alert severity="success">
              {signUpData.signUpUser.username} залогинился
            </Alert>
          )}
          {e1 && <Alert severity="error">{e1.message}</Alert>}
          {e2 && <Alert severity="error">{e2.message}</Alert>}
          <Typography variant="h5">
            Пожалуйста {showLogin ? 'войдите' : 'зарегистрируйтесь'}
          </Typography>
          <TextField
            autoComplete="username"
            name="username"
            label="Логин"
            variant="standard"
            onChange={handleChange}
            required
          />
          <TextField
            autoComplete="current-password"
            type="password"
            name="password"
            label="password"
            variant="standard"
            onChange={handleChange}
            required
          />
          {/*Временно отключил регистрацию для проверки работы логина*/}
          {/*<Typography*/}
          {/*  textAlign="center"*/}
          {/*  variant="subtitle1"*/}
          {/*  onClick={() => {*/}
          {/*    setShowLogin((preValue) => !preValue)*/}
          {/*    setFormData({})*/}
          {/*    authForm.current.reset()*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {showLogin ? 'Зарегистироваться?' : 'Войти?'}*/}
          {/*</Typography>*/}
          <Button variant="outlined" type="submit">
            {showLogin ? 'Войти' : 'Зарегистироваться'}
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default AuthPage
