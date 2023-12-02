import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table, Tag, notification } from 'antd'

const { username } = JSON.parse(localStorage.getItem("token"))

export default function AuditList(props) {
  const [dataSource, setdataSource] = useState([])

  useEffect(() => {
    axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(
      res => {
        console.log(res.data)
        setdataSource(res.data)

      }
    )
  }, [])

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
      title: 'Audit State',
      dataIndex: 'auditState',
      render: (auditState) => {
        const colorList = ['', 'orange', 'green', 'red']
        const auditList = ['draft box', 'auditing', 'audited', 'fail to audit']
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: "Operation",
      render: (item) => {
        return <div>
          {
            item.auditState === 1 && <Button onClick={() => { handleRevert(item.id) }}>Withdraw</Button>
          }
          {
            item.auditState === 2 && <Button danger onClick={() => { handlePublish(item.id) }}>Publish</Button>
          }
          {
            item.auditState === 3 && <Button type="primary" onClick={() => { handleRevise(item.id) }}>Revise</Button>
          }
        </div>
      }
    }
  ];

  const handleRevert = (id) => {
    setdataSource(dataSource.filter(data => data.id !== id))
    axios.patch(`/news/${id}`,
      { auditState: 0 }).then(res => {
        notification.info({
          message: "Note",
          description: `You have withdraw this item`,
          placement: "bottomRight",
        })
      })
  }

  const handleRevise = (id) => {
    props.history.push(`/news-manage/update/${id}`)
  }

  const handlePublish = (id) => {
    setdataSource(dataSource.filter(data => data.id !== id))
    axios.patch(`/news/${id}`,
      { publishState: 2 }).then(res => {
        props.history.push('/publish-manage/published')

        notification.info({
          message: "Note",
          description: `You have published this news`,
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
