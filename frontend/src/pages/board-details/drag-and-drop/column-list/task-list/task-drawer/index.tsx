import { Button, Typography } from "@mui/material";
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
    const submitComment:React.FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault()
      const form = document.getElementById('comment-form') as HTMLFormElement
      const formData = new FormData(form)
      const text = formData.get('comment')?.toString()
      if(task && text)
      await api.comments.postCommentsByTaskId(task.id,text)
      getComments()
    }
    useEffect(() => {
      if (task) setTitle(task?.title);
      getComments();
    }, [task]);


    useEffect(()=>{
      const comments = document.querySelector('.comments')
      comments?.scroll({top:comments.scrollHeight, behavior:'smooth' })
      const commentText = document.querySelector('#comment') as HTMLInputElement
      commentText.value = ''
    },[comments])
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
              <div className="comment-wrapper">
                <Comment key={'comment'+comment.id} comment={comment}/>
                {comment?.replies.map((reply) => (
                  <Comment key={'reply'+reply.id} comment={reply} reply={comment.owner}/>
                ))}
              </div>
            ))}
          </div>
          <Gap/>
          <Gap/>
          <form id='comment-form' onSubmit={submitComment}>
            <CustomInput id="comment" name="comment" required maxRows={1} multiline fullWidth label='Комментарий'/>
            <Button type="submit" fullWidth variant="contained">отправить</Button>
          </form>
          </div>
        </div>
      </CustomDrawer>
    );
  }
);

export default TaskDrawer;
