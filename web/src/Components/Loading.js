import React from 'react'
import {
  Progress
} from "@chakra-ui/react"

function Loading(props) {
  console.log(props)
  return (
    <div className="container">
     <div className="loading-container">
      <h1>Uploading...</h1>
      <Progress size = "md" hasStripe value={props.progress} />
    </div>
    </div>
   
  )
}

export default Loading
