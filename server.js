const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectionString =
  "mongodb+srv://hoverstate:hoverstate@cluster0.hdzrd.mongodb.net/test";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("hoverstate-student");
    console.log("Connected to Database");

    const studentCollection = db.collection("student");

    // Handlers
    app.get("/", (req, res) => {
      db.collection("student")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { student: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/student", (req, res) => {
      studentCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/student", (req, res) => {
      console.log(req.body);
      studentCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          res.json(`Deleted Student`);
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, () => console.log("listening on 3000"));
  })
  .catch(console.error);
