import React, {FC} from 'react'

type GapVariantType = 'vertical' | 'horizontal'

interface GapProps {
  gap?:number,
  variant?:GapVariantType
}

const Gap:FC<GapProps> = ({gap=10, variant='vertical'}) => {
  return (
    <div style={{
      width:variant === 'horizontal' ? gap+'px':0,
      height:variant === 'vertical' ? gap+'px':0,
    }}></div>
  )
}

export default Gap