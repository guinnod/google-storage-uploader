const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/heic",
    "image/heif",
];

const requestPhotoValidator = (req, res, next) => {
    if (!req.files || !req.files[0]) {
        return res.status(400).send("No file uploaded.");
    }

    if (req.files.length !== 1) {
        return res.status(400).send("Only one file is allowed.");
    }

    if (!allowedMimeTypes.includes(req.files[0].mimetype)) {
        return res.status(400).send("Uploaded file is not an image.");
    }
    next();
};

module.exports = {
    requestPhotoValidator,
};
