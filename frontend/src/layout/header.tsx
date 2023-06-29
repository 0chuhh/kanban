import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo.png";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getUser, logOutUser } from "store/reducers/user/ActionAuth";
import { IsAuthentificted } from "services/isAuthentificated";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


function Header() {
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  useEffect(() => {
    if (IsAuthentificted()) dispatch(getUser());
  }, []);

  useEffect(() => {
    handleCloseNavMenu();
    handleCloseUserMenu();
  }, [user]);

  if (user)
    return (
      <AppBar position="fixed" style={{ backgroundColor: "#252525" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1,  }}>
            <img src={logo} style={{ maxWidth: "200px" }} />
            </Box>
            
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 2 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={"http://localhost:8000" + user.avatar}
                  />
                  <Typography sx={{display: { xs: "none", md: "flex" }}} color={"white"}>{user.fullname}</Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={logOut}>
                  <Typography textAlign="center">Выйти</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  return <></>;
}

export default Header;
