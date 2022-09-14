import React, { useEffect, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { Button, Tooltip } from 'antd'
import './NavElement.scss'

interface NavElementProps {
  title: string
  path: string
  content: React.ReactElement
}

const NavElement: React.FC<NavElementProps> = ({ title, path, content }) => {
  const isMatch = useMatch(path)
  const [active, setActive] = useState(false)

  useEffect(() => {
    isMatch ? setActive(true) : setActive(false)
  }, [isMatch, path])
  return (
    <Tooltip title={title} placement={'right'}>
      <Link
        to={path}
        className={active ? 'nav-element nav-element_active' : 'nav-element'}
      >
        <Button icon={content} size={'large'} />
      </Link>
    </Tooltip>
  )
}

export default NavElement
