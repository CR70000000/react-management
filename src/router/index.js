import { Navigate, createBrowserRouter } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from '../pages/mall'
import User from '../pages/user'
import PageOne from '../pages/other/pageOne'
import PageTwo from '../pages/other/pageTwo'
import Login from '../pages/login'

const routes = createBrowserRouter([
  // 路由配置
  {
    path: '/',
    Component: Main,
    // 子路由
    children: [
      // 重定向
      {
        path: '/',
        element: <Navigate to='home' />,
      },
      // 首页
      {
        path: 'home',
        Component: Home,
      },
      // 商城
      {
        path: 'mall',
        Component: Mall,
      },
      // 用户
      {
        path: 'user',
        Component: User,
      },
      // 其他
      {
        path: 'other',
        children: [
          // 页面一
          {
            path: 'pageOne',
            Component: PageOne,
          },
          // 页面二
          {
            path: 'pageTwo',
            Component: PageTwo,
          },
        ],
      },
    ],
  },
  {
    path:'/login',
    Component: Login
  }
])

export default routes
