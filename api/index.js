const app = require("express")();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

app.use(cors());
app.use("/api/jobs", require("./routes/jobs"));

app.listen(PORT, console.log(`connected to port ${PORT}`));
