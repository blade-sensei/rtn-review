import React from 'react'
import './label.css'

const Label = ({label}) => {
  
  return (
    <div className='c-label'>
      <span className='label'> { label.name } </span>
      
    </div>
  )
}

export default Label;