import express from "express";
import cors from "cors";
const db = require("./app/models");
const app = express();
require('dotenv').config()

//API should only work on given domain, not allow to access on any other domain,it should gives CORS error
const corsOptions = { origin: "http://localhost:3000/" };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to initCoder application." });
});


app.use('/', require('./app/routes')) // routes

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
