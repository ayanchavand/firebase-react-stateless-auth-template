const express = require("express");
const middleware = require("./middleware/index");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(middleware.verifyToken);

app.get("/", (req, res) => {
  return res.send("home");
});

app.get("/api/test", (req, res) => {
  return res.json({
    Test: "test",
  });
});

app.listen(PORT, () => {
  console.log(`Server is active on http://localhost${PORT}`);
});
