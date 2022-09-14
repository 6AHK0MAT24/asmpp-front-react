import React from 'react'
import { Spin } from 'antd'
import './Loading.scss'

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <Spin />
    </div>
  )
}

export default Loading
