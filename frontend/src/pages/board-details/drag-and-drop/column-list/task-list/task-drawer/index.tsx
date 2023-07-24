import { Typography } from "@mui/material";
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

    const [title, setTitle] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([])

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
        if(task){
            const comments:IComment[] = await api.comments.getCommentsByTaskId(task?.id)
            setComments(comments)
        }
    }
    useEffect(()=>{
        if(task)
        setTitle(task?.title)
        getComments()
    },[task])

    return (
      <CustomDrawer onClose={closeDrawer} open={open}>
        <div className="h-100" style={{
            marginTop:'30%'
        }}>
        <CustomInput value={title} label='название'/>
        <Gap/>
        <Typography color={'#fff'}>
            Комментарии:
        </Typography>
        <Gap/>
        <div className="comments">
            {
                comments?.map(comment=>
                        comment.reply ? <div className="comment reply">{comment.text}</div>
                        :
                        <div className="comment">{comment.text}</div>
                    )
            }
        </div>
        </div>
      </CustomDrawer>
    );
  }
);

export default TaskDrawer;
