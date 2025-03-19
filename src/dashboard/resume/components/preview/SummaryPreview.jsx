import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <p>
       {resumeInfo?.summary}
    </p>
  )
}

export default SummaryPreview