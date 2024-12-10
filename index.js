const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const fileParser = require("express-multipart-file-parser");
const bodyParser = require("body-parser");

const s3 = require("./aws.config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileParser);

app.post("/upload", async (req, res) => {
  const file = req.files?.[0];
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const fileName = `${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET || "",
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
    res.json({ message: "File uploaded successfully", url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
});

app.listen(8080, () => {
  console.log("SERVER STARTED");
});

module.exports = app;
