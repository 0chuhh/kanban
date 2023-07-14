import React, { FC } from "react";
import { Box, Drawer, DrawerProps } from "@mui/material";
interface CustomDrawerProps extends DrawerProps{
  width?:string
}
const CustomDrawer: FC<CustomDrawerProps> = ({
  children,
  width,
  anchor = "right",
  ...restProps
}) => {
  return (
    <Drawer
      {...restProps}
      anchor={anchor}
      sx={{
        width:width,
        ...restProps.sx
      }}
      classes={{
        paper: "drawer",
        ...restProps.classes,
      }}
    >
      <Box sx={{ width:width, height: "100%", p: 3, boxSizing: "border-box" }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
