import React from 'react'
import usePublish from '../../../components/publish-manage/usePublish'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

export default function Sunset() {
  const { dataSource } = usePublish(3)

  return (
    <div>
      <NewsPublish dataSource={dataSource}></NewsPublish>
    </div>
  )
}
