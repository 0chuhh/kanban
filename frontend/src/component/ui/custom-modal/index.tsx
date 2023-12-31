import React, { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Badge, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps extends PropsWithChildren {
  open: boolean;
  fullwidth?: boolean;
  handleClose: () => void;
}

const CustomModal: FC<CustomModalProps> = ({
  open,
  fullwidth = false,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter:'blur(10px)'
      }}
    >
      <Badge
        badgeContent={
          <IconButton
            onClick={handleClose}
            style={{
              backgroundColor: "#ff4057",
              color:'#000'
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Box
        
          sx={{
            top: "50%",
            left: "50%",
            bgcolor: "#ff4057",
            color:"#fff",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
          className='modal'
        >
          {children}
        </Box>
      </Badge>
    </Modal>
  );
};

export default CustomModal;
