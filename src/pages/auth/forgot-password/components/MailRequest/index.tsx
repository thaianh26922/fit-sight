import { customizeRequiredMark } from '@libs/antd'
import { Button, Col, Form, Input, Row, Typography } from 'antd'

type TMailRequest = {
  onFinish?: (email: string) => void
  loading?: boolean
}

function MailRequest({ onFinish, loading = false }: TMailRequest) {
  const [form] = Form.useForm<{ email: string }>()
  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Typography.Text style={{ fontWeight: 500, fontStyle: 'italic' }}>
          パスワードリセット情報を受け取りたいメールアドレスを入力してください
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Form
          disabled={loading}
          layout="vertical"
          requiredMark={customizeRequiredMark}
          form={form}
          onFinish={(frm) => {
            if (onFinish) {
              onFinish(frm.email)
            }
          }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'メールアドレスを入力してください' },
              { type: 'email', message: 'メールアドレスが無効です' },
            ]}
          >
            <Input placeholder="メールアドレスを入力してください" autoFocus />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit-login" block loading={loading}>
            パスワードのリセットをリクエストする
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default MailRequest
