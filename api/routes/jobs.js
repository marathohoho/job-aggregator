const router = require("express").Router();
const redis = require("redis"),
  client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

router.get("", async (req, res) => {
  try {
    await getAsync("github")
      .then(jobs_string => {
        // console.log(jobs_string);
        jobs_parsed = JSON.parse(jobs_string);
        console.log(jobs_parsed.length);
        res.status(200).json(jobs_parsed);
      })
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
