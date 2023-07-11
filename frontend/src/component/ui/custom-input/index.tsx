import { InputBaseProps } from "@mui/material/InputBase";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { TextFieldProps, TextFieldVariants} from "@mui/material/TextField";
import React, {FC} from "react";


const CssTextField = styled(TextField)({
  '& label':{
    color:'#000'
  },
  '& label.Mui-focused': {
    color: '#000',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color:'#000',
      borderColor: '#000',

    },
    '&:hover fieldset': {
      color:'#000',
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
    },
    '.MuiInputBase-root..Mui-focused':{
      backgroundColor:'transparent !important'
    }
  },
});

interface CustomInputProps  extends Omit<TextFieldProps, 'variant'>{
    required?: boolean,
    fullWidth?: boolean,
    maxLength?: number,
    variant?:TextFieldVariants,
}

const CustomInput:FC<CustomInputProps> = ({maxLength, variant = 'outlined',...restProps}) => {
  return (
    <CssTextField
      {...restProps}
      variant={variant}
      style={{
        color: "#fff",
      }}
      
      
      inputProps={{ maxLength: maxLength ? maxLength : 500, }}
    />
  );
}

export default React.memo(CustomInput);
