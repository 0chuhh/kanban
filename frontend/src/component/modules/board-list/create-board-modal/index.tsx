import { Button } from "@mui/material";
import CustomInput from "component/ui/custom-input";
import CustomModal from "component/ui/custom-modal";
import Gap from "component/ui/gap";
import { IBoard } from "models/IBoard";
import React, {
  forwardRef,
  FC,
  useState,
  useImperativeHandle,
  Ref,
} from "react";
import api from "services/api";

export interface CanOpenCreateBoardModal {
  openModal(): void;
  closeModal(): void;
}

interface CreateBoardModalProps {
  onCreate?: (board:IBoard) => void;
}

const CreateBoardModal = forwardRef<
  CanOpenCreateBoardModal,
  CreateBoardModalProps
>(({ onCreate }, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      closeModal();
    },
  }));

  const closeModal = () => setOpen(false);

  const createBoard: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const board: IBoard = await api.boards.postBoard(title, description);
    onCreate && onCreate(board)
  };

  return (
    <CustomModal open={open} handleClose={closeModal}>
      <form onSubmit={createBoard} className="d-column">
        <CustomInput
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Название"
        />
        <Gap />
        <CustomInput
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Описание"
          multiline
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
          Создать
        </Button>
      </form>
    </CustomModal>
  );
});

export default React.memo(CreateBoardModal);
