import { useState, memo, useEffect } from 'react'
import { Template } from './Template'
import type { KcProps } from 'keycloakify/lib/components/KcProps'
import type { KcContextBase } from 'keycloakify/lib/getKcContext/KcContextBase'
import { getMsg } from 'keycloakify/lib/i18n'
import { useConstCallback } from 'powerhooks/useConstCallback'
import type { FormEventHandler } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

export const Login = memo(
  ({ kcContext, ...props }: { kcContext: KcContextBase.Login } & KcProps) => {
    const {
      social,
      realm,
      url,
      usernameEditDisabled,
      login,
      auth,
      registrationDisabled,
    } = kcContext

    const { msg, msgStr } = getMsg(kcContext)

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)

    useEffect(() => {
      document.title = 'BookUP ID — Вход'
    }, [])

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(
      (e) => {
        e.preventDefault()

        setIsLoginButtonDisabled(true)

        const formElement = e.target as HTMLFormElement

        formElement
          .querySelector("input[name='email']")
          ?.setAttribute('name', 'username')

        formElement.submit()
      }
    )

    const label = !realm.loginWithEmailAllowed
      ? 'username'
      : realm.registrationEmailAsUsername
      ? 'email'
      : 'usernameOrEmail'

    const autoCompleteHelper: typeof label =
      label === 'usernameOrEmail' ? 'username' : label

    return (
      <Template
        {...{ kcContext, ...props }}
        doFetchDefaultThemeResources={true}
        displayInfo={social.displayInfo}
        displayWide={realm.password && social.providers !== undefined}
        headerNode={msg('doLogIn')}
        formNode={
          <Box
            component='form'
            action={url.loginAction}
            method='post'
            onSubmit={onSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label={msg(label)}
              name={autoCompleteHelper}
              {...(usernameEditDisabled
                ? { disabled: true }
                : {
                    autoFocus: true,
                    autoComplete: 'off',
                  })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label={msg('password')}
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {realm.rememberMe && !usernameEditDisabled && (
              <FormControlLabel
                control={
                  <Checkbox
                    name='rememberMe'
                    color='primary'
                    {...(login.rememberMe
                      ? {
                          checked: true,
                        }
                      : {})}
                  />
                }
                label={msg('rememberMe')}
              />
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              size='large'
              disabled={isLoginButtonDisabled}
            >
              {msgStr('doLogIn')}
            </Button>
            <Grid container>
              <Grid item xs>
                {realm.resetPasswordAllowed && (
                  <Link href={url.loginResetCredentialsUrl} variant='body2'>
                    {msg('doForgotPassword')}
                  </Link>
                )}
              </Grid>
              <Grid item>
                {realm.password &&
                  realm.registrationAllowed &&
                  !registrationDisabled && (
                    <>
                      {/* <Typography>{msg('noAccount')}</Typography> */}

                      <Link href={url.registrationUrl} variant='body2'>
                        {msg('doRegister')}
                      </Link>
                    </>
                  )}
              </Grid>
            </Grid>
          </Box>
        }
      />
    )
  }
)
