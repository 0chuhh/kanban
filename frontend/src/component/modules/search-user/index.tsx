import {
  Autocomplete,
  createFilterOptions,
  Avatar,
  Typography,
} from "@mui/material";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import { useSearchableList } from "hooks/useSearchableList";
import { IUser } from "models/IUser";
import React, { FC, useState } from "react";
import api from "services/api";
import { parseAvatarUrl } from "services/parseUrlAvatar";

interface SearchUserProps{
  onSelectUser:(user:IUser)=>void
}

const SearchUser:FC<SearchUserProps> = ({onSelectUser}) => {
  const [value, setValue] = useState("");

  const [users, loading] = useSearchableList<IUser>(
    value,
    api.auth.searchUser,
    []
  );

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: IUser) => option.fullname + option.username,
  });

  const handleChangeValue = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography>Поиск пользователей</Typography>
      <Gap />
      <Autocomplete
        fullWidth
        noOptionsText={"Не найдено"}
        loading={loading}
        inputValue={value}
        onChange={(e,option)=>option && onSelectUser(option)}
        filterOptions={filterOptions}
        isOptionEqualToValue={(option, value) => value.userId === option.userId}
        getOptionLabel={(option) => {
          if (option.fullname.length > 0) return option.fullname;
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
        options={users}
        renderInput={(params) => {
          return <CustomInput {...params} placeholder="Найти..." />;
        }}
      />
      <Gap />
    </div>
  );
};

export default SearchUser;
