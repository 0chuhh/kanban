import React, { FC, PropsWithChildren } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

interface CustomSelectProps extends SelectProps, PropsWithChildren {
  label?: string;
  id?:string;
  fullWidth?:boolean
}

const CustomSelect: FC<CustomSelectProps> = ({id, label, fullWidth, children, ...restProps }) => {
   
  return (
    <FormControl id={id} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...restProps}
        label={label}
        id={id}
        fullWidth={fullWidth}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default React.memo(CustomSelect);
