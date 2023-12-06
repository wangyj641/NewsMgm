import React, { useEffect, useState, useRef } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd'
import * as Echarts from 'echarts'
import _ from 'lodash'

const { Meta } = Card

export default function Home() {
    const [viewList, setViewList] = useState([])
    const [starList, setStarList] = useState([])
    const [allList, setAllList] = useState([])
    const [pieChart, setPieChart] = useState(null)
    const [open, setOpen] = useState(false)

    const barRef = useRef()
    const pieRef = useRef()

    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(
            res => {
                console.log(res.data)
                setViewList(res.data)
            }
        )
    }, [])

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
            console.log(res.data)
            renderBarView(_.groupBy(res.data, item => item.category.title))
            setAllList(res.data)
        })

        return () => {
            console.log('exit this page')
            window.onresize = null
        }
    }, [])

    const renderBarView = (obj) => {
        //console.log(obj)
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
                data: Object.keys(obj),
                axisLabel: {
                    rotate: "45",
                    interval: 0
                }
            },
            yAxis: {
                minInterval: 1
            },
            series: [
                {
                    name: 'Count',
                    type: 'bar',
                    data: Object.values(obj).map(item => item.length)
                }
            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)

        window.onresize = () => {
            console.log("resize")
            myChart.resize()
        }
    }

    const renderPieView = () => {
        var currentList = allList.filter(item => item.author === username)
        console.log(currentList)
        var groupObj = _.groupBy(currentList, item => item.category.title)
        console.log(groupObj)

        var list = []
        for (var i in groupObj) {
            list.push({
                name: i,
                value: groupObj[i].length
            })
        }
        console.log(list)

        var myChart

        if (!pieChart) {
            console.log('init echarts')
            myChart = Echarts.init(pieRef.current)
            setPieChart(myChart)
        } else {
            myChart = pieChart
        }

        var option;

        option = {
            title: {
                text: `${username} Personal News Statist`,
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: list,

                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        option && myChart.setOption(option)
    }

    const showDrawer = () => {
        setTimeout(() => {
            setOpen(true);
            renderPieView()
        }, 0)
    };

    const onClose = () => {
        console.log('close')
        setOpen(false);
    };

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
                            <SettingOutlined key="setting" onClick={showDrawer} />,
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

            <Drawer title="Personal News Detail"
                placement="right"
                width="700px"
                onClose={onClose}
                open={open}>
                <div ref={pieRef} style={{
                    height: "400px",
                    width: "100%",
                    marginTop: "40px"
                }}></div>
            </Drawer>

            <div ref={barRef} style={{
                height: "400px",
                width: "100%",
                marginTop: "40px"
            }}></div>
        </div>
    )
}
