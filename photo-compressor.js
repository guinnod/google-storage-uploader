const sharp = require("sharp");
const { cloneDeep } = require("lodash");

async function compressPhotoTo1MB(inputBuffer) {
    try {
        let quality = 90;
        let compressedBuffer = cloneDeep(inputBuffer);
        let width = (
            await sharp(compressedBuffer, { failOn: "none" }).metadata()
        ).width;

        while (compressedBuffer.length / 1024 > 1000 && quality >= 10) {
            compressedBuffer = await decreaseQualityOfPhoto({
                compressedBuffer,
                quality,
                width,
            });
            quality -= 10;
        }

        return compressedBuffer;
    } catch (error) {
        console.log("WARNING: COMPRESS FAILED", error);
        return false;
    }
}

const decreaseQualityOfPhoto = async ({ compressedBuffer, width, quality }) => {
    return await sharp(compressedBuffer, { failOn: "none" })
        .resize({
            width:
                Math.round(
                    0.9 *
                        (
                            await sharp(compressedBuffer, {
                                failOn: "none",
                            }).metadata()
                        )?.width
                ) || width,
        })
        .jpeg({ quality })
        .rotate()
        .toBuffer();
};

module.exports = {
    compressPhotoTo1MB,
};
