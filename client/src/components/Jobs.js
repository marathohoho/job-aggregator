import React from "react";
import Typography from "@material-ui/core/Typography";
import Job from "./Job";

export default function Jobs({ jobs }) {
  return (
    <div className={"jobs"}>
      <Typography variant={"h1"}>test</Typography>
      {jobs.map((job, index) => (
        <Job job={job} key={job.id + index} />
      ))}
    </div>
  );
}
