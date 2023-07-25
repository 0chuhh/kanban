import { Button, Tooltip, Typography } from "@mui/material";
import Gap from "component/ui/gap";
import { IComment } from "models/IComment";
import { IUser } from "models/IUser";
import React, { FC } from "react";
import { parseDate } from "services/parseDate";

interface CommentProps {
  comment: IComment;
  reply?: IUser;
  onReply?:(comment:IComment)=>void;
}

const Comment: FC<CommentProps> = ({ comment, reply, onReply=()=>{} }) => {
  return (
    <div className={reply ? "reply comment" : "comment"}>
      <div className="comment-header">
        <Tooltip title={comment.owner.fullname}>
          <Typography fontSize={"small"} >{comment.owner.firstname}</Typography>
        </Tooltip>
        <Typography fontSize={"small"}>
          {parseDate(comment.date_created)}
        </Typography>
      </div>
      <Gap />
      <div className="comment-content">
        <span style={{fontSize:'12px'}}>
        <span>{
            reply && 
            <Tooltip title={reply.fullname}><span style={{
                color:'blue',
                textDecoration:'underline'
            }}>{reply?.firstname}, </span></Tooltip>
        }</span>
        <span> {comment.text}</span>
        </span>
      </div>
      <Gap />
      <div className="comment-actions">
        {!reply && (
          <Button
          onClick={()=>{onReply(comment)}}
            style={{
              padding: 0,
              fontSize: "12px",
              color: "#000",
              textTransform: "none",
            }}
          >
            ответить
          </Button>
        )}
      </div>
    </div>
  );
};

export default Comment;
