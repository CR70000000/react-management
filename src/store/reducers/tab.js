import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: false, // 是否折叠
    // 菜单
    tabLst: [
      {
        path: '/',
        name: 'home',
        label: '首页',
      },
    ],
    // 当前选中的菜单
    currentMenu: {},
  },
  reducers: {
    setCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenuList(state, action) {
      if (action.payload.name !== 'home') {
        state.currentMenu = action.payload
        // 如果存在tag就不需要添加
        const res = state.tabLst.findIndex(
          (item) => item.name === action.payload.name
        )
        if (res === -1) {
          state.tabLst.push(action.payload)
        }
      } else if (action.payload.name === 'home' && state.tabLst.length === 1) {
        state.currentMenu = {}
      }
    },
    closeTag(state, action) {
      let res = state.tabLst.findIndex(
        (item) => item.name === action.payload.name
      )
      state.tabLst.splice(res, 1)
    },
    setCurrentMenu(state, action) {
      if (action.payload.name === 'home') {
        state.currentMenu = {}
      } else {
        state.currentMenu = action.payload
      }
    },
  },
})

export const { setCollapse, selectMenuList, closeTag, setCurrentMenu } =
  tabSlice.actions

export default tabSlice.reducer
