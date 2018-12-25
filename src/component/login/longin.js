import React from 'react'
import './longin.scss'
import {
  Form, Icon, Input, Button, Checkbox, Modal, message
} from 'antd'
import Axios from 'axios'

class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    const { startHere, user, closeLongGin } = this.props
    const { resetFields } = this.props.form
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { siLogin } = this.props
        const url = siLogin
          ? 'http://localhost:8888/user/landing'
          : 'http://localhost:8888/user/register'
        Axios.post(url, {
          userName: values.userName,
          passWord: values.password
        })
          .then(function (res) {
            if (res.data.err_code === 200) {
              if (siLogin) {
                startHere()
                user(res.data.userName)
                message.success(`尊敬的${res.data.userName}用户您好，欢迎来到欢乐时光`)
                closeLongGin()
              } else {
                message.success('注册成功')
                closeLongGin()
              }
              resetFields()
            } else {
              siLogin
                ? message.error('登陆失败，请检查是否填写正确')
                : message.error('用户名已存在')
              resetFields()
            }
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { siLogin } = this.props
    console.log(this.props.siLogin)
    return (
      <Modal
        title={siLogin ? '登陆' : '注册'}
        visible={this.props.longGin}
        footer={null}
        onCancel={this.props.closeLongGin}
        className='longin'
      >
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(
              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
            )}
          </Form.Item>
          {
            siLogin
              ? <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )}
                <a className='login-form-forgot' href=''>找回密码</a><br />
                <Button type='primary' htmlType='submit' className='login-form-button'>
            登陆
                </Button><br />
                <a href='' className='register'>立即注册</a>
              </Form.Item>
              : <Button type='primary' htmlType='submit' className='login-form-button'>
        注册
              </Button>
          }
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(NormalLoginForm)
