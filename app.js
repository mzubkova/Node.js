const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const app = express();

const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: true }));

ObjectId = require("mongodb").ObjectId;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Node-multer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected!");
});

const port = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// app.get("/", (req, res) => {
//   res.json({ welcome: "Hello World!" });
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/uploads", upload.single("picture"), (req, res) => {
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString("base64");

  let finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64"),
  };
  db.collection("Node-multer").insertOne(finalImg, (err, result) => {
    console.log(result);

    if (err) return console.log(err);

    console.log("saved to database MongoDB");
    res.redirect("/");
  });
});

app.get("/image/:id", (req, res) => {
  var filename = req.params.id;

  db.collection("Node-multer").findOne(
    { _id: ObjectId(filename) },
    (err, result) => {
      if (err) return console.log(err);

      res.contentType("image/jpeg");
      res.send(result.image.buffer);
    }
  );
});

app.listen(port, function () {
  console.log(`Server started on port on ${port}`);
});
