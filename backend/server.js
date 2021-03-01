const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.Port || 5000;

app.use("/", express.static(path.join(__dirname, "/client/build")));

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;

mongoose.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log("Connection Error");
    } else {
      console.log("Connected to database successfully!");
    }
  }
);

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
