import React from 'react'
import './label.css'

const Label = ({label}) => {

  const getTextColor = () => {
    const hex = parseInt(label.color, 16);
    if (hex > 0xCCCCCC / 2) {
      return '#000';
    }
    return '#fff'
  }

  const style = () => {
    return {
      backgroundColor: `#${label.color}`,
      color: getTextColor(),
    }
  }

  getTextColor();
  
  return (
    <div className= 'label' style={ style() }>
      <span> { label.name } </span>
      
    </div>
  )
}

export default Label;