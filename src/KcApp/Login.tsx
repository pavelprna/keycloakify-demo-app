import { memo } from 'react'
import { Template } from 'keycloakify/lib/components/Template'
import type { KcProps } from 'keycloakify'
import { getMsg } from 'keycloakify'
import type { KcContext } from './kcContext'
import { useCssAndCx } from 'tss-react'
import { Row, Input, Button, Typography, Layout, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { SocialIcon } from 'react-social-icons'
import './Auth.css'
const { Title } = Typography

//This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
//It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
//provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.

type KcContext_Register = Extract<KcContext, { pageId: 'login.ftl' }>

export const Register = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Register } & KcProps) => {
    const { url, messagesPerField, login, realm } = kcContext

    const { msg, msgStr } = getMsg(kcContext)

    const { cx } = useCssAndCx()

    console.log(url)

    return (
      //   <Template
      //     {...{ kcContext, ...props }}
      //     doFetchDefaultThemeResources={true}
      //     headerNode={msg('registerTitle')}
      //     formNode={
      <Layout>
        <div className='auth-form'>
          <Card>
            <Title className='text-center'>BookUp ID</Title>
            <form
              id='kc-form-login'
              name='auth'
              className='login-form'
              action={url.loginAction}
              method='post'
            >
              {/* <Form.Item
                
                rules={[{ required: true, message: 'Введите логин!' }]}
              > */}
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                name='email'
                id='email'
                placeholder='Логин'
                style={{ marginBottom: '24px' }}
              />
              {/* </Form.Item>
              <Form.Item
              
              rules={[{ required: true, message: 'Введите пароль!' }]}
            > */}
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                style={{ marginBottom: '24px' }}
                name='password'
                id='password'
                type='password'
                placeholder='Пароль'
              />
              {/* </Form.Item> */}
              <Button type='primary' className='w-100' htmlType='submit'>
                Войти
              </Button>
              <Typography className='text-center' style={{ margin: '20px 0' }}>
                или войти с помощью
              </Typography>
              <Row justify='space-evenly'>
                <SocialIcon network='vk' />
                <SocialIcon network='google' />
                <SocialIcon network='facebook' />
                <SocialIcon url='https://upload.wikimedia.org/wikipedia/commons/5/58/Yandex_icon.svg' />
              </Row>
            </form>
          </Card>
        </div>
      </Layout>
      // <form id="kc-register-form" className={cx(props.kcFormClass)} action={url.registrationAction} method="post">
      //     <div className={cx(props.kcFormGroupClass, messagesPerField.printIfExists('firstName', props.kcFormGroupErrorClass))}>
      //         <div className={cx(props.kcLabelWrapperClass)}>
      //             <label htmlFor="firstName" className={cx(props.kcLabelClass)}>{msg("firstName")}</label>
      //         </div>
      //         <div className={cx(props.kcInputWrapperClass)}>
      //             <input type="text" id="firstName" className={cx(props.kcInputClass)} name="firstName"
      //                 defaultValue={register.formData.firstName ?? ""}
      //             />
      //         </div>
      //     </div>
      //     <div className={cx(props.kcFormGroupClass, messagesPerField.printIfExists("lastName", props.kcFormGroupErrorClass))}>
      //         <div className={cx(props.kcLabelWrapperClass)}>
      //             <label htmlFor="lastName" className={cx(props.kcLabelClass)}>{msg("lastName")}</label>
      //         </div>
      //         <div className={cx(props.kcInputWrapperClass)}>
      //             <input type="text" id="lastName" className={cx(props.kcInputClass)} name="lastName"
      //                 defaultValue={register.formData.lastName ?? ""}
      //             />
      //         </div>
      //     </div>
      //     <div className={cx(props.kcFormGroupClass, messagesPerField.printIfExists('email', props.kcFormGroupErrorClass))}>
      //         <div className={cx(props.kcLabelWrapperClass)}>
      //             <label htmlFor="email" className={cx(props.kcLabelClass)}>{msg("email")}</label>
      //         </div>
      //         <div className={cx(props.kcInputWrapperClass)}>
      //             <input type="text" id="email" className={cx(props.kcInputClass)} name="email"
      //                 defaultValue={register.formData.email ?? ""} autoComplete="email"
      //             />
      //         </div>
      //     </div>
      //     {
      //         !realm.registrationEmailAsUsername &&
      //         <div className={cx(props.kcFormGroupClass, messagesPerField.printIfExists('username', props.kcFormGroupErrorClass))}>
      //             <div className={cx(props.kcLabelWrapperClass)}>
      //                 <label htmlFor="username" className={cx(props.kcLabelClass)}>{msg("username")}</label>
      //             </div>
      //             <div className={cx(props.kcInputWrapperClass)}>
      //                 <input type="text" id="username" className={cx(props.kcInputClass)} name="username"
      //                     defaultValue={register.formData.username ?? ""} autoComplete="username" />
      //             </div>
      //         </div >
      //     }
      //     {
      //         passwordRequired &&
      //         <>
      //             <div className={cx(props.kcFormGroupClass, messagesPerField.printIfExists("password", props.kcFormGroupErrorClass))}>
      //                 <div className={cx(props.kcLabelWrapperClass)}>
      //                     <label htmlFor="password" className={cx(props.kcLabelClass)}>{msg("password")}</label>
      //                 </div>
      //                 <div className={cx(props.kcInputWrapperClass)}>
      //                     <input type="password" id="password" className={cx(props.kcInputClass)} name="password" autoComplete="new-password" />
      //                 </div>
      //             </div>
      //             <div className={cx(props.kcFormGroupClass, messagesPerField.printIfExists("password-confirm", props.kcFormGroupErrorClass))}>
      //                 <div className={cx(props.kcLabelWrapperClass)}>
      //                     <label htmlFor="password-confirm" className={cx(props.kcLabelClass)}>{msg("passwordConfirm")}</label>
      //                 </div>
      //                 <div className={cx(props.kcInputWrapperClass)}>
      //                     <input type="password" id="password-confirm" className={cx(props.kcInputClass)} name="password-confirm" />
      //                 </div>
      //             </div>
      //         </>
      //     }
      //     {
      //         recaptchaRequired &&
      //         <div className="form-group">
      //             <div className={cx(props.kcInputWrapperClass)}>
      //                 <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
      //             </div>
      //         </div>
      //     }
      //     <div className={cx(props.kcFormGroupClass)}>
      //         <div id="kc-form-options" className={cx(props.kcFormOptionsClass)}>
      //             <div className={cx(props.kcFormOptionsWrapperClass)}>
      //                 <span><a href={url.loginUrl}>{msg("backToLogin")}</a></span>
      //             </div>
      //         </div>
      //         <div id="kc-form-buttons" className={cx(props.kcFormButtonsClass)}>
      //             <input className={cx(props.kcButtonClass, props.kcButtonPrimaryClass, props.kcButtonBlockClass, props.kcButtonLargeClass)} type="submit"
      //                 value={msgStr("doRegister")} />
      //         </div>
      //     </div>
      // </form >
      //     }
      //   />
    )
  }
)
