import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, List } from 'antd';
import axios from 'axios'
import _ from 'lodash'

export default function News() {

    const [list, setList] = useState([])

    useEffect(() => {
        axios('/news?publishState=2&_expand=category').then(res => {
            console.log(res.data)
            var obj = _.groupBy(res.data, item => item.category.title)
            console.log(obj)
            setList(Object.entries(obj))
            //console.log(list)
        })
    }, [])

    return (
        <div>
            <PageHeader
                title='World News'
                subTitle='What is happening now?'
            >
            </PageHeader>
            <div className='site-card-wrapper'>
                <Row gutter={[16, 16]}>
                    {
                        list.map(item =>
                            <Col span={8}>
                                <Card title={item[0]} bordered={true} hoverable={true}>
                                    <List
                                        size="small"
                                        pagination={
                                            {
                                                pageSize: 3
                                            }
                                        }
                                        dataSource={item[1]}
                                        renderItem={(data) => <List.Item>
                                            <a href={`#/detail/${data.id}`}>
                                                {data.title}
                                            </a>
                                        </List.Item>}
                                    />
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </div>
        </div>
    )
}
