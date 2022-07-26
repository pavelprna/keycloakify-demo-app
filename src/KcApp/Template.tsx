import { memo } from 'react'
import type { ReactNode } from 'react'
import { getMsg } from 'keycloakify/lib/i18n'
import type { KcContextBase } from 'keycloakify/lib/getKcContext/KcContextBase'
import type { KcTemplateProps } from 'keycloakify/lib/components/KcProps'

import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export type TemplateProps = {
  displayInfo?: boolean
  displayMessage?: boolean
  displayRequiredFields?: boolean
  displayWide?: boolean
  showAnotherWayIfPresent?: boolean
  headerNode: ReactNode
  showUsernameNode?: ReactNode
  formNode: ReactNode
  infoNode?: ReactNode
  doFetchDefaultThemeResources: boolean
} & { kcContext: KcContextBase } & KcTemplateProps

export const Template = memo((props: TemplateProps) => {
  const { displayMessage = true, formNode, kcContext } = props

  const { msg } = getMsg(kcContext)

  const { realm, message, isAppInitiatedAction } = kcContext

  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            paddingY: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h4'>
            {msg('loginTitleHtml', realm.displayNameHtml)}
          </Typography>

          {displayMessage &&
            message !== undefined &&
            (message.type !== 'warning' || !isAppInitiatedAction) && (
              <Alert
                severity={message.type}
                sx={{ width: '100%', marginTop: 2 }}
              >
                {message.summary}
              </Alert>
            )}
          {formNode}
        </Box>
      </Container>
    </ThemeProvider>
  )
})
