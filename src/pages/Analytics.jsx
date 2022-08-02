// import React from "react";
import * as React from "react";
import Tabels from "./tableCompo";
import { Tabels2, Date } from "./tableCompo";
// import { useState } from "react";

const Analytics = () => {
  // const [Value, setValue] = useState();

  return (
    <div className="viewAttendance">
      <Date />
      <div className="presentStudentTable">
        <h1 className="heading">Present Students List</h1>
        <Tabels />
      </div>

      <div className="absentStudentTable">
        <h1 className="heading">Absent Students List</h1>
        <Tabels2 />
      </div>
    </div>
  );
};

export default Analytics;
