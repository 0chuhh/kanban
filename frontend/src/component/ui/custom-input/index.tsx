import { InputBaseProps } from "@mui/material/InputBase";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { TextFieldProps, TextFieldVariants} from "@mui/material/TextField";
import React, {FC} from "react";


const CssTextField = styled(TextField)({
  '& label':{
    color:'#fff'
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color:'#fff',
      borderColor: '#000',

    },
    '&:hover fieldset': {
      color:'#fff',
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
    theme?:'dark'|'light'
}

const CustomInput:FC<CustomInputProps> = ({theme, maxLength, variant = 'outlined',...restProps}) => {
  return (
    <CssTextField
      {...restProps}
      variant={variant}
      style={{
        color: "#fff",
      }}
      
      InputProps={{style:{color:'fff'}}}
      inputProps={{ maxLength: maxLength ? maxLength : 500, style:{color:'#fff'} }}
    />
  );
}

export default React.memo(CustomInput);
