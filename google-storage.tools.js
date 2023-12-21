const googleStorage = require("./google-storage.config");
const { transliterate } = require("transliteration");

const photoBucket = googleStorage.bucket(
    process.env.GOFD_UPLOAD_PHOTO_BUCKET_NAME
);

const baseCloudPath = `https://storage.googleapis.com/${photoBucket.name}`;

const getFormattedPhotoName = (originalname) => {
    return `photo_${Date.now()}_${transliterate(
        originalname.replace(/ /g, "_")
    )}`;
};

const uploadPhoto = (file) => {
    return new Promise((resolve, reject) => {
        const { originalname, buffer } = file;
        const formattedName = getFormattedPhotoName(originalname);
        const blob = photoBucket.file(`photos/${formattedName}`);

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream
            .on("finish", () => {
                const publicUrl = `${baseCloudPath}/photos/${formattedName}`;

                resolve(publicUrl);
            })
            .on("error", () => {
                reject(`Unable to upload image, something went wrong`);
            })
            .end(buffer);
    });
};

const googleStorageTools = {
    uploadPhoto,
};

module.exports = googleStorageTools;
