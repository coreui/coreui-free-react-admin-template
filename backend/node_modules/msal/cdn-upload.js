/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const dotenv = require("dotenv");
const { BlobServiceClient } = require("@azure/storage-blob");
const pkg = require("./package.json");

dotenv.config({
    path: "../../.env"
});

const SIGNATURES = [
    process.env.CDN_EUNO_SAS,
    process.env.CDN_USWE_SAS
];

const FILES = [
    "msal.js",
    "msal.js.map",
    "msal.min.js",
    "msal.min.js.map"
];

async function uploadToCdn(sas) {
    const cdn = sas.split("?")[0];

    console.log("Starting uploads to CDN:", cdn);

    const blobServiceClient = new BlobServiceClient(sas);
    const containerClient = blobServiceClient.getContainerClient("");

    return Promise.all(FILES.map(async (file) => {
        const blobName = `lib/${pkg.version}/js/${file}`;
         
        console.log(cdn, blobName, "Uploading file");
    
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const fileName = `./dist/${file}`;

        try {
            const blobExists = await blockBlobClient.exists();

            if (!blobExists) {
                await blockBlobClient.uploadFile(fileName, { 
                    blobHTTPHeaders: { 
                        blobContentType: "text/javascript"
                    }
                });
    
                console.log(cdn, blobName, "Upload complete");
            } else {
                console.warn(cdn, blobName, "File exists");
            }
        } catch (e) {
            console.error(cdn, blobName, "Upload failed");
            console.error(cdn, blobName, e.statusCode, e.details.errorCode);
        }
    }));
}

Promise.all(SIGNATURES.map(sas => uploadToCdn(sas)))
    .then(results => {
        console.log("Uploads complete");
    })
    .catch((error) => {
        console.log("Upload error", error);
    })
    .finally(() => {
        process.exit(0);
    });

