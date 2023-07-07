import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumn } from "models/IColumn";
import React, { FC, useMemo } from "react";
import Column from "./column";

interface ColumnListProps {
  columns: IColumn[];
}
const ColumnList: FC<ColumnListProps> = ({ columns }) => {
  const columnIds = useMemo(
    () => columns.map((column) => column.title),
    [columns]
  );
  return (
    <SortableContext strategy={horizontalListSortingStrategy} items={columnIds}>
      <div className="column-list" style={{ gap: "10px", height: "100%" }}>
        {columns.map((column) => (
          <Column key={column.title} column={column} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(ColumnList);
