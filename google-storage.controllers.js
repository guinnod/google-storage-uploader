const googleStorage = require("./google-storage.tools");
const { compressPhotoTo1MB } = require("./photo-compressor");

const uploadPhotoController = async (req, res) => {
    try {
        const image = req.files[0];
        let message = "Success";

        const compressedPhotoBuffer = await compressPhotoTo1MB(image?.buffer);

        if (compressedPhotoBuffer) {
            image.buffer = compressedPhotoBuffer;
        } else {
            message = "Photo didn't compressed";
        }

        const photoLink = await googleStorage.uploadPhoto(image);

        if (photoLink) {
            return res.send({ link: photoLink, message });
        } else {
            throw new Error("No photo link!");
        }
    } catch (err) {
        console.log("ERROR", err);
        return res.sendStatus(500);
    }
};

const googleStorageControllers = {
    uploadPhotoController,
};

module.exports = googleStorageControllers;
