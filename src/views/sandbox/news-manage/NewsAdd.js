import React, {useState} from 'react'
import { Button, PageHeader, Steps } from 'antd'

const { Step } = Steps
const description = 'This is a description.';

export default function NewsAdd() {
  const [current, setCurrent] = useState(0)

  const handleNext = () =>{
    setCurrent(current + 1)
  }

  const handlePrevious = () =>{
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

      <div>111
      </div>

      <div>222</div>
      <div>333</div>

      <div style={{marginTop: "50px"}}>
      
        {
          current ===2 && <span>
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
