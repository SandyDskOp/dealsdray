import React, { useEffect, useState } from "react";
import ReadFilters from "./ReadFilters";
import { Box } from "@mui/material";
import ReadTable from "./ReadTable";
import { client } from "../../clientserver/client";

const ReadIndex = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [tempEmployees, setTempEmployees] = useState([])
  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("")
  const [designation, setDesignation] = useState("")
  const [searchString, setSearchString] = useState("")

  const getData = async () => {
    const response = await client.get("/user");
    console.log(response.data);
    setEmployees(response.data);
    setFilteredEmployees(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleNameSort = () => {
    const sorted = [...employees].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setFilteredEmployees(sorted);
  };

  const handleEmailSort = () => {
    const sorted = [...employees].sort((a, b) => {
      return a.email.localeCompare(b.email);
    });
    setFilteredEmployees(sorted);
  };

  const filterBycourse = (e) => {
    setCourse(e.target.value);
    let filtered;
      if (e.target.value == "mca") {
        filtered =employees.filter((employee) => {
          if (employee.course.mca) {
            return employee;
          }
        });
      } else if (e.target.value == "bca") {
        filtered =employees.filter((employee) => {
          if (employee.course.bca) {
            return employee;
          }
        });
      } else {
        filtered =employees.filter((employee) => {
          if (employee.course.bsc) {
            return employee;
          }
        });
      }
      setFilteredEmployees(filtered);
    
  };

  const handleGenderFilter=(e)=>{
    setGender(e.target.value)
   
    const filtered = employees.filter((data)=>{
      if(data.gender.toLowerCase()==e.target.value.toLowerCase()){
        return data
      }
    })
    setFilteredEmployees(filtered)
  }

  const handleDesignationFilter=(e)=>{
    setDesignation(e.target.value)
    const filtered = employees.filter((data)=>{
      if(data.designation.toLowerCase()==e.target.value){
        return data
      }
    })
    setFilteredEmployees(filtered)
   
  }

  const handleSearchFilter=(e)=>{
    setSearchString(e.target.value)
    setTempEmployees((prev)=>filteredEmployees)
    if(e.target.value==""){
      setFilteredEmployees(tempEmployees)
    }else{
      const filtered = employees.filter((data)=>{
        if(data.name.toLowerCase().includes(e.target.value.toLowerCase())){
          return data
        }
      })
      setFilteredEmployees(filtered)
    }
  }

  return (
    <Box>
      <ReadFilters
        nameSort={handleNameSort}
        emailSort={handleEmailSort}
        course={course}
        onCourseChange={filterBycourse}
        gender={gender}
        onGenderChange={handleGenderFilter}
        designation={designation}
        onDesignationChange={handleDesignationFilter}
        searchString={searchString}
        onSearchChange={handleSearchFilter}
      />
      <Box height="100vh" sx={{ overflowX: "scroll" }}>
        <ReadTable datas={filteredEmployees} nameSort={handleNameSort} />
      </Box>
    </Box>
  );
};

export default ReadIndex;
