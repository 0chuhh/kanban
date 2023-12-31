import {
  Autocomplete,
  createFilterOptions,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import { useSearchableList } from "hooks/useSearchableList";
import { IUser } from "models/IUser";
import React, { FC, useEffect, useState } from "react";
import api from "services/api";
import { parseAvatarUrl } from "services/parseUrlAvatar";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface SearchUserProps{
  onSelectUser:(user:IUser | IUser[])=>void;
  selectedUsers?:IUser[] | IUser,
  labelColor?:string;
  multiple?:boolean;
  maxWidth?:string;
  filterFunc?: (list:IUser[])=>IUser[];
}

const SearchUser:FC<SearchUserProps> = ({onSelectUser, selectedUsers, labelColor, multiple=false, maxWidth, filterFunc}) => {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<IUser|IUser[]>()
  const [users, loading] = useSearchableList<IUser>(
    value,
    api.auth.searchUser,
    [],
    filterFunc
  );

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: IUser) => option.fullname + option.username,
  });

  const handleChangeValue = (newValue: any) => {
    setValue(newValue);
  };


  useEffect(()=>{
    if(selectedUsers){
      setSelectedValue(selectedUsers)
    }
  },[selectedUsers])
  return (
    <div>
      <Typography color={labelColor}>Поиск пользователей</Typography>
      <Gap />
      <Autocomplete
        disableClearable
        multiple={multiple}
        fullWidth
        noOptionsText={"Не найдено"}
        loading={loading}
        inputValue={value}
        onChange={(e,option)=>option && onSelectUser(option)}
        filterOptions={filterOptions}
        isOptionEqualToValue={(option, value) => value.userId === option.userId}
        getOptionLabel={(option) => {
          if (multiple && option.fullname.length > 0) return option.fullname;
          return option.username;
        }}
        onInputChange={(e, value) => handleChangeValue(value)}
        renderOption={(props, option: IUser) => (
          <li {...props}>
            <Avatar
              key={"user" + option.userId}
              src={parseAvatarUrl(option?.avatar)}
              className="members-avatar"
            >
              {option?.lastname[0]?.toUpperCase()}
              {option?.firstname[0]?.toUpperCase()}
            </Avatar>
            <Gap variant="horizontal" />
            {option.fullname}&nbsp;-&nbsp;{option.username}
          </li>
        )}
        value={selectedValue}
        options={users}
        renderInput={(params) => {
          return <CustomInput maxWidth={maxWidth} {...params} placeholder="Найти..." />;
        }}
        renderTags={(value: readonly IUser[], getTagProps) =>
          value.map((option: IUser, index: number) => (
            <Chip variant="outlined" deleteIcon={<HighlightOffIcon style={{
              color:'#fff'
            }} htmlColor="red"/>} style={{color:'#fff'}} label={option.username} {...getTagProps({ index })} />
          ))
        }
      />
      <Gap />
    </div>
  );
};

export default SearchUser;
