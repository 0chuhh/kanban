import { InputBaseProps } from "@mui/material/InputBase";
import TextField from '@mui/material/TextField';
import { TextFieldProps, TextFieldVariants} from "@mui/material/TextField";
import React, {FC} from "react";


interface CustomInputProps  extends Omit<TextFieldProps, 'variant'>{
    required?: boolean,
    fullWidth?: boolean,
    maxLength?: number,
    variant?:TextFieldVariants,
}

const CustomInput:FC<CustomInputProps> = ({maxLength, variant = 'outlined',...restProps}) => {
  return (
    <TextField
      {...restProps}
      variant={variant}
      inputProps={{ maxLength: maxLength ? maxLength : 500, }}
    />
  );
}

export default React.memo(CustomInput);
