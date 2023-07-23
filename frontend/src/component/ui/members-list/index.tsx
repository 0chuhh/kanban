import { Avatar, AvatarGroup, Tooltip, Typography } from "@mui/material";
import { IUser } from "models/IUser";

import React, { FC } from "react";

interface MembersListProps {
  members: IUser[];
}
const MembersList: FC<MembersListProps> = ({ members }) => {
  return (
    <Tooltip
    placement="left"
      classes={{
        tooltip: "tooltip",
      }}
      title={
        <div style={{ padding: "8px" }}>
          <Typography>Участники</Typography>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {members?.map((member) => {
              return (
                <Tooltip key={member.username+'tooltip'} title={member?.fullname}>
                  <Avatar
                  
                    className="members-avatar"
                    
                    src={member.avatar}
                  >
                    {member?.lastname[0]?.toUpperCase()}
                    {member?.firstname[0]?.toUpperCase()}{" "}
                  </Avatar>
                </Tooltip>
              );
            })}
          </div>
        </div>
      }
      enterDelay={600}
      leaveDelay={400}
      arrow
    >
      <AvatarGroup
        max={5}
        classes={{
          avatar: "members-avatar",
        }}
      >
        {members?.map((member) => 
            <Avatar
              key={member.userId}
              src={member?.avatar}
            >
              {member?.lastname[0]?.toUpperCase()}
              {member?.firstname[0]?.toUpperCase()}{" "}
            </Avatar>
         )}
      </AvatarGroup>
    </Tooltip>
  );
};

export default MembersList;
