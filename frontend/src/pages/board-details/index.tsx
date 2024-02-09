import React from "react";

import DragAndDrop from "./drag-and-drop";
import BoardDrawer from "./board-drawer";

const BoardDetails = () => {
  return (
    <div className="container" style={{ display: "flex", padding:'115px 0 0' }}>
      <BoardDrawer />

      <div style={{ display: "grid" }}>
        <DragAndDrop />
      </div>
    </div>
  );
  
};

export default BoardDetails;
