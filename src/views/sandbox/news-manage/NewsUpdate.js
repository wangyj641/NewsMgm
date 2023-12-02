import React, { useEffect, useState, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from 'axios'
import NewsEditor from '../../../components/news-manage/NewsEditor'

const { Option } = Select

export default function NewsUpdate(props) {
    const [current, setCurrent] = useState(0)
    const [categoryList, setCategoryList] = useState([])
    const [formInfo, setFormInfo] = useState({})
    const [content, setContent] = useState({})
    const [newsInfo, setNewsInfo] = useState({})

    const handleNext = () => {
        if (current === 0) {
            NewsForm.current.validateFields().then(res => {
                console.log(res)
                setFormInfo(res)
                setCurrent(current + 1)
            }).catch(error => {
                console.log(error)
            })
        }
        else {
            console.log(formInfo)
            console.log(content)
            if (content === "" || content.trim === "<p></p>") {
                message.error("Content is empty, please input the text")
            } else {
                setCurrent(current + 1)
            }
        }
    }

    const handlePrevious = () => {
        setCurrent(current - 1)
    }

    const handleSave = (auditState) => {
        axios.post("/news", {
            ...formInfo,
            "content": content,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
        }).then(res => {
            props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')

            notification.info({
                message: "Note",
                description: `You can check your ${auditState === 0 ? 'draft' : 'audit'} box`,
                placement: "bottomRight",
            })
        })
    }

    const NewsForm = useRef(null)

    useEffect(() => {
        axios.get("/categories").then(res => {

            setCategoryList(res.data)
        })
    }, [])

    useEffect(() => {
        //console.log(props.match.params.id)
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(
            res => {
                console.log(res.data)
                let { title, categoryId, content } = res.data
                console.log(title, categoryId, content)
                console.log(NewsForm.current)
                NewsForm.current.setFieldsValue({
                    title,
                    categoryId
                })
                //setContent(content)
                setNewsInfo(res.data)
            }
        )
    }, [props.match.params.id])

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Update a News"
                onBack={() => props.history.goBack()}
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

                <div className={current === 1 ? '' : style.active}>
                    <NewsEditor getContent={(value) => { setContent(value) }} content={newsInfo.content}></NewsEditor>
                </div>

                <div className={current === 2 ? '' : style.active}>
                </div>
            </div>

            {
                current === 2 && <span>
                    <Button type="primary" onClick={() => handleSave(0)}>Save to draft</Button>
                    <Button onClick={() => handleSave(1)}>Submit to audit</Button>
                </span>
            }
            {
                current < 2 && <Button type="primary" onClick={handleNext}>Next step</Button>
            }
            {
                current > 0 && <Button onClick={handlePrevious}>Previous step</Button>
            }

        </div >
    )
}
