import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { userLogin } from '../../api'
import { useNavigate, Navigate } from 'react-router-dom'
import './index.css'

export default function Login() {
  const navigate = useNavigate()

  if (localStorage.getItem('token')) {
    return <Navigate to='/home' replace />
  }

  // 登录
  const handleSubmit = (data) => {
    if (!data.username || !data.password) {
      return message.warning('用户名或密码不能为空')
    }
    userLogin(data).then((res) => {
      localStorage.setItem('token', res.data.data.token)
      navigate('/home')
    })
  }

  return (
    <Form className='login-container' onFinish={handleSubmit}>
      <div className='login-title'>系统登录</div>
      <Form.Item name='username' label='用名'>
        <Input placeholder='请输入用户名' />
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password placeholder='请输入密码' />
      </Form.Item>
      <Form.Item className='login-button'>
        <Button type='primary' htmlType='submit'>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
