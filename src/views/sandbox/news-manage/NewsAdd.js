import React, { useState } from 'react'
import { Button, PageHeader, Steps } from 'antd'
import style from './News.module.css'

const { Step } = Steps

export default function NewsAdd() {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent(current + 1)
  }

  const handlePrevious = () => {
    setCurrent(current - 1)
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="New a News"
      />

      <Steps current={current}>
        <Step title="Basic Information" description="Title and Sort" />
        <Step title="Content" description="Main idea of news" />
        <Step title="Submit" description="Save draft and submit" />
      </Steps>

      <div className={current === 0 ? '' : style.active}>1111
        <input type="text" />
      </div>

      <div className={current === 1 ? '' : style.active}>2222
        <input type="text" />
      </div>

      <div className={current === 2 ? '' : style.active}>3333
        <input type="text" />
      </div>

      <div style={{ marginTop: "50px" }}>

        {
          current === 2 && <span>
            <Button type="primary">Save to draft</Button>
            <Button>Submit to audit</Button>
          </span>
        }
        {
          current < 2 && <Button type="primary" onClick={handleNext}>Next step</Button>
        }
        {
          current > 0 && <Button onClick={handlePrevious}>Previous step</Button>
        }
      </div>
    </div>
  )
}
