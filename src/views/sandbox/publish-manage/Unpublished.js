import React from 'react'
import { Button } from 'antd'
import usePublish from '../../../components/publish-manage/usePublish'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

export default function Unpublished() {
  const { dataSource, handlePublish } = usePublish(1)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id) => <Button onClick={() => handlePublish(id)}>Publish</Button>}></NewsPublish>
    </div>
  )
}
