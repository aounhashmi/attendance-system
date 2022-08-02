import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
let value = "2022-08-01";
export function Date() {
  const [value, setValue] = useState();

  return (
    <div className="selectDate">
      <h1>Please Select a Date</h1>
      <input className="dateCalendar" type="date" />
    </div>
  );
}

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ date: value }),
};

const studentsData = async () => {
  return fetch(
    "http://localhost:8080/attendance/getPresent",
    requestOptions
  ).then((res) => res.json());
};

export default function Tabels() {
  const { isLoading, isError, error, data } = useQuery(["getAllStudents"], () =>
    studentsData()
  );

  if (isLoading) {
    return <h3>Loading....</h3>;
  }

  if (isError) {
    console.log(error);
    return <span>Error: {error.message}</span>;
  }
  if (data.status !== "No Record Found") {
    console.log(data.status);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Student Names</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.presentStudents?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.fullname}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <h2> No Record Found </h2>;
  }
}

export function Tabels2() {
  const { isLoading, isError, error, data } = useQuery(["getAllStudents"], () =>
    studentsData()
  );

  if (isLoading) {
    return <h3>Loading....</h3>;
  }

  if (isError) {
    console.log(error);
    return <span>Error: {error.message}</span>;
  }
  if (data.status !== "No Record Found") {
    console.log(data.status);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Student Names</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.absentStudents?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.fullname}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <h2> No Record Found </h2>;
  }
}
