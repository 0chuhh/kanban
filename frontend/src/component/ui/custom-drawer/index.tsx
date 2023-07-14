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
        <Box sx={{height:'100%', p:3, boxSizing:'border-box'}}>{children}
        </Box>
    </Drawer>
  )
}

export default CustomDrawer