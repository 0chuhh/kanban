import { FC, useState } from "react";
import React from "react";
import { useMemo } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Gap from "../gap";

type OnDeleteType = (file: File) => void;

interface FileListProps {
  files: File[];
  onDelete?: OnDeleteType;
}

const FileList: FC<FileListProps> = ({ files, onDelete = () => {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  if (files.length === 0) {
    return <div></div>;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap:'wrap',
        gap: "20px",
      }}
    >
      {files.map((file, index) => (
        <div
          key={index}
          onMouseOver={(e) => {
            e.preventDefault();
            setIsHovered(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setIsHovered(false);
          }}
          className="file-item"
          style={{ display: "flex", alignItems: "center", }}
        >
          <Button key={index}>
            <FileCopyIcon />
            <Gap variant="horizontal" />
            {file.name}
          </Button>
          <IconButton
            style={{
              opacity: isHovered ? "1" : "0",
              transition: "all 0.3s ease",
            }}
            onClick={()=>onDelete(file)}
            className="file-item-delete"
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
export default React.memo(FileList);
