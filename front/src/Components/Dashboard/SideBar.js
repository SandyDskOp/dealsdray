import React from "react";
import { Box, Button, Grid, Typography,useMediaQuery } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import ButtonLink from "./ButtonLink";


const SideBar = ({closemenu}) => {
  const navigate = useNavigate()
  const logOut=()=>{
    localStorage.removeItem("auth")
    navigate("/login")
  }
    
  return (
    <Grid container
      height="100%"
      width="100%"
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{overflowY:"scroll",paddingTop:"20px"}}
    >
     <Grid item  display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="25%" >
        <img src="assets/images/dd.jpg"  width="25%" style={{borderRadius:"15px",marginBottom:"10px"}}/>
        <Typography variant="h6">New Admin</Typography>
     </Grid>
     <Grid item direction="column" height="75%" width="100%" paddingLeft={1} paddingRight={1}>
        <ButtonLink  path="/" text="Home"/>
        <ButtonLink path="/create/new" text="Create Employee"/>
        <ButtonLink path="/read" text="Employee List"/>
        <Button onClick={logOut} color="error" fullWidth>Logout</Button>
     </Grid>
    </Grid>
  );
};

export default SideBar;
