# Google Storage Uploader

## Overview

The Google Storage Uploader is designed to efficiently handle image uploads to Google Cloud Storage. It compresses images to a maximum size of 1 MB before uploading, supporting various image formats. This makes it an ideal solution for applications requiring optimized storage management of image files.

## Supported Image Formats

This application accepts image files in the following formats:
- `image/jpeg`
- `image/png`
- `image/gif`
- `image/heic`
- `image/heif`

## Functionality

Upon receiving an image file, the uploader compresses it to ensure the file size does not exceed 1 MB. If the original file is larger than 1 MB, it will be compressed to meet this limit. After compression, the image is uploaded to your specified Google Cloud Storage bucket, and the URL of the uploaded image is returned.

## Usage

### Endpoint

`POST https://your-google-cloud-function-url/`

### Body

- **Type:** `multipart/form-data`
- **Content:** A single image file of the supported types.

### Example Request

Here’s how to send an image using `curl`:

```bash
curl -X POST https://your-google-cloud-function-url/ \
     -F "image=@path_to_your_image.jpeg" \
     -H "Content-Type: multipart/form-data"
```
Replace `path_to_your_image.jpeg` with the path to the image you wish to upload.

### Setup and Execution
Environment Setup
Before running the server, you must configure the following environment variables in a `.env` file:

- **GOFD_UPLOAD_MODE:** Set this to DEV if you want to run the server locally.
- **GOFD_UPLOAD_SERVICE_KEY_FILE_PATH:** Path to the Google-generated .json file containing your service account credentials. [Manage service account keys.](https://cloud.google.com/iam/docs/keys-create-delete)
- **GOFD_UPLOAD_PHOTO_BUCKET_NAME:** The name of your Google Cloud Storage bucket where the files will be saved.
  
## Getting started
- Ensure you have Node.js installed on your machine.
- Install all required dependencies using npm:
  `npm install`
- Starting the Server
  `npm start`
  
### Deploying to Google Cloud Functions
This project is configured to run as a Google Cloud Function. Ensure that you have set up all the necessary configurations and permissions in your Google Cloud Console before deployment.
