import React, { useEffect, useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Card, Col, Row, List, Avatar } from 'antd'

const { Meta } = Card

export default function Home() {
    const [viewList, setViewList] = useState([])

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(
            res => {
                console.log(res.data)
                setViewList(res.data)
            }
        )
    }, [])

    const [starList, setStarList] = useState([])

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(
            res => {
                console.log(res.data)
                setStarList(res.data)
            }
        )
    }, [])


    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token"))
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Frequently view" bordered={true}>
                        <List
                            dataSource={viewList}
                            renderItem={(item) => (
                                <List.Item>
                                    <a href={`/#/news-manage/preview/${item.id}`}>
                                        {item.title}
                                    </a>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Most favourite" bordered={true}>
                        <List
                            dataSource={starList}
                            renderItem={(item) => (
                                <List.Item>
                                    <a href={`/#/news-manage/preview/${item.id}`}>
                                        {item.title}
                                    </a>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={username}
                            description={
                                <div>
                                    <b>{region ? region : "Global"}</b>
                                    <span style={{
                                        paddingLeft: "30px"
                                    }}>{roleName}</span>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
