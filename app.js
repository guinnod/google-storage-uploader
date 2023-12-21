const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const fileParser = require("express-multipart-file-parser");
const bodyParser = require("body-parser");

const { uploadPhotoController } = require("./google-storage.controllers");
const { requestPhotoValidator } = require("./google-storage.validators");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileParser);

app.post("/upload-photo", requestPhotoValidator, uploadPhotoController);

if (process.env.GOFD_UPLOAD_MODE == "DEV") {
    app.listen(8000, () => {
        console.log("SERVER STARTED");
    });
}

module.exports = app;
