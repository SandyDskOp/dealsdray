import React from "react";
import ModalLayout from "./ModalLayout";
import {Box, CircularProgress, LinearProgress } from "@mui/material";

const LoadingModal = ({display}) => {
  return (
    <ModalLayout displayCont={display} >
      <Box width="100%">
       <CircularProgress/>
      </Box>
    </ModalLayout>
  );
};

export default LoadingModal;
