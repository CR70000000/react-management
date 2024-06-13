import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
} from 'antd'
import './index.css'
import { getUser, addUser, editUser, delUser } from '../../api'
import dayjs from 'dayjs'

export default function User() {
  const [form] = Form.useForm()
  // 表单数据
  const [listData, setListData] = useState({
    name: '',
  })
  // 表格数据
  const [tableData, setTableData] = useState([])
  // 新增/编辑弹窗
  const [modalType, setModalType] = useState('编辑用户')
  // 打开/关闭弹窗
  const [modalShow, setModalShow] = useState(false)

  // 新增
  const handleClick = (type, rowData) => {
    console.log(type, rowData)
    // 打开/关闭弹窗
    setModalShow(!modalShow)
    // 设置弹窗标题
    if (type === 'add') {
      setModalType('新增用户')
    } else {
      setModalType('编辑用户')
      // 数据深拷贝
      const cloneData = JSON.parse(JSON.stringify(rowData))
      // 设置日期格式
      cloneData.birth = dayjs(cloneData.birth)
      // 设置表单数据
      form.setFieldsValue(cloneData)
    }
  }

  // 提交
  const handleFinish = (e) => {
    // 数据是异步的，需要使用useEffect
    setListData({
      name: e.keyword,
    })
  }

  // 当数据发送变化时间请求数据
  useEffect(() => {
    getTableData()
  }, [listData])

  // 删除
  const handleDelete = ({ id }) => {
    delUser({ id }).then(() => {
      // 重新请求数据
      getTableData()
    })
  }

  // 请求用户列表数据
  const getTableData = () => {
    getUser(listData).then((res) => {
      console.log(res)
      setTableData(res.data.list)
    })
  }

  // 页面首次加载获取数据
  useEffect(() => {
    // 请求用户列表数据
    getTableData()
  }, [])

  // 弹窗确定
  const handleOk = () => {
    // 校验表单
    form
      .validateFields()
      .then((data) => {
        console.log(data)
        // 日期格式化
        data.birth = dayjs(data.birth).format('YYYY-MM-DD')

        if (modalType === '新增用户') {
          // 新增用户处理
          addUser(data).then(() => {
            // 关闭弹窗
            setModalShow(false)
            // 重新请求数据
            getTableData()
          })
        } else {
          // 编辑用户处理
          editUser(data).then(() => {
            // 关闭弹窗
            setModalShow(false)
            // 重新请求数据
            getTableData()
          })
        }
      })
      .catch((err) => {
        console.log(err)
        // 校验失败提示
        Modal.error({
          title: '校验失败',
          content: err.errorFields[0].errors[0],
        })
      })
  }

  // 弹窗取消
  const handleCancel = () => {
    // 清空表单
    form.resetFields()
    // 关闭弹窗
    setModalShow(false)
  }

  // 表格列配置
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (val) => {
        return val === 1 ? '男' : '女'
      },
    },
    {
      title: '出生日期',
      dataIndex: 'birth',
    },
    {
      title: '地址',
      dataIndex: 'addr',
    },
    {
      title: '操作',
      render: (rowData) => {
        return (
          <div className='flex-box'>
            <Button
              style={{
                marginRight: '5px',
              }}
              type='primary'
              onClick={() => handleClick('edit', rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title='确定删除吗?'
              description='删除后不可恢复'
              okText='确定'
              cancelText='取消'
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type='primary' danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return (
    <div className='user'>
      <div className='flex-box space-between'>
        <Button type='primary' onClick={() => handleClick('add')}>
          新增
        </Button>
        <Form layout='inline' onFinish={handleFinish}>
          <Form.Item name='keyword'>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        style={{ marginTop: '10px' }}
        columns={columns}
        dataSource={tableData}
        rowKey={'id'}
      />
      <Modal
        open={modalShow}
        title={modalType}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确定'
        cancelText='取消'
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign='left'
        >
          {/* 只有在编辑用户时才会有ID，用于传递后端，进行数据的查找 */}
          {modalType === '编辑用户' && (
            <Form.Item
              name='id'
              // 隐藏
              hidden
            >
              <Input placeholder='请输入ID' />
            </Form.Item>
          )}
          <Form.Item
            label='姓名'
            name='name'
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            label='年龄'
            name='age'
            rules={[
              {
                required: true,
                message: '请输入年龄',
              },
              {
                pattern: /^[0-9]*$/,
                message: '请输入数字',
              },
            ]}
          >
            <InputNumber placeholder='请输入年龄' />
          </Form.Item>
          <Form.Item
            label='性别'
            name='sex'
            rules={[
              {
                required: true,
                message: '请选择性别',
              },
            ]}
          >
            <Select placeholder='请选择性别'>
              <Select.Option value={0}>男</Select.Option>
              <Select.Option value={1}>女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='出生日期'
            name='birth'
            rules={[
              {
                required: true,
                message: '请选择出生日期',
              },
            ]}
          >
            <DatePicker placeholder='请选择出生日期' format='YYYY/MM/DD' />
          </Form.Item>
          <Form.Item
            label='地址'
            name='addr'
            rules={[
              {
                required: true,
                message: '请输入地址',
              },
            ]}
          >
            <Input placeholder='请输入地址' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
