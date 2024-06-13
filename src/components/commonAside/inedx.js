import React from 'react'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import MenuConfig from '../../config'
import { useNavigate } from 'react-router-dom'
import { selectMenuList } from '../../store/reducers/tab'
import { useDispatch } from 'react-redux'

const { Sider } = Layout

// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单数据
const items = MenuConfig.map((item) => {
  // 没有子菜单
  const chile = {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label,
  }
  // 有子菜单
  if (item.children) {
    chile.children = item.children.map((child) => {
      return {
        key: child.path,
        label: child.label,
      }
    })
  }
  return chile
})

export default function CommonAside({ collapsed }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 添加数据到store
  const setTabsList = (data) => {
    dispatch(selectMenuList(data))
  }

  // 点击菜单
  const selectMenu = (e) => {
    let data
    MenuConfig.forEach((item) => {
      // 找到当前的数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        // 如果有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => child.path === e.key)
        }
      }
    })
    setTabsList({
      path: data.path,
      name: data.name,
      label: data.label,
    })
    navigate(e.key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className='app-name'>{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%',
        }}
        onClick={selectMenu}
      />
    </Sider>
  )
}
