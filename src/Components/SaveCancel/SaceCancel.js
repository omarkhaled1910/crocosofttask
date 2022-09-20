import { Check, Close, Save } from "@mui/icons-material";
import React from "react";

const SaceCancel = ({ savefn, cancelfn }) => {
  return (
    <div style={{ display: "flex", gap: "7px" }}>
      <div style={{ cursor: "pointer" }} onClick={savefn}>
        <Check />
      </div>
      <div className="verical-dash"></div>
      <div style={{ cursor: "pointer" }} onClick={cancelfn}>
        <Close />
      </div>
    </div>
  );
};

export default SaceCancel;
