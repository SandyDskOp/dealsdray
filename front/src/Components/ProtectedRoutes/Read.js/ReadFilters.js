import React from "react";
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

const ReadFilters = ({
  nameSort,
  emailSort,
  course,
  onCourseChange,
  gender,
  onGenderChange,
  designation,
  onDesignationChange,
  searchString,
  onSearchChange
}) => {
  return (
    <Box mt={2} mb={4}>
      <Grid container spacing={2} mb={2}>
        <Grid item md={3}>
          <Select
            value={course}
            fullWidth
            displayEmpty
            onChange={(e) => onCourseChange(e)}
          >
            <MenuItem value="">Select Course</MenuItem>
            <MenuItem value="mca">MCA</MenuItem>
            <MenuItem value="bca">BCA</MenuItem>
            <MenuItem value="bsc">BSC</MenuItem>
          </Select>
        </Grid>
        <Grid item md={3}>
          <Select
            value={gender}
            onChange={(e) => onGenderChange(e)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Grid>
        <Grid item md={3}>
          <Select value={designation} fullWidth displayEmpty onChange={(e)=>onDesignationChange(e)}>
            <MenuItem value="">Select Designation</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
          </Select>
        </Grid>
        <Grid item md={3}>
          <TextField fullWidth label="Search by Name" value={searchString} onChange={(e)=>onSearchChange(e)}/>
        </Grid>
        <Grid item md={4}>
          <Button variant="contained" fullWidth onClick={nameSort}>
            <Typography>Sort By Name</Typography>
          </Button>
        </Grid>
        <Grid item md={4}>
          <Button variant="contained" fullWidth onClick={emailSort}>
            <Typography>Sort By Email</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReadFilters;
