import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios'
import moment from 'moment'

export default function NewsPreview(props) {
    const [newsInfo, setNewsInfo] = useState(null)

    useEffect(() => {
        console.log(props.match.params.id)
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(
            res => {
                setNewsInfo(res.data)
            }
        )
    }, [props.match.params.id])

    const auditList = ["unaudited", "auditing", "pass audit", "unpass audit"]
    const publishList = ["unpublished", "To be published", "published", "Offlined"]

    return (
        <div>
            {
                newsInfo && <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={newsInfo.category.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="creator">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="created time">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                            <Descriptions.Item label="published time">{newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : '-'}</Descriptions.Item>

                            <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>

                            <Descriptions.Item label="Audit state"><span style={{ color: "red" }}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="Publish state"><span style={{ color: "red" }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>

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
