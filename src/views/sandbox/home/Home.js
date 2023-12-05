import React from 'react'
// import axios from 'axios'
import { Card, Col, Row, List } from 'antd'

const { Meta } = Card

export default function Home() {

    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card title="Frequently view" bordered={true}>
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>{item}</List.Item>
                        )}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Most favourite" bordered={true}>
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>{item}</List.Item>
                        )}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Card title" bordered={true}
                    hoverable
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Col>
        </Row>
    )
}
