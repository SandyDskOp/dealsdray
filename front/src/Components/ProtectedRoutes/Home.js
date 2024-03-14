import React from 'react'
import {Box,Typography} from "@mui/material"

const Home = () => {
  return (
    <Box p={3}>
      <Typography variant='h3' mb={3} letterSpacing={3} fontWeight="700">Welcome Admin</Typography>
      <Typography>{new Date().toTimeString()}</Typography>
    </Box>
  )
}

export default Home