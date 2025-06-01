import { customizeRequiredMark } from '@libs/antd'
import { TResetPassword as TResetPasswordModule } from '@src/modules'
import { regexAlphaNumSpecial } from '@src/utils/regex'
import { Button, Form, Input } from 'antd'

type TResetPassword = {
  onFinish?: (frm: TResetPasswordModule) => void
  loading?: boolean
}

function ResetPassword({ onFinish, loading = false }: TResetPassword) {
  const [form] = Form.useForm<TResetPasswordModule>()
  return (
    <Form
      disabled={loading}
      layout="vertical"
      requiredMark={customizeRequiredMark}
      form={form}
      onFinish={(frm) => {
        if (onFinish) onFinish(frm)
      }}
    >
      <Form.Item
        name="newPassword"
        label="パスワード"
        rules={[
          { required: true, message: 'パスワードを入力してください' },
          { min: 6, message: 'パスワードは6文字以上で入力してください' },
          { max: 20, message: 'パスワードは20文字以内で入力してください' },
          {
            pattern: regexAlphaNumSpecial,
            message: 'パスワードは文字、数字、または特殊文字のみで構成してください',
          },
        ]}
        hasFeedback
      >
        <Input.Password
          type="password"
          placeholder="入力してください"
          autoFocus
          onPressEnter={() => form.getFieldInstance('confirmPassword').focus()}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['newPassword']}
        label="新しいパスワード（確認）"
        hasFeedback
        required
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('新しいパスワードと確認用パスワードが一致しません'))
            },
          }),
        ]}
      >
        <Input.Password type="password" maxLength={20} placeholder="入力してください" />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="btn-submit-login" block loading={loading}>
        パスワードをリセットする
      </Button>
    </Form>
  )
}

export default ResetPassword
