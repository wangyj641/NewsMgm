import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios'
import moment from 'moment'
import { HeartTwoTone } from '@ant-design/icons'

export default function Detail(props) {
    const [newsInfo, setNewsInfo] = useState(null)

    useEffect(() => {
        console.log(props.match.params.id)
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(
            res => {
                setNewsInfo({ ...res.data, view: res.data.view + 1 })
                return res.data
            }
        ).then(res => {
            axios.patch(`/news/${props.match.params.id}`, { view: res.view + 1 })
        })
    }, [props.match.params.id])

    const handleStar = () => {
        console.log('handleStar')
        setNewsInfo({ ...newsInfo, star: newsInfo.star + 1 })
        axios.patch(`/news/${props.match.params.id}`, { star: newsInfo.star + 1 })
    }

    return (
        <div>
            {
                newsInfo && <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={
                            <div>
                                {newsInfo.category.title}
                                <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStar()} />
                            </div>
                        }
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="creator">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="published time">{newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : '-'}</Descriptions.Item>
                            <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="Visit times">{newsInfo.view}</Descriptions.Item>
                            <Descriptions.Item label="Vote count">{newsInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="Remark count">0</Descriptions.Item>
                        </Descriptions>
                    </PageHeader>

                    <div dangerouslySetInnerHTML={{ __html: newsInfo.content }}
                        style={{
                            margin: "0 24px",
                            border: "1px solid gray"
                        }}>
                    </div>

                </div>
            }
        </div>
    )
}
