import React from "react";
import "./table.css";
import { Button } from "@mui/material";
import {Link} from "react-router-dom"

const ReadTable = ({ datas }) => {
  return (
    <table>
      <tr>
        <th>S.No</th>
        <th style={{ width: "120px" }}>Profile Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Designation</th>
        <th>Gender</th>
        <th>Course</th>
        <th>Created Date</th>
        <th>Edit</th>
      </tr>
      {datas &&
        datas.map((data, index) => (
          <tr key={data._id}>
            <td>{index + 1}</td>
            <td>
              <img src={data.image.url} width="40px" />
            </td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td>{data.designation}</td>
            <td>{data.gender.toUpperCase()}</td>
            <td>
              {data.course.mca ? "MCA" : null}  {data.course.bca ? "BCA" : null}{" "}
              {data.course.bsc ? "BSC" : null}
            </td>
            <td>{data.createdAt}</td>
            <td>
              <Button LinkComponent={Link} to={`/create/${data._id}`}>Edit</Button>
            </td>
          </tr>
        ))}
    </table>
  );
};

export default ReadTable;
