import React from 'react'
import usePublish from '../../../components/publish-manage/usePublish'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

export default function Published() {
  const { dataSource } = usePublish(2)

  return (
    <div>
      <NewsPublish dataSource={dataSource}></NewsPublish>
    </div>
  )
}
