import { Button, Typography } from "@mui/material";
import SearchUser from "component/modules/search-user";
import CustomModal from "component/ui/custom-modal";
import { IUser } from "models/IUser";
import React, { FC, useState } from "react";
interface InviteUserModalProps {
  open: boolean;
  handleClose: () => void;
}
const InviteUserModal: FC<InviteUserModalProps> = ({ open, handleClose }) => {
    const [selectedUser, setSelectedUser] = useState<IUser>()
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
    >
      <SearchUser onSelectUser={setSelectedUser}/>
      <Button variant="contained" fullWidth>Добавить</Button>
      <div>
        <Typography>Текущие участники</Typography>
      </div>
    </CustomModal>
  );
};

export default InviteUserModal;
