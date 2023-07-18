import {
  Autocomplete,
  AutocompleteProps,
  ChipTypeMap,
  TextField,
} from "@mui/material";
import React, { FC } from "react";

interface CustomAutocompleteProps {
  options: any;
  inputValue: any;
  onChange: (newValue: any) => void;
  optionLabel?: string;
}

const CustomAutocomplete: FC<CustomAutocompleteProps> = ({
  options,
  inputValue: value,
  onChange,
  optionLabel,
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      freeSolo
      inputValue={value}
      onInputChange={(event, value) => onChange(value)}
      renderInput={(params) => (
        <TextField {...params} label="controlled" variant="standard" />
      )}
    />
  );
};

export default CustomAutocomplete;
