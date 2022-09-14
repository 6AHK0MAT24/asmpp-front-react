import React from 'react'
import './ContentTemplate.scss'

interface ContentTemplateProps {
  children: React.ReactElement
}

const ContentTemplate: React.FC<ContentTemplateProps> = ({ children }) => {
  return <div className="content-template">{children}</div>
}

export default ContentTemplate
