import { Button, Paper, Typography } from "@mui/material";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signInUser } from "store/reducers/user/ActionAuth";

function Login() {
    const {user,error} = useAppSelector(state=>state.userReducer)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState<string>("admin");
  const [password, setPassword] = useState<string>("admin");

  const signIn: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(signInUser(login, password))
  };

  useEffect(()=>{
    if(user) navigate("/");
  },[user])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          minHeight: "250px",
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Typography variant={"h5"}>Авторизация</Typography>
        
        <form onSubmit={signIn} style={{
          display: "flex",
          width:'100%',
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}>
            <CustomInput
          fullWidth
          required
          label="Имя пользователя"
          error={error.length>0}
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
          <CustomInput
            required
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            error={error.length>0}
            helperText={error.length>0 && 'Логин или пароль введены неверны'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained">
            Авторизоваться
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
