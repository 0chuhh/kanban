import { MenuItem } from "@mui/base";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import SearchUser from "component/modules/search-user";
import CustomModal from "component/ui/custom-modal";
import Gap from "component/ui/gap";
import { IUser } from "models/IUser";
import React, { FC, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import api from "services/api";
import { useParams } from "react-router";

interface InviteUserModalProps {
  open: boolean;
  handleClose: () => void;
  members?: IUser[],
  onMemberKick: (userId:number)=>void
}
const InviteUserModal: FC<InviteUserModalProps> = ({ open, handleClose, members, onMemberKick }) => {
  const id = useParams<string>().id;
  const [selectedUser, setSelectedUser] = useState<IUser>()

  const kickUser = async (userId?:number) => {
    if(userId){
      await api.boardMembers.kickMember(Number(id), Number(userId))
      onMemberKick(Number(userId))
    }
  }
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
    >
      <SearchUser onSelectUser={setSelectedUser} />
      <Button variant="contained" fullWidth>Добавить</Button>
      <Gap />
      <div>
        <Typography>Текущие участники</Typography>
        <div className="current-members">
          {
            members?.map(member =>
              <div className="v-center jc-between">
                <div className="v-center">
                <Avatar
                  key={"member" + member.userId}
                  className="members-avatar"
                >
                  {member?.lastname[0]?.toUpperCase()}
                  {member?.firstname[0]?.toUpperCase()}
                </Avatar>
                <Gap variant="horizontal"/>
                <div className="fullname">{member.fullname}</div>
                </div>
                <IconButton onClick={()=>kickUser(member?.userId)} title="выгнать" ><DeleteIcon htmlColor="red"/></IconButton>
              </div>
            )
          }
        </div>
      </div>
    </CustomModal>
  );
};

export default InviteUserModal;
