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
  method: 'create'|'edit',
  title?:string,
  description?:string
}


const CreateBoardModal = forwardRef<
  CanOpenBoardModal,
  BoardModalProps
>(({title='', description='', method, onSubmit}, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  const [titleValue, setTitleValue] = useState<string>(title);
  const [descriptionValue, setDescriptionValue] = useState<string>(description);

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      closeModal();
    },
  }));

  const closeModal = () => setOpen(false);

  const submit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    onSubmit && onSubmit(titleValue,descriptionValue)
    if(method === 'create'){
      setTitleValue('')
      setDescriptionValue('')
    }
  };

  return (
    <CustomModal open={open} handleClose={closeModal}>
      <form onSubmit={submit} className="d-column">
        <CustomInput
          required
          value={titleValue}
          onChange={(e)=>setTitleValue(e.target.value)}
          label="Название"
          maxLength={100}
        />
        <Gap />
        <CustomInput
          required
          value={descriptionValue}
          onChange={(e)=>setDescriptionValue(e.target.value)}
          label="Описание"
          multiline
          maxLength={250}
          maxRows={5}
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
          {method === 'create'? 'Создать': 'Сохранить'}
        </Button>
      </form>
    </CustomModal>
  );
});

export default CreateBoardModal;
