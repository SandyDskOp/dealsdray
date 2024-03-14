import React from 'react'
import {Box} from "@mui/material"
import CreateEmployee from './CreateEmployee'

const CreateEmplyeeLayout = () => {
  return (
    <Box sx={{height:{xs:"auto",md:"100%"},width:"100%",display:"flex",justifyContent:"center",pt:4,pb:4}}>
        <Box sx={{height:{md:"70%",lg:"85%",xs:"auto"},width:"70%"}}>
            <CreateEmployee/>
        </Box>
    </Box>
  )
}

export default CreateEmplyeeLayout