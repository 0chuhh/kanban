import { Avatar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import CustomDrawer from "component/ui/custom-drawer";
import useWindowSize from "hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useParams } from "react-router";
import { IBoard } from "models/IBoard";
import api from "services/api";
import Gap from "component/ui/gap";
import InviteUserModal from "./invite-user-modal";

const BoardDrawer = () => {
  const id = useParams<string>().id;
  const size = useWindowSize();
  const [open, setOpen] = useState<boolean>(true);
  const [openChooseMember, setOpenChooseMember] = useState<boolean>(true);
  const [board, setBoard] = useState<IBoard>();

  const getBoard = async () => {
    const board: IBoard = await api.boards.getBoardById(Number(id));
    setBoard(board);
  };
  useEffect(() => {
    if (size.width && size.width < 992) {
      console.log(size, size.width < 992);
      setOpen(false);
    }
  }, [size]);

  useEffect(() => {
    getBoard();
  }, [id]);
  return (
    <>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: "absolute",
          zIndex: 1300,
          top: "65px",
          left: "5px",
          transform: open ? "" : "rotate(180deg)",
          transition: "all .5s ease",
        }}
      >
        <ArrowBackIosRoundedIcon htmlColor="#fff" />
      </IconButton>
      <InviteUserModal
        open={openChooseMember}
        handleClose={() => setOpenChooseMember(false)}
      />
      <CustomDrawer
        width={open ? "340px" : "0px"}
        anchor="left"
        variant={size.width > 992 ? "persistent" : "temporary"}
        open={open}
      >
        <Toolbar />
        <Gap />
        <Typography color={"#fff"} variant="h5">
          {board?.title}
        </Typography>
        <Gap />
        <Typography
          style={{ minWidth: "290px" }}
          color={"#fff"}
          align="justify"
          variant="body1"
        >
          {board?.description}
        </Typography>
        <Gap />
        <Typography color={"#fff"} align="justify" variant="h6">
          Участники:
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          {board?.members.map((member) => (
            <Avatar
              key={"member" + member.user.userId}
              className="members-avatar"
            >
              {member.user?.lastname[0]?.toUpperCase()}
              {member.user?.firstname[0]?.toUpperCase()}
            </Avatar>
          ))}
        </div>
        <Gap />
        <Button
          onClick={() => setOpenChooseMember(true)}
          variant="contained"
          fullWidth
        >
          Добавить участника
        </Button>
      </CustomDrawer>
    </>
  );
};

export default BoardDrawer;
