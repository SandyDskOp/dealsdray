import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import validator from "validator";
import { client } from "../../clientserver/client";
import ReplaceImageModal from "./ReplaceImageModal";
import LoadingModal from "../../UtillClasses/LoadingModal";
import ErrorModal from "../../UtillClasses/ErrorModal";

//reducer to handle states
const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: {
          value: action.payload.target.value,
          error: false,
        },
      };
    case "name":
      return {
        ...state,
        name: action.payload.target.value,
      };
    case "mobile":
      // Check if the input value matches the desired pattern (numbers only)
      if (/^\d*$/.test(action.payload.target.value)) {
        return {
          ...state,
          mobile: {
            value: action.payload.target.value,
            error: false,
          },
        };
      } else {
        // If the input doesn't match the pattern, ignore the input (or handle it as you prefer)
        return state;
      }

    case "designation":
      return {
        ...state,
        designation: action.payload.target.value,
      };
    case "gender":
      return {
        ...state,
        gender: action.payload.target.value,
      };
    case "mca":
      return {
        ...state,
        mca: !state.mca,
        bca: true,
      };
    case "bca":
      return {
        ...state,
        bca: !state.bca,
      };
    case "bsc":
      return {
        ...state,
        bsc: !state.bsc,
      };
    case "image":
      return {
        ...state,
        image: action.payload.target.files[0],
      };
    case "emailerror":
      return {
        ...state,
        email: {
          value: state.email.value,
          error: true,
          errorText: action.payload,
        },
      };
    case "cancelemailerror":
      return {
        ...state,
        email: {
          value: state.email.value,
          error: false,
        },
      };
    case "mobileerror":
      return {
        ...state,
        mobile: {
          value: state.mobile.value,
          error: true,
        },
      };
    case "cancelmobileerror":
      return {
        ...state,
        mobile: {
          value: state.mobile.value,
          error: false,
        },
      };
    case "updatestate":
      return {
        ...state,
        name: action.payload.name,
        email: {
          value: action.payload.email,
          error: false,
        },
        mobile: {
          value: action.payload.mobile,
          error: false,
        },
        designation: action.payload.designation,
        gender: action.payload.gender,
        mca: action.payload.course.mca,
        bca: action.payload.course.bca,
        bsc: action.payload.course.bsc,
        pid: action.payload.image.pid,
        url: action.payload.image.url,
      };
    default:
      return state;
  }
};

//initialstates for the component
const initialState = {
  name: "",
  email: {
    value: "",
    error: false,
  },
  mobile: {
    value: "",
    error: false,
  },
  designation: "",
  gender: "",
  mca: false,
  bca: false,
  bsc: false,
  image: "",
};

const CreateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [values, dispatch] = useReducer(reducer, initialState); //reducer for the page
  const [edit, setEdit] = useState(false); //checking whether edit or create
  const fileRef = useRef(null); //reffing the file input
  const [error, setError] = useState({
    error: false,
    text: "",
  }); //setting the error for entire page
  const [reupload, setReupload] = useState(false); //to open delete old image  dialogue box
  const [loader, setLoader] = useState(false); //to open loader
  const [newUploadImage, setNewUploadImage] = useState(false);

  //opening loader function
  const openLoader = () => {
    setLoader(true);
  };

  //closing loader function
  const closeLoader = () => {
    setLoader(false);
  };

  //checking whether new  employee is being created or existing one is being edited
  useEffect(() => {
    if (id == "new") {
      setEdit(false);
    } else {
      setEdit(true);
      getEmployee();
    }
  }, [id]);

  //function to fetch data of an existing
  const getEmployee = async () => {
    let response;
    try {
      response = await client.get(`/user/getById/${id}`);
      if (response.status != 200) {
        updateError(true, response.data.message);
      } else {
        console.log(response.data.data);
        dispatch({ type: "updatestate", payload: response.data.data });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "updatestate", payload: response.data.data });
    }
    
  };

  //to open file input
  const openFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  //to check whethr there is error in email
  const emailerror = async () => {
    openLoader();
    if (!validator.isEmail(values.email.value)) {
      dispatch({ type: "emailerror", payload: "Enter a valid email" });
      closeLoader();
      return;
    }
    let response;
    try {
      response = await client.post("/user/emailExist", {
        email: values.email.value,
      });
      if (response.status != 200) {
        dispatch({ type: "emailerror", payload: "Email already exist" });
        closeLoader();
      } else {
        closeLoader();
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  //to change email error to false
  const emailFocus = () => {
    console.log(values);
    dispatch({ type: "cancelemailerror" });
  };

  //to check whether there is an error in email
  const mobileError = () => {
    if (values.mobile.value.length < 10) {
      dispatch({ type: "mobileerror" });
    }
  };

  //to nullify mobile error
  const mobilefocus = () => {
    dispatch({ type: "cancelmobileerror" });
  };

  //to update entire error for the page
  const updateError = (status, message) => {
    setError((prev) => ({
      ...prev,
      error: status,
      text: message,
    }));
    setTimeout(() => {
      setError((prev) => ({
        ...prev,
        error: false,
        text: "",
      }));
    }, 3000);
  };

  //to save the image in cloud
  const postImage = async () => {
    let response;
    const formdata = new FormData();
    formdata.append("image", values.image);
    try {
      response = await client.post("/user/addImage", formdata);
      if (response.status != 200) {
        updateError(true, "Failed to upload Image");
      } else {
        edit ? updateDatas(response.data.result) : postData(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  //to save the employee datas in databases
  const postData = async (result) => {
    console.log(result);
    let response;
    try {
      response = await client.post("/user", {
        name: values.name,
        email: values.email.value,
        mobile: values.mobile.value,
        designation: values.designation,
        gender: values.gender,
        mca: values.mca,
        bca: values.bca,
        bsc: values.bsc,
        url: result.secure_url,
        pid: result.public_id,
      });
      if (response.status != 200) {
        updateError(true, response.data.message);
        console.log(response.data.message);
        closeLoader();
      } else {
        console.log(response.data);
        closeLoader();
        navigate("/read")
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  //to delete old image from the cloud
  const deleteOldImage = async (req, res) => {
    setNewUploadImage(true);
    setReupload(false);
    openLoader();
    let response;
    try {
      response = await client.delete(`/user/image/${values.pid.split("/")[1]}`);
      if (response.status != 200) {
        closeLoader();
        updateError(true, "Unable to Delete Old Image.");
      } else {
        closeLoader();
        openFile();
        console.log(response.data);
      }
    } catch (err) {
      console.log();
    }
    
  };

  //to update the new datas to db
  const updateDatas = async (result) => {
    let response;
    try {
      response = await client.put(`/user/${id}`, {
        name: values.name,
        email: values.email.value,
        mobile: values.mobile.value,
        designation: values.designation,
        gender: values.gender,
        mca: values.mca,
        bca: values.bca,
        bsc: values.bsc,
        url: newUploadImage ? result.secure_url : values.url,
        pid: newUploadImage ? result.public_id : values.pid,
      });
      if (response.status != 200) {
        updateError(true, response.data.message);
        console.log(response.data.message);
        closeLoader();
      } else {
        console.log(response.data);
        closeLoader();
        navigate("/read")
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  const handleClick = (e) => {
    e.preventDefault();
    openLoader();
    if (
      !values.name ||
      !values.email.value ||
      values.email.error ||
      !values.mobile.value ||
      values.mobile.error ||
      !values.designation ||
      !values.gender ||
      !values.image
    ) {
      updateError(true,"Fill all fields correctly")
      closeLoader()
      return
    }
    postImage();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    openLoader();
    newUploadImage ? postImage() : updateDatas();
  };

  return (
    <>
      <Box
        p={3}
        sx={{
          height: "auto",
          width: { xs: "100%", md: "80%" },
          boxShadow: "2px 2px 5px rgba(0,0,0,0.7)",
        }}
      >
        <Typography textAlign="center" variant="h4" mb={2}>
          Create Employee
        </Typography>

        <Grid container mb={3}>
          <Grid
            item
            xs={0}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Name
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Name"
              value={values.name}
              onChange={(e) => dispatch({ type: "name", payload: e })}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container mb={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Email
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Email"
              value={values.email.value}
              onChange={(e) => dispatch({ type: "email", payload: e })}
              error={values.email.error}
              helperText={values.email.error ? values.email.errorText : null}
              onBlur={emailerror}
              onFocus={emailFocus}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container mb={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Mobile No
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Mobile"
              value={values.mobile.value}
              onChange={(e) => dispatch({ type: "mobile", payload: e })}
              error={values.mobile.error}
              onBlur={mobileError}
              onFocus={mobilefocus}
              helperText={
                values.mobile.error ? "* Enter a valid Mobile number" : null
              }
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container mb={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Designation
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              displayEmpty
              value={values.designation}
              onChange={(e) => dispatch({ type: "designation", payload: e })}
              fullWidth
              size="small"
            >
              <MenuItem value="" disabled>
                Select Designation
              </MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container mb={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Gender
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <RadioGroup
                row
                value={values.gender}
                onChange={(e) => dispatch({ type: "gender", payload: e })}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio size="small" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container mb={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Course
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.mca}
                    onChange={(e) => {
                      dispatch({ type: "mca" });
                    }}
                  />
                }
                label="MCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.bca}
                    onChange={(e) => dispatch({ type: "bca" })}
                  />
                }
                label="BCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.bsc}
                    onChange={(e) => dispatch({ type: "bsc" })}
                  />
                }
                label="BSC"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container mb={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="body1" fontSize="20px">
              Profile Image
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => dispatch({ type: "image", payload: e })}
              accept=".jpg, .png"
              style={{ display: "none" }}
            />
            {edit ? (
              <Button
                variant="contained"
                fullWidth
                onClick={() => setReupload(true)}
              >
                <Typography textAlign="auto">
                  {values.image ? values.image.name : "Replace Old Image"}
                </Typography>
              </Button>
            ) : (
              <Button fullWidth variant="contained" onClick={openFile}>
                <Typography textAlign="auto">
                  {values.image ? values.image.name : "Upload New Image"}
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={4} ml="auto" mr="auto">
            {edit ? (
              <>
                <Button fullWidth onClick={(e) => handleUpdate(e)}>
                  <Typography textAlign="auto">Save</Typography>
                </Button>
              </>
            ) : (
              <Button fullWidth onClick={(e) => handleClick(e)}>
                <Typography textAlign="auto">Submit</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <ReplaceImageModal
        display={reupload}
        cancelreupload={() => setReupload(false)}
        handleClick={deleteOldImage}
      />
      <LoadingModal display={loader} />
      <ErrorModal errorvalue={error} />
    </>
  );
};

export default CreateEmployee;
