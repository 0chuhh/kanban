import React, { FC, PropsWithChildren } from "react";
import Card, { CardTypeMap, CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button, { ButtonProps } from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditIcon from "@mui/icons-material/EditRounded";

export interface CardButton extends ButtonProps {
  label: string;
  link?: string;
}

interface CustomCardProps extends PropsWithChildren, CardProps {
  label?: string;
  button?: CardButton;
  fullWidth?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CustomCard: FC<CustomCardProps> = ({
  label,
  button,
  fullWidth = false,
  onEdit,
  onDelete,
  children,
  ...restProps
}) => {
  return (
    <Card {...restProps}>
      <CardContent
        style={{
          justifyContent: "space-between",
        }}
        className="d-flex"
      >
        <div>{children}</div>
        {(onDelete || onEdit) && (
          <div className="column">
            {onEdit && (
              <IconButton onClick={onEdit}>
                <EditIcon style={{ color: "#f90" }} />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={onDelete}>
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            )}
          </div>
        )}
      </CardContent>
      {button && (
        <CardActions>
          {button.link ? (
            <Link to={button.link}>
              <Button {...button}>{button.label}</Button>
            </Link>
          ) : (
            <Button {...button}>{button.label}</Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CustomCard;
