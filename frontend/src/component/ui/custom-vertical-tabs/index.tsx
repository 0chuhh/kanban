import React, { FC, PropsWithChildren, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";


interface TabPanelProps
  extends PropsWithChildren,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  index: number;
  value: number;
}

export const TabPanel: FC<TabPanelProps> = React.memo(
  ({ index, value, children, ...restProps }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        style={{
          width: "100%",
          height: "100%",
        }}
        {...restProps}
      >
        <Box
          sx={{
            p: 3,
            height: "100%",
            flexGrow: 1,
            gap: "20px",
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </div>
    );
  }
);

export interface TabsVerticalProps extends PropsWithChildren {
  value?: number;
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

export const TabsVertical: FC<TabsVerticalProps> = React.memo(
  ({ value, handleChange, children }) => {
    return (
      <Tabs
        orientation="vertical"
        variant="scrollable"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#f90",
            
          },
        }}
        value={value}
        style={{
          width:'100%',
          backgroundColor: "#252525",
          color: "white",
          backgroundClip: "border-box",
          transition: "all 0.5s ease",
          maxWidth: "250px",
          boxSizing: "border-box",
          padding: "0 10px",
        }}
        textColor="secondary"
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {children}
      </Tabs>
    );
  }
);

export function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}


export const CustomVerticalTabs: FC<PropsWithChildren> = React.memo(({
  children,
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent:'space-between',
        alignItems:'center',
        height: "70vh",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px lightgray",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
});
