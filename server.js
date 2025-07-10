require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const api = require("./src/api/router");
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
