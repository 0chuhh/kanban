import React, { FC } from 'react'
import { Box, Drawer, DrawerProps } from "@mui/material";


const CustomDrawer:FC<Omit<DrawerProps, 'anchor'>> = ({children, ...restProps}) => {
  return (
    <Drawer
        {...restProps}
        anchor="right"
        classes={{
          paper:'drawer',
          ...restProps.classes
        }}
      >
        <Box sx={{width:450, }}>
          {children}
        </Box>
    </Drawer>
  )
}

export default CustomDrawer