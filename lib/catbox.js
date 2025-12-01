
const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');
const catbox = new Catbox();

// Upload ANY local file
async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    return uploadResult;
  } catch (error) {
    throw new Error(`Catbox upload failed: ${error.message}`);
  }
}

// Upload logo FROM THE WEB
async function uploadLogoFromWeb(imageUrl) {
  try {
    // Temp file name
    const fileName = "unknown_logo.png";
    const tempPath = path.join(__dirname, fileName);

    // Download the image
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    await fs.writeFile(tempPath, response.data);

    // Upload to Catbox
    const uploadedUrl = await uploadToCatbox(tempPath);

    // Delete temp file
    await fs.remove(tempPath);

    return uploadedUrl;
  } catch (err) {
    throw new Error(`Failed to fetch & upload logo: ${err.message}`);
  }
}

module.exports = { uploadToCatbox, uploadLogoFromWeb };
