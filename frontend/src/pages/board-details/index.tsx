
import React, { FC, useEffect, useMemo, useState } from "react";

import DragAndDrop from "./drag-and-drop";
import { Button } from "@mui/material";

const BoardDetails = () => {
  return (
    <div className="container" style={{display:'grid'}}>
        <DragAndDrop/>

      </div>
  );
};

export default BoardDetails;
