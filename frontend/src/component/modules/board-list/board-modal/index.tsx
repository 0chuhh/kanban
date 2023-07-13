import { Button } from "@mui/material";
import CustomInput from "component/ui/custom-input";
import CustomModal from "component/ui/custom-modal";
import Gap from "component/ui/gap";
import { IBoard } from "models/IBoard";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";

export interface CanOpenBoardModal {
  openModal(): void;
  closeModal(): void;
}

interface BoardModalProps {
  onSubmit?: (title:string,description:string) => void;
  method: 'create',
}

interface EditBoardModalProps {
  onSubmit?: (title:string,description:string) => void;
  method: 'edit',
  title:string,
  description:string
}

const CreateBoardModal = forwardRef<
  CanOpenBoardModal,
  BoardModalProps | EditBoardModalProps
>((props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const initTitle = props.method === 'edit'? props.title:'';
  const initDescription = props.method === 'edit'? props.description:'';

  const [titleValue, setTitleValue] = useState<string>(initTitle);
  const [descriptionValue, setDescriptionValue] = useState<string>(initDescription);

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      closeModal();
    },
  }));

  const closeModal = () => setOpen(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(titleValue,descriptionValue)
    if(props.method === 'create'){
      setTitleValue('')
      setDescriptionValue('')
    }
  };

  return (
    <CustomModal open={open} handleClose={closeModal}>
      <form onSubmit={onSubmit} className="d-column">
        <CustomInput
          required
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          label="Название"
          maxLength={100}
        />
        <Gap />
        <CustomInput
          required
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          label="Описание"
          multiline
          maxLength={1000}
        />
        <Gap />
        <Button
          variant="contained"
          style={{
            color: "#fff",
            backgroundColor: "#000",
          }}
          type="submit"
        >
          {props.method === 'create'? 'Создать': 'Сохранить'}
        </Button>
      </form>
    </CustomModal>
  );
});

export default React.memo(CreateBoardModal);
