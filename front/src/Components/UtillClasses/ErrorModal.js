import React from 'react'
import ModalLayout from './ModalLayout'
import {Box,Typography,Button} from "@mui/material"

const ErrorModal = ({errorvalue}) => {
  return (
    <ModalLayout displayCont={errorvalue.error}>
    <Box sx={{width:{xs:"100%",md:"100%"},p:3}}>
      <Typography sx={{fontSize:"25px",color:"red"}}>
         {errorvalue.text}
      </Typography>
    </Box>
  </ModalLayout>
  )
}

export default ErrorModal