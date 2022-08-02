import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
const studentsData = async () => {
  return fetch("http://localhost:8080/student/all").then((res) => res.json());
};
export default function About() {
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
  // console.log(data);
  let i = 0;
  if (!data) {
    return <h3>No data found</h3>;
  }
  return (
    <div>
      <form>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Student Names</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Mark Attendance </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Attendance Percentage</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.allStudents?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fullname}
                  </TableCell>
                  <TableCell align="center">
                    <input type="checkbox" value={row.id} />
                  </TableCell>
                  <TableCell align="right">
                    {data?.machinelearning[i++]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="btnDiv">
          <button className="saveBtn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
