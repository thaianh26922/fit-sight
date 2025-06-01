import HeadHtml from '@components/layout/HeadHtml'
import { Button, Col, Divider, Flex, Image, Row, Typography } from 'antd'
import logoApp from '@assets/logo-app.svg'
import { COLORS } from '@src/styles/theme'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { TResetPassword } from '@src/modules'
import {
  useMutationForgotPassword,
  useMutationForgotPasswordOtpVerification,
  useMutationForgotPasswordReset,
} from '@queries/hooks'
import TermOfPolicyLink from '@src/components/elements/TermOfPolicyLink'

import MailRequest from './components/MailRequest'
import OtpConfirm from './components/OtpConfirm'
import ResetPassword from './components/ResetPassword'

enum EElement {
  EMAIL_REQUEST = 'EMAIL_REQUEST',
  OTP_CONFIRM = 'OTP_CONFIRM',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

function ForgotPassword() {
  const navigate = useNavigate()
  const [eKeyActive, setEKeyActive] = useState<EElement>(EElement.EMAIL_REQUEST)
  const [emailRequest, setEmailRequest] = useState<string>()
  const [deadlineOTP, setDeadlineOTP] = useState(-1)
  const [token, setToken] = useState<string>()

  const { mutate: mutateForgotPassword, status: statusForgotPassword } = useMutationForgotPassword()
  const { mutate: mutateForgotPasswordOtpVerification, status: statusForgotPasswordOtpVerification } =
    useMutationForgotPasswordOtpVerification()
  const { mutate: mutateForgotPasswordReset, status: statusForgotPasswordReset } = useMutationForgotPasswordReset()

  const handleEmailRequest = (email: string) => {
    mutateForgotPassword(email, {
      onSuccess() {
        setEmailRequest(email)
        setEKeyActive(EElement.OTP_CONFIRM)
        setDeadlineOTP(Date.now() + 60 * 1000)
      },
    })
  }

  const handleOtpConfirm = (otp: string) => {
    if (emailRequest)
      mutateForgotPasswordOtpVerification(
        { email: emailRequest, otp },
        {
          onSuccess(res) {
            setToken(res.data)
            setEKeyActive(EElement.RESET_PASSWORD)
            setDeadlineOTP(-1)
          },
        },
      )
  }

  const handleResendOtp = () => {
    if (emailRequest)
      mutateForgotPassword(emailRequest, {
        onSuccess() {
          setDeadlineOTP(Date.now() + 60 * 1000)
        },
      })
  }

  const handleResetPassword = (frm: TResetPassword) => {
    if (token && emailRequest) {
      mutateForgotPasswordReset(
        { token, email: emailRequest, ...frm },
        {
          onSuccess() {
            navigate('/login')
          },
        },
      )
    }
  }

  const ELEMENTS = useMemo(
    () => ({
      [EElement.EMAIL_REQUEST]: (
        <MailRequest onFinish={handleEmailRequest} loading={statusForgotPassword === 'pending'} />
      ),
      [EElement.OTP_CONFIRM]: (
        <OtpConfirm
          email={emailRequest}
          deadline={deadlineOTP}
          onFinish={(c) => handleOtpConfirm(c)}
          onResendOtp={handleResendOtp}
          loading={statusForgotPasswordOtpVerification === 'pending'}
          resendOtpLoading={statusForgotPassword === 'pending'}
        />
      ),
      [EElement.RESET_PASSWORD]: (
        <ResetPassword onFinish={handleResetPassword} loading={statusForgotPasswordReset === 'pending'} />
      ),
    }),
    [emailRequest, deadlineOTP, statusForgotPassword, statusForgotPasswordOtpVerification, statusForgotPasswordReset],
  )

  return (
    <Row className="login-container" style={{ position: 'relative' }}>
      <HeadHtml title="パスワードをお忘れですか" />
      <Col className="login-boxer">
        <Row gutter={[24, 30]} align="middle" justify="center">
          <Col span={24}>
            <Row justify="center">
              <Image src={logoApp} alt="logo" width={250} preview={false} />
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Typography.Text style={{ fontSize: 21, fontWeight: 700 }}>パスワードをリセットする</Typography.Text>
              </Col>
              <Col span={24}>{ELEMENTS[eKeyActive]}</Col>
            </Row>
            <Divider>
              <Typography.Text style={{ color: COLORS.gray[400] }}>または</Typography.Text>
            </Divider>
            <Flex justify="center">
              <Button onClick={() => navigate('/login')}>ログインに戻る</Button>
            </Flex>
          </Col>
        </Row>
      </Col>
      <TermOfPolicyLink />
    </Row>
  )
}

export default ForgotPassword
