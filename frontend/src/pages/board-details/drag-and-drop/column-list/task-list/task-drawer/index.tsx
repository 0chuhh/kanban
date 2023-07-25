import { Button, IconButton, Typography } from "@mui/material";
import CustomDrawer from "component/ui/custom-drawer";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import { IComment } from "models/IComment";
import { ITask } from "models/ITask";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import api from "services/api";
import Comment from "./comments/comment";
import CloseIcon from "@mui/icons-material/Close";

export interface CanOpenTaskDrawer {
  openDrawer(): void;
  closeDrawer(): void;
}
interface TaskDrawerProps {
  task?: ITask;
  onSubmit: (title: string, color: string, initTitle?: string) => void;
}
const TaskDrawer = forwardRef<CanOpenTaskDrawer, TaskDrawerProps>(
  ({ task }, ref) => {
    const [title, setTitle] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentValue, setCommentValue] = useState<string>('')
    const [selectedReply, setSelectedReply] = useState<IComment | null>(null);

    useImperativeHandle(ref, () => ({
      openDrawer() {
        openDrawer();
      },
      closeDrawer() {
        closeDrawer();
      },
    }));

    const openDrawer = () => {
      setOpen(true);
    };

    const closeDrawer = () => {
      setOpen(false);
    };

    const getComments = async () => {
      if (task) {
        const comments: IComment[] = await api.comments.getCommentsByTaskId(
          task?.id
        );
        setComments(comments);
      }
    };
    const submitComment: React.FormEventHandler<HTMLFormElement> = async (
      event
    ) => {
      event.preventDefault();
      const form = document.getElementById("comment-form") as HTMLFormElement;
      const formData = new FormData(form);
      const text = formData.get("comment")?.toString();
      if (task && text) {
        if (selectedReply) {
          await api.comments.postCommentsByTaskId(
            task.id,
            text,
            selectedReply.id
          );
        } else {
          await api.comments.postCommentsByTaskId(task.id, text);
        }
      }
      setSelectedReply(null);
      getComments();
    };

    const onReply = (comment: IComment) => {
      setSelectedReply(comment);
    };

    useEffect(() => {
      if (task) setTitle(task?.title);
      getComments();
      return setSelectedReply(null);
    }, [task]);

    useEffect(() => {
      if (comments) {
        const commentsScroll = document.querySelector(".comments");
        commentsScroll?.scroll({
          top: commentsScroll.scrollHeight,
          behavior: "smooth",
        });
        const commentInput = document.getElementById(
          "comments"
        ) as HTMLInputElement;
        setCommentValue('')
      }
    }, [comments]);
    return (
      <CustomDrawer onClose={closeDrawer} open={open}>
        <div
          className="h-100"
          style={{
            marginTop: "30%",
          }}
        >
          <CustomInput value={title} label="название" />
          <Gap />
          <div className="comments-wrapper">
            <Typography color={"#fff"}>Комментарии:</Typography>
            <Gap />
            <div className="comments">
              {comments?.map((comment) => (
                <div key={"comment" + comment.id} className="comment-wrapper">
                  <Comment onReply={onReply} comment={comment} />
                  {comment?.replies.map((reply) => (
                    <Comment
                      key={"reply" + reply.id}
                      comment={reply}
                      reply={comment.owner}
                    />
                  ))}
                </div>
              ))}
            </div>
            <Gap />
            <Gap />
            <form id="comment-form" onSubmit={submitComment}>
              {selectedReply && (
                <div
                  className="replaying"
                  style={{
                    fontSize: "12px",
                    background: "#fff",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "5px",
                    maxHeight: "46px",
                  }}
                >
                  <div>
                    ответ для:{" "}
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                      }}
                    >
                      {selectedReply.owner.firstname}
                    </span>
                    <div
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "250px",
                        overflow: "hidden",
                      }}
                    >
                      {selectedReply.text}
                    </div>
                  </div>
                  <IconButton onClick={() => setSelectedReply(null)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
              <Gap />
              <CustomInput
                id="comment"
                name="comment"
                required
                maxRows={1}
                multiline
                fullWidth
                value={commentValue}
                onChange={(e)=>setCommentValue(e.target.value)}
                label="Комментарий"
              />
              <Button type="submit" fullWidth variant="contained">
                отправить
              </Button>
            </form>
          </div>
        </div>
      </CustomDrawer>
    );
  }
);

export default TaskDrawer;
