import React from 'react'
import './RowSelectionTip.scss'

interface RowSelectionTipProps {
  text?: string
}

const RowSelectionTip: React.FC<RowSelectionTipProps> = ({
  text = 'Выберите нужный состав в таблице выше',
}) => {
  return (
    <div className="row-selection-tip">
      <p>{text}</p>
    </div>
  )
}

export default RowSelectionTip
