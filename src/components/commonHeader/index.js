import React from 'react'
import { Button, Layout, Avatar, Dropdown } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux'
import { setCollapse } from '../../store/reducers/tab'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout

export default function CommonHeader({ collapsed }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 退出登录
  const logout = () => {
    // 清空token
    localStorage.removeItem('token')
    // 跳转到登录页
    navigate('/login')
  }

  const items = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer'>
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={logout} target='_blank' rel='noopener noreferrer'>
          退出
        </a>
      ),
    },
  ]

  // 点击展开收起按键
  const setCollapsed = () => {
    dispatch(setCollapse())
  }

  return (
    <Header className='header-container'>
      <Button
        type='text'
        onClick={() => setCollapsed()}
        icon={<MenuFoldOutlined />}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff',
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar src={<img src={require('../../assets/images/user.png')} />} />
      </Dropdown>
    </Header>
  )
}
