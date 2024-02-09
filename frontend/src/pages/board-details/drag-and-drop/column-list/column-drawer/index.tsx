import { Button, Typography } from "@mui/material";
import CustomDrawer from "component/ui/custom-drawer";
import CustomInput from "component/ui/custom-input";
import Gap from "component/ui/gap";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { ColorChangeHandler, GithubPicker } from "react-color";

export interface CanOpenColumnDrawer {
  openDrawer(): void;
  closeDrawer(): void;
}

interface ColumnDrawerProps {
  initTitle?: string;
  initColor?: string;
  onSubmit: (title: string, color: string, initTitle?: string) => void;
}

const ColumnDrawer = forwardRef<CanOpenColumnDrawer, ColumnDrawerProps>(
  ({ initTitle = "", initColor = "#fff", onSubmit }, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(initTitle);
    const [color, setColor] = useState(initColor);

    useImperativeHandle(ref, () => ({
      openDrawer() {
        openDrawer();
      },
      closeDrawer() {
        closeDrawer();
      },
    }));

    useEffect(() => {
      setColor(initColor);
    }, [initColor]);

    useEffect(() => {
      setTitle(initTitle);
    }, [initTitle]);

    const colors = [
      "#ff0000",
      "#ff3700",
      "#ff6f00",
      "#ffa600",
      "#ffdd00",
      "#eaff00",
      "#b3ff00",
      "#7bff00",
      "#44ff00",
      "#0dff00",
      "#00ff2b",
      "#00ff62",
      "#00ff9d",
      "#00ffd5",
      "#00f2ff",
      "#00bbff",
      "#0084ff",
      "#004dff",
      "#0015ff",
      "#2200ff",
      "#5900ff",
      "#9100ff",
      "#c800ff",
      "#ff00ff",
    ];

    const openDrawer = () => {
      setOpen(true);
    };

    const closeDrawer = () => {
      setOpen(false);
    };

    const handleChangeComplete: ColorChangeHandler = (color) => {
      setColor(color.hex);
    };

    const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      if (initTitle.length) onSubmit(title, color, initTitle);
      else onSubmit(title, color);
    };
    return (
      <CustomDrawer onClose={closeDrawer} open={open}>
        <div className="h-100">
          <div className="title">
            <Typography variant="h5" align="center" color={"#fff"}>
              {initColor.length && initTitle.length
                ? "Редактирование раздела"
                : "Создание раздела"}
            </Typography>
          </div>
          <form
            onSubmit={submit}
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "95%",
              boxSizing: "border-box",
              padding: "20px 0",
            }}
          >
            <div>
              <CustomInput
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Название"
                fullWidth
              />
              <Gap gap={20} />
              <Typography color={"#fff"}>Выберите цвет: </Typography>
              <Gap />
              <div
                className="color-container d-flex w-100"
                style={{ gap: "20px" }}
              >
                <GithubPicker
                  triangle="hide"
                  width="213px"
                  className="color-picker"
                  color={color}
                  onChange={handleChangeComplete}
                />
                <div
                  className="color"
                  style={{
                    width: "55px",
                    border: "solid 5px #fff",
                    borderRadius: "10px",
                    backgroundColor: color,
                  }}
                ></div>
              </div>
            </div>
            <Button type="submit" variant="contained" fullWidth>
              {initColor.length && initTitle.length ? "сохранить" : "создать"}
            </Button>
          </form>
        </div>
      </CustomDrawer>
    );
  }
);

export default ColumnDrawer;
