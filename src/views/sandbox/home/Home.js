import React, { useEffect, useState, useRef } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Card, Col, Row, List, Avatar } from 'antd'
import * as Echarts from 'echarts'
import _ from 'lodash'

const { Meta } = Card

export default function Home() {
    const [viewList, setViewList] = useState([])
    const barRef = useRef()

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

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            //console.log(res.data)
            renderBarView(_.groupBy(res.data, item => item.category.title))
        })
    }, [])

    const renderBarView = (obj) => {
        console.log(obj)
        // 基于准备好的dom，初始化echarts实例
        var myChart = Echarts.init(barRef.current)

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'News Category Chart'
            },
            tooltip: {},
            legend: {
                data: ['Count']
            },
            xAxis: {
                data: Object.keys(obj)
            },
            yAxis: {},
            series: [
                {
                    name: 'Count',
                    type: 'bar',
                    data: Object.values(obj).map(item => item.length)
                }
            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

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

            <div ref={barRef} style={{
                height: "400px",
                width: "100%",
                marginTop: "40px"
            }}></div>
        </div>
    )
}
