import { Avatar, CircularProgress, Typography } from "@mui/material";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import { useDebounce } from "hooks/useDebounce";
import { IUser } from "models/IUser";
import React, { useEffect, useState } from "react";
import api from "services/api";

const SearchUser = () => {
  const [value, setValue] = useState<string>(" ");
  const [users, setUsers] = useState<IUser[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const debouncedValue = useDebounce(value, 500);

  const handleChangeValue: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setUsers([]);
    setValue(event.target.value);
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
    setLoading(false);
  };

  const parseAvatarUrl = (url?: string) => {
    return url?.slice(15);
  };

  useEffect(() => {
    searchUsers();
    console.log('serch')
  }, [debouncedValue]);
  return (
    <>
      <Typography>Поиск пользователей</Typography>
      <Gap />
      <CustomInput
        value={value}
        onChange={handleChangeValue}
        placeholder="Найти..."
        fullWidth
      />
      <Gap />
      <div className="users-list h-center v-center d-column" style={{gap:'10px', maxHeight:'350px', overflowY:!loading?'auto':'hidden'}}>
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
      </div>
    </>
  );
};

export default SearchUser;
