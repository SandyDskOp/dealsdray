import React from "react";
import { Paper, Box } from "@mui/material";

const ModalLayout = ({ children, displayCont }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: displayCont ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#d1d1d1",
          height:"auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p:8,
          boxShadow:"2px 2px 5px rgba(0,0,0,,0.7)"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ModalLayout;
