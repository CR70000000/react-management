import { Space, Tag } from 'antd'
import React from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeTag, setCurrentMenu } from '../../store/reducers/tab'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CommonTag() {
  const action = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tabsList = useSelector((state) => state.tab.tabLst)
  const currentMenu = useSelector((state) => state.tab.currentMenu)
  // 关闭标签
  const hanldeClose = (tag, index) => {
    let length = tabsList.length - 1
    dispatch(closeTag(tag))
    // 关闭的不是当前标签
    if (tag.path !== action.pathname) {
      return
    }
    // 关闭的是当前标签
    if (index === length) {
      // 当前标签是最后一个
      const curData = tabsList[index - 1]
      dispatch(setCurrentMenu(curData))
      navigate(curData.path)
    } else {
      // 当前标签不是最后一个
      if (tabsList.length > 0) {
        const nextData = tabsList[index + 1]
        dispatch(setCurrentMenu(nextData))
        navigate(nextData.path)
      }
    }
  }

  // 点击标签
  const hanldeClick = (tag) => {
    dispatch(setCurrentMenu(tag))
    navigate(tag.path)
  }

  const setTag = (flag, item, index) => {
    return flag ? (
      <Tag
        color='#55acee'
        key={item.name}
        closeIcon
        onClose={() => hanldeClose(item, index)}
      >
        {item.label}
      </Tag>
    ) : (
      <Tag onClick={() => hanldeClick(item)} key={item.name}>
        {item.label}
      </Tag>
    )
  }

  return (
    <Space className='common-tag' size={[0, 8]} wrap>
      {currentMenu.name &&
        tabsList.map((item, index) =>
          setTag(item.path === currentMenu.path, item, index, item, index)
        )}
    </Space>
  )
}
