import { customizeRequiredMark } from '@libs/antd'
import { COLORS } from '@src/styles/theme'
import { Button, Col, CountdownProps, Flex, Form, Input, Row, Statistic, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Countdown } = Statistic

type TOtpConfirm = {
  email?: string
  onFinish?: (otp: string) => void
  deadline?: number
  onResendOtp?: () => void
  loading?: boolean
  resendOtpLoading?: boolean
}

function OtpConfirm({
  email,
  onFinish,
  deadline = 0,
  onResendOtp,
  loading = false,
  resendOtpLoading = false,
}: TOtpConfirm) {
  const [form] = Form.useForm<{ otp: string }>()
  const [isFinishCountdown, setIsFinishCountdown] = useState(false)
  const onFinishCountdown: CountdownProps['onFinish'] = () => {
    setIsFinishCountdown(true)
  }
  useEffect(() => {
    setIsFinishCountdown(deadline <= 0)
  }, [deadline])

  return (
    <Row gutter={[0, 20]}>
      {email && (
        <Col span={24}>
          <Typography.Text style={{ fontStyle: 'italic' }}>
            登録メールボックス <strong>({email})</strong> に送信されたOTPコードを入力してください。
          </Typography.Text>
        </Col>
      )}
      <Col span={24}>
        <Form
          disabled={loading}
          layout="vertical"
          requiredMark={customizeRequiredMark}
          form={form}
          onFinish={(frm) => {
            if (onFinish) {
              onFinish(frm.otp)
            }
          }}
        >
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: 'OTPを入力してください' },
              { pattern: /^[A-Za-z0-9]{6}$/, message: 'OTPは英数字の6桁でなければなりません' },
            ]}
          >
            <Input.OTP
              autoFocus
              style={{ width: '100%', gap: 24 }}
              formatter={(str) => str.toUpperCase()}
              onInput={(v) => form.setFieldValue('otp', v.join(''))}
            />
          </Form.Item>
          <Flex flex={1} gap={16} vertical align="center">
            <Button type="primary" htmlType="submit" className="btn-submit-login" block loading={loading}>
              確認する
            </Button>
            <Flex gap={6} wrap justify="center">
              <Typography.Text style={{ color: COLORS.gray[400] }}>OTPコードを受け取っていませんか?</Typography.Text>
              {resendOtpLoading ? (
                <Typography.Text
                  style={{ fontWeight: 500, cursor: 'pointer' }}
                  onClick={() => {
                    if (onResendOtp) onResendOtp()
                  }}
                >
                  OTPを再送信する...
                </Typography.Text>
              ) : isFinishCountdown ? (
                <Typography.Text
                  style={{ fontWeight: 500, cursor: 'pointer' }}
                  onClick={() => {
                    if (onResendOtp) onResendOtp()
                  }}
                >
                  OTPを再送信する
                </Typography.Text>
              ) : (
                <Flex gap={6} wrap>
                  <Typography.Text>OTPを再送信</Typography.Text>
                  <Countdown valueStyle={{ fontSize: 14 }} value={deadline} format="ss" onFinish={onFinishCountdown} />
                  <Typography.Text>秒</Typography.Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Form>
      </Col>
    </Row>
  )
}

export default OtpConfirm
