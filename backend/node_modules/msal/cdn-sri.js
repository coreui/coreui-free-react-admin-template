/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const ssri = require("ssri");
const fs = require("fs");
const { version } = require("./package.json");

const readmeMdFilePath = "./README.md";
const cdnUsageFilePath = "./docs/cdn-usage.md";
const sriTableMarker = "<!-- SRI_TABLE_START -->";
const sriTableMarkerOffset = 3;

const latestVersionMarker = "<!-- CDN_LATEST -->";
const latestVersionMarkerOffset = 2;

const latestVersionString = `<script type="text/javascript" src="https://alcdn.msauth.net/lib/${version}/js/msal.min.js"></script>`;

async function generateSris() {
    // Read contents of README md file
    const readmeMd = await fs.promises.readFile(readmeMdFilePath, "utf8");
    const readMeMdLines = readmeMd.toString().split(/\r?\n/);
    
    // Update REAMDE
    const readmeInsertLineIndex = readMeMdLines.indexOf(latestVersionMarker);
    const readMeInsertIndex = readmeInsertLineIndex + latestVersionMarkerOffset;
    readMeMdLines.splice(readMeInsertIndex, 1, latestVersionString);

    // Write new README to disk
    const newReadMd = readMeMdLines.join("\n");
    await fs.promises.writeFile(readmeMdFilePath, newReadMd);
    
    // Read contents of cdn md file
    const cdnMd = await fs.promises.readFile(cdnUsageFilePath, "utf8");
    const cdnMdLines = cdnMd.toString().split(/\r?\n/);

    // Update basic usage
    const latestVersionInsertLineIndex = cdnMdLines.indexOf(latestVersionMarker);
    const latestVersionInsertIndex = latestVersionInsertLineIndex + latestVersionMarkerOffset;
    cdnMdLines.splice(latestVersionInsertIndex, 1, latestVersionString);
    
    // Generate entries for each file
    const unminifiedVersionSri = await generateSriTableEntry("msal.js", "    ");
    const minifiedVersionSri = await generateSriTableEntry("msal.min.js", "");
    
    // Add entries to table
    const sriInsertLineIndex = cdnMdLines.indexOf(sriTableMarker);
    const tableInsertIndex = sriInsertLineIndex + sriTableMarkerOffset;
    cdnMdLines.splice(tableInsertIndex, 0, minifiedVersionSri);
    cdnMdLines.splice(tableInsertIndex, 0, unminifiedVersionSri);
    
    // Write new file to disk
    const newCdnMd = cdnMdLines.join("\n");
    await fs.promises.writeFile(cdnUsageFilePath, newCdnMd);
}

async function generateSriTableEntry(file, padding) {
    const filePath = `./dist/${file}`;
    const fileStream = fs.createReadStream(filePath);
    const sri = await ssri.fromStream(fileStream, {
        algorithms: [ "sha384" ]
    });

    return `${version}   | ${file}${padding} | \`${sri.toString()}\``;
}

generateSris()
    .then(() => {
        process.exit(0);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
