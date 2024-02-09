import { DragOverlay } from "@dnd-kit/core";
import React, { FC } from "react";
import Task from "./column-list/task-list/task";
import Column from "./column-list/column";
import { IColumn } from "models/IColumn";
import { ITask } from "models/ITask";

interface OverlayProps {
  selectedColumn?: IColumn;
  selectedTask?: ITask;
}
const Overlay: FC<OverlayProps> = ({ selectedColumn, selectedTask }) => {
  return (
    <DragOverlay>
      {selectedTask && selectedColumn ? (
        <Task columnId={Number(selectedColumn.id)} task={selectedTask} />
      ) : selectedColumn ? (
        <Column column={selectedColumn} />
      ) : null}
    </DragOverlay>
  );
};

export default React.memo(Overlay);
