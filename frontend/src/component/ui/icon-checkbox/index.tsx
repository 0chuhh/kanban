import React, { FC } from 'react'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

interface IconCheckboxProps extends CheckboxProps{
    icon:React.ReactNode
}
const IconCheckbox:FC<IconCheckboxProps> = ({icon, ...restProps}) => {
  return (
    <Checkbox style={{
      padding:'1px',...restProps.style
    }} {...restProps} icon={icon}/>
  )
}

export default IconCheckbox