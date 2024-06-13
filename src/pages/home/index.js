import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Table } from 'antd'
import * as Icon from '@ant-design/icons'
import './index.css'
import { getData } from '../../api'
import ECharts from '../../components/Echarts'

// table列的数据
const columns = [
  {
    title: '课程',
    dataIndex: 'name',
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy',
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy',
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy',
  },
]

// 订单统计数据
const countData = [
  {
    name: '今日支付订单',
    value: 1234,
    icon: 'CheckCircleOutlined',
    color: '#2ec7c9',
  },
  {
    name: '今日收藏订单',
    value: 3421,
    icon: 'ClockCircleOutlined',
    color: '#ffb980',
  },
  {
    name: '今日未支付订单',
    value: 1234,
    icon: 'CloseCircleOutlined',
    color: '#5ab1ef',
  },
  {
    name: '本月支付订单',
    value: 1234,
    icon: 'CheckCircleOutlined',
    color: '#2ec7c9',
  },
  {
    name: '本月收藏订单',
    value: 3421,
    icon: 'ClockCircleOutlined',
    color: '#ffb980',
  },
  {
    name: '本月未支付订单',
    value: 1234,
    icon: 'CloseCircleOutlined',
    color: '#5ab1ef',
  },
]

// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

export default function Home() {
  const userImg = require('../../assets/images/user.png')
  // 创建Echart响应式数据
  const [echartData, setEchartData] = useState([])
  // DOM首次渲染完成
  useEffect(() => {
    getData().then((res) => {
      console.log(res)
      setTableData(res.data.data.tableData)

      // 对于Echarts数据组装
      // 订单折线图数据
      const orderData = res.data.data.orderData
      // 柱状图数据
      const userData = res.data.data.userData
      // 饼图数据
      const videoData = res.data.data.videoData

      // x轴数据
      const xData = orderData.date
      // series数据
      const series = []
      // Object.keys可以将对象中的数据转换为数组
      const keyArray = Object.keys(orderData.data[0])
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: 'line',
        })
      })
      setEchartData({
        // 订单折线图数据
        order: {
          xData,
          series,
        },
        // 用户柱状图数据
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map((item) => item.new),
              type: 'bar',
            },
            {
              name: '活跃用户',
              data: userData.map((item) => item.active),
              type: 'bar',
            },
          ],
        },
        // 视频饼图数据
        video: {
          series: [
            {
              data: videoData,
              type: 'pie',
            },
          ],
        },
      })
    })
  }, [])
  // 定义table数据
  const [tableData, setTableData] = useState([])
  return (
    <Row className='home' gutter={8}>
      {/* 左边部分 */}
      <Col span={8}>
        {/* 左边上面部分 */}
        <Card
          style={{
            marginBottom: 8,
          }}
          hoverable
        >
          <div className='user'>
            <img src={userImg} alt='user' />
            <div className='userinfo'>
              <p className='name'>Admin</p>
              <p className='access'>超级管理员</p>
            </div>
          </div>
          <div className='logininfo'>
            <p>
              上次登录时间：<span>2022-7-11</span>
            </p>
            <p>
              上次登录地点：<span>武汉</span>
            </p>
          </div>
        </Card>
        {/* 左边下面部分 */}
        <Card>
          <Table
            rowKey={'name'}
            dataSource={tableData}
            columns={columns}
            pagination={false}
          />
        </Card>
      </Col>
      {/* 右边部分 */}
      <Col span={16}>
        <div className='num'>
          {countData.map((item, index) => {
            return (
              <Card key={index}>
                <div
                  className='iconbox'
                  style={{
                    background: item.color,
                  }}
                >
                  {iconToElement(item.icon)}
                </div>
                <div className='detail'>
                  <p className='num'>{item.value}</p>
                  <p className='txt'>{item.name}</p>
                </div>
              </Card>
            )
          })}
        </div>
        {echartData.order && (
          <ECharts chartData={echartData.order} style={{ height: '280px' }} />
        )}
        <div className='graph'>
          {echartData.user && (
            <ECharts
              chartData={echartData.user}
              style={{ height: '240px', width: '50%' }}
            />
          )}
          {echartData.video && (
            <ECharts
              chartData={echartData.video}
              isAxisChart={false}
              style={{ height: '240px', width: '50%' }}
            />
          )}
        </div>
      </Col>
    </Row>
  )
}
