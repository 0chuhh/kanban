import { Autocomplete, Avatar, CircularProgress, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "component/ui/custom-autocolplete";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import { useDebounce } from "hooks/useDebounce";
import { IUser } from "models/IUser";
import React, { useEffect, useState } from "react";
import api from "services/api";

const SearchUser = () => {
  const [value, setValue] = useState('ad');
  const [users, setUsers] = useState<IUser[]>([]);

  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(value, 500);

  const handleChangeValue = (
    newValue:any
  ) => {
    setLoading(true)

    setValue(newValue);
  };

  const searchUsers = async () => {
    const searchableValue = `${value[0]?.toUpperCase()}${value?.slice(1)}`
    if(value !== undefined){
        const usersList: IUser[] = await api.auth.searchUser(searchableValue);
        setUsers(usersList);
    }else{
        const usersList: IUser[] = await api.auth.searchUser(' ');
        setUsers(usersList);
    }
    setLoading(false)
  };

  const parseAvatarUrl = (url?: string) => {
    return url?.slice(15);
  };

  useEffect(() => {
    searchUsers()
    console.log('serch')
  }, [debouncedValue]);

  
  return (
    <>
      <Typography>Поиск пользователей</Typography>
      <Gap />
      <Autocomplete
      noOptionsText={'Не найдено'}
      loading={loading}
        inputValue={value}
        isOptionEqualToValue={(option, value)=>value.userId === option.userId}
        getOptionLabel={(option)=>{
          if(option.firstname.length>0 || option.lastname.length>0)return option.fullname
          return option.username 
        }}
        onInputChange={(e,value)=>handleChangeValue(value)}
        options={users} renderInput={(params) => (
          <TextField {...params} label="controlled" variant="standard" />
        )}    />
      <Gap />
      {/* <div className="users-list h-center v-center d-column" style={{gap:'10px', maxHeight:'350px', overflowY:!loading?'auto':'hidden'}}>
        {users.length <= 0 && !loading && "Ничего не найдено"}
        {loading && <CircularProgress />}
        {users.length > 0 &&
          users.map((user) => (
            <div key={"user" + user.userId} className="user w-100">
              <div className="v-center w-100">
              <Avatar  className="members-avatar" src={parseAvatarUrl(user?.avatar)}>
                {user?.lastname[0]?.toUpperCase()}
                {user?.firstname[0]?.toUpperCase()}
                {user.fullname.length<=1 && user?.username[0]?.toUpperCase()}
              </Avatar>
              <Gap variant="horizontal"/>
              
                {user.fullname && <Typography>{user?.fullname}</Typography>}
                {user.fullname.length<=1 && <Typography>{user?.username}</Typography>}
              </div>
            </div>
          ))}
      </div> */}
    </>
  );
};

export default SearchUser;
