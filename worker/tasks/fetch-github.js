const fetch = require("node-fetch");

// redis setup
var redis = require("redis"),
  client = redis.createClient();
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseUrl = "https://jobs.github.com/positions.json";

async function fetchGithub() {
  let resultCount = 1,
    currentPage = 0;
  const all_jobs = [];

  while (resultCount > 0) {
    try {
      res = await fetch(`${baseUrl}?page=${currentPage}`).catch(() =>
        console.log("error insde the fetch block")
      );
      const jobs = await res
        .json()
        .catch(() => console.log("error inside the res.json block"));
      all_jobs.push(...jobs);
      console.log(`Got ${jobs.length} jobs on page ${currentPage}`);
      currentPage++;
      resultCount = jobs.length;
    } catch (err) {
      console.log(err);
    }
  }
  console.log(`got ${all_jobs.length} total jobs`);

  // filter the jobs by position
  // accept only the junior jobs
  const jrJobs = all_jobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    if (
      jobTitle.includes("sr.") ||
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("architect")
    ) {
      return false;
    }
    return true;
  });
  console.log(`Filtered down to ${jrJobs.length} jobs`);

  //   redis setGitHub
  await setAsync("github", JSON.stringify(jrJobs))
    .then(getGithubSuccess => console.log({ getGithubSuccess }))
    .catch(err => console.log(err));
}

fetchGithub();

module.exports = fetchGithub;
