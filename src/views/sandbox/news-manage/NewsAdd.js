import React, { useEffect, useState, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select } from 'antd'
import style from './News.module.css'
import axios from 'axios'

const { Option } = Select

export default function NewsAdd() {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])

  const NewsForm = useRef(null)

  const handleNext = () => {
    if (current === 0) {
      NewsForm.current.validateFields().then(res => {
        console.log(res)
        setCurrent(current + 1)
      }).catch(error => {
        console.log(error)
      })
    }
    else {
      setCurrent(current + 1)
    }
  }

  const handlePrevious = () => {
    setCurrent(current - 1)
  }

  useEffect(() => {
    axios.get("/categories").then(res => {

      setCategoryList(res.data)
    })
  }, [])

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="New a News"
      />

      <Steps current={current}>
        <item title="Basic Information" description="Title and Sort" />
        <item title="Content" description="Main idea of news" />
        <item title="Submit" description="Save draft and submit" />
      </Steps>

      <div style={{ marginTop: "50px" }}>
        <div className={current === 0 ? '' : style.active}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            ref={NewsForm}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: 'Please input your category!' }]}
            >

              <Select>
                {
                  categoryList.map(item =>
                    <Option value={item.id} key={item.id}>{item.title}</Option>)
                }
              </Select>
            </Form.Item>

          </Form>

        </div>

        <div className={current === 1 ? '' : style.active}>Class
          <input type="text" />
        </div>

        <div className={current === 2 ? '' : style.active}>Content
          <input type="text" />
        </div>
      </div>

      {
        current === 2 && <span>
          <Button type="primary">Save to draft</Button>
          <Button>Submit to audit</Button>
        </span>
      }
      {
        current < 2 && <Button type="primary" onClick={handleNext}>Next step</Button>
      }
      {
        current > 0 && <Button onClick={handlePrevious}>Previous step</Button>
      }

    </div>
  )
}
