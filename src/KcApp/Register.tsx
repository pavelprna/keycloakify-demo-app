import { memo, useEffect } from 'react'
import { Template } from './Template'
import type { KcProps } from 'keycloakify/lib/components/KcProps'
import type { KcContextBase } from 'keycloakify/lib/getKcContext/KcContextBase'
import { getMsg } from 'keycloakify/lib/i18n'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

export const Register = memo(
  ({
    kcContext,
    ...props
  }: { kcContext: KcContextBase.Register } & KcProps) => {
    const { url, register, realm, passwordRequired } = kcContext

    const { msg, msgStr } = getMsg(kcContext)

    useEffect(() => {
      document.title = 'BookUP ID — Регистрация'
    }, [])

    return (
      <Template
        {...{ kcContext, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode={msg('registerTitle')}
        formNode={
          <Box
            component='form'
            action={url.registrationAction}
            method='post'
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              name='firstName'
              label={msg('firstName')}
              type='text'
              id='firstName'
              defaultValue={register.formData.firstName ?? ''}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='lastName'
              label={msg('lastName')}
              type='text'
              id='lastName'
              defaultValue={register.formData.lastName ?? ''}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='email'
              label={msg('email')}
              type='email'
              id='email'
              defaultValue={register.formData.email ?? ''}
              autoComplete='email'
            />
            {!realm.registrationEmailAsUsername && (
              <TextField
                margin='normal'
                required
                fullWidth
                name='username'
                label={msg('username')}
                type='text'
                id='username'
                defaultValue={register.formData.username ?? ''}
                autoComplete='username'
              />
            )}
            {passwordRequired && (
              <>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label={msg('password')}
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password-confirm'
                  label={msg('passwordConfirm')}
                  type='password'
                  id='password-confirm'
                />
              </>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              size='large'
            >
              {msgStr('doRegister')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={url.loginUrl} variant='body2'>
                  {msg('backToLogin')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        }
      />
    )
  }
)
