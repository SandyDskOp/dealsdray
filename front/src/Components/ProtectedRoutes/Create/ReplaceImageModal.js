import React from 'react'
import ModalLayout from '../../UtillClasses/ModalLayout'
import {Box,Typography,Button} from "@mui/material"

const ReplaceImageModal = ({display,cancelreupload,handleClick}) => {
  return (
    <ModalLayout displayCont={display}>
    <Box sx={{width:{xs:"100%",md:"100%"},p:3}}>
      <Typography>
        Are you sure you want to replace old Image
      </Typography>
      <Box width="100%" display="flex" alignItems="center" justifyContent="space-evenly">
          <Button color="error" onClick={cancelreupload}>
            Cancel
          </Button>
          <Button color="success" onClick={handleClick}>
            Confirm
          </Button>
      </Box>
    </Box>
  </ModalLayout>
  )
}

export default ReplaceImageModal