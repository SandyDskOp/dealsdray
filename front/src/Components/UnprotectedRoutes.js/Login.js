import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from '@mui/icons-material/Person';
import { client } from "../clientserver/client";

import {useNavigate} from "react-router-dom"

const Login = ({onLogin}) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false)

  const setNonValid=()=>{
    setInvalid(true)
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyPassword = async () => {
    try {
      const response = await client.post("/user/login", {
        name: values.name,
        password: values.password
      });
      if (response.status !== 200) {
        setNonValid();
      } else {
        verifyToken(response.data.token);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setNonValid(); // Set invalid state if there's an error
    }
  };
  
  const verifyToken = async (token) => {
    try {
      const response = await client.get("/user/auth", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        setNonValid();
      } else {
        console.log(response.data);
        onLogin();
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setNonValid(); // Set invalid state if there's an error
    }
  };
  

  const handleClick=(e)=>{
    e.preventDefault()
    verifyPassword()
  }
  
  const handleInputFocus = () => {
    setInvalid(false); // Clear invalid state when input fields are focused
  };

  return (
    <>
      {/* navbar */}
      <AppBar position="fixed">
        <Toolbar>
          <img src="assets/images/dd.jpg" width="40px" />
        </Toolbar>
      </AppBar>
      {/**full page */}
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/**input container */}
        <Box
          p={5}
          sx={{
            height: "auto",
            width: { xs: "70%", md: "50%" },
            boxShadow: "2px 2px 5px rgba(0,0,0,0.7)",
          }}
        >
          <Typography variant="h6" textAlign="center">Admin Login</Typography>
          {/**Username input */}
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={handleClick}
          >
            <TextField
              label="Username"
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus} 
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton >
                      <PersonIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 2, mb: 2 }}
            />
            {/**password input */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleInputChange}
              onFocus={handleInputFocus} 
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 2, mb: 2 }}
            />
            {/**Button */}
            <Button
              sx={{
                width: { md: "40%", xs: "100%" },
                mt: 3,
              }}
              type="submit"
              variant="contained"
            >
              <Typography>Login</Typography>
            </Button>
           
          </form>
          {invalid?<Typography color="red">Invalid Login</Typography>:null}
        </Box>
      </Box>
    </>
  );
};

export default Login;
