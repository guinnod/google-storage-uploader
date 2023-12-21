const { Storage } = require("@google-cloud/storage");
const serviceAccountKey = require(process.env
    .GOFD_UPLOAD_SERVICE_KEY_FILE_PATH);

const googleStorage = new Storage({
    credentials: serviceAccountKey,
});

module.exports = googleStorage;
