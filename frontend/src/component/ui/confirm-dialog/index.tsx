import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ModalProps,
} from "@mui/material";
import React, { FC, useState } from "react";

export interface ConfirmDialogProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  onConfirm,
  onCancel,
  title,
  content,
  open,
  handleClose,
}) => {

  const confirm:React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    handleClose();
    onConfirm && onConfirm();
  };

  const cancel:React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    handleClose();
    onCancel && onCancel();
  };

  return (
    <Dialog
      open={open}
      onClick={(e)=>e.stopPropagation()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
        {/* {
                    children
                } */}
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>Отмена</Button>
        <Button onClick={confirm}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
