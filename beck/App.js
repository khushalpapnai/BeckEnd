const fs = require("fs");
const express = require("express");
const place_server = require("./routes/place_server");
const user_server = require("./routes/user_server");
const bodyparser = require("body-parser");
const Httperror = require("./models/http-error");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const App = express();

App.use(bodyparser.json());

App.use("/upload/image", express.static(path.join("upload", "image")));

App.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

App.use("/api/places", place_server);
App.use("/api/user", user_server);
// Serve frontend static files
App.use(express.static(path.join(__dirname, "front", "build")));

App.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "build", "index.html"));
});
App.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });
  }

  const status = typeof error.code === 'number' ? error.code : 500;

  // Optional: log error details for debugging
  console.error("Error occurred:", {
    message: error.message,
    code: error.code,
    stack: error.stack
  });

  res.status(status).json({ message: error.message || "No response from server" });
});

{
  mongoose
    .connect(
      process.env.MONGO_URI
    )
    .then(() => {
      App.listen(process.env.PORT||5000);
      console.log("connected to beckend");
    })
    .catch((err) => {
      console.log("faild to connect", err);
    });
}
