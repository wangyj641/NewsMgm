import React, { useState, useEffect } from 'react'
import { Button, Table, notification } from 'antd'
import axios from 'axios'

export default function Audit() {
  const [dataSource, setdataSource] = useState([])
  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    axios.get("/news?auditState=1&_expand=category").then(res => {
      const roleObj = {
        "1": "superadmin",
        "2": "admin",
        "3": "editor"
      }
      
      const list = res.data
      setdataSource(roleObj[roleId] === "superadmin" ? list : [
        ...list.filter(item => item.author === username),
        ...list.filter(item => item.region === region && roleObj[item.roleId] === "editor")]
      )
    })
  }, [roleId, username, region])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: 'Author',
      dataIndex: 'author'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => {
        return category.title
      }
    },
    {
      title: "Operation",
      render: (item) => {
        return <div>
          <Button type="primary" onClick={() => { handlePass(item.id) }}>Pass</Button>
          <Button danger onClick={() => { handleFail(item.id) }}>Fail</Button>
        </div>
      }
    }
  ];

  const handlePass = (id) => {
    setdataSource(dataSource.filter(data => data.id !== id))
    axios.patch(`/news/${id}`,
      { auditState: 2, publishState: 1 }).then(res => {
        notification.info({
          message: "Note",
          description: `You have pass audit this news`,
          placement: "bottomRight",
        })
      })
  }

  const handleFail = (id) => {
    setdataSource(dataSource.filter(data => data.id !== id))
    axios.patch(`/news/${id}`,
      { auditState: 3 }).then(res => {
        notification.info({
          message: "Note",
          description: `You have fail audit this news`,
          placement: "bottomRight",
        })
      })
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={item => item.id}
      />
    </div>
  )
}
