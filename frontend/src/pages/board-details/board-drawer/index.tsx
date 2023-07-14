import { IconButton, Toolbar } from "@mui/material";
import CustomDrawer from "component/ui/custom-drawer";
import useWindowSize from "hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
const BoardDrawer = () => {
  const size = useWindowSize();
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    console.log(size, size.width > 992);
  }, [size]);
  return (
    <>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: "absolute",
          zIndex: 1500,
          top: "65px",
          left: "5px",
          transform:open?'':'rotate(180deg)',
          transition:'all .5s ease'
        }}
      >
        <ArrowBackIosRoundedIcon htmlColor="#fff" />
      </IconButton>

      <CustomDrawer
        width={open?"340px":'0'}
        anchor="left"
        variant={size.width > 992 ? "persistent" : "temporary"}
        open={open}
      >
        <Toolbar />
      </CustomDrawer>
    </>
  );
};

export default BoardDrawer;
