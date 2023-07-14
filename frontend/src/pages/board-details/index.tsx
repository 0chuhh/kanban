
import React, { FC, useEffect, useMemo, useState } from "react";

import DragAndDrop from "./drag-and-drop";
import { Button } from "@mui/material";
import BoardDrawer from "./board-drawer";

const BoardDetails = () => {
  return (
    <div className="container" style={{display:'flex'}}>
      <BoardDrawer/>

      <div style={{display:'grid'}}>
        <DragAndDrop/>
      </div>

      </div>
  );
};

export default BoardDetails;
