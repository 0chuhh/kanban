import { IMember } from "models/IMember";
import { Avatar, AvatarGroup, Tooltip, Typography } from "@mui/material";

import React, { FC } from "react";

interface MembersListProps {
  members: IMember[];
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
                <Tooltip title={member.user.fullname}>
                  <Avatar
                    key={member.user.fullname}
                    style={{}}
                    src={member.user.avatar}
                  >
                    {member.user.lastname[0].toUpperCase()}
                    {member.user.firstname[0].toUpperCase()}{" "}
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
        {members?.map((member) => {
          return (
            <Avatar
              key={member.user.fullname}
              style={{}}
              src={member.user.avatar}
            >
              {member.user.lastname[0].toUpperCase()}
              {member.user.firstname[0].toUpperCase()}{" "}
            </Avatar>
          );
        })}
      </AvatarGroup>
    </Tooltip>
  );
};

export default MembersList;
