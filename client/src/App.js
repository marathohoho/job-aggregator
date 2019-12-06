import React, { useEffect, useState } from "react";
import "./App.css";
import Jobs from "./components/Jobs";

const mockJobs = [
  { title: "SWE", company: "Google" },
  { title: "SWE", company: "Amazon" },
  { title: "SWE", company: "Facebook" }
];

const JOB_API_URL = "/api/jobs";

const fetchGithub = async updateJL => {
  try {
    await fetch(JOB_API_URL)
      .then(async response => {
        const jobs = await response.json();
        updateJL(jobs);
        console.log({ jobs });
      })
      .catch(err => console.log(err));
  } catch (err) {
    console.log("error");
  }
};

function App() {
  const [jobsList, setJobs] = useState([]);

  useEffect(() => {
    fetchGithub(setJobs);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;
