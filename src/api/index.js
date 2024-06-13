import http from './axios'

// 获取首页数据
export const getData = () => {
  return http.request({
    url: '/home/getData',
    method: 'get',
  })
}

// 获取用户数据
export const getUser = (params) => {
  return http.request({
    url: '/user/getUser',
    method: 'get',
    params,
  })
}

// 添加用户
export const addUser = (data) => {
  return http.request({
    url: '/user/addUser',
    method: 'post',
    data,
  })
}

// 修改用户
export const editUser = (data) => {
  return http.request({
    url: '/user/editUser',
    method: 'post',
    data,
  })
}

// 删除用户
export const delUser = (data) => {
  return http.request({
    url: '/user/delUser',
    method: 'post',
    data,
  })
}

// 登录
export const userLogin = (data) => {
  return http.request({
    url: '/permission/getMenu',
    method: 'post',
    data,
  })
}
