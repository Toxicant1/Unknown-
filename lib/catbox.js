const { Catbox } = require("node-catbox");
const fs = require("fs-extra");
const axios = require("axios");

const catbox = new Catbox();

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

// Example usage:
(async () => {
  try {
    const result = await uploadToCatbox("unknown_logo.png");
    console.log("Uploaded successfully!");
    console.log("Catbox URL:", result.url || result);
  } catch (err) {
    console.error("Error uploading file:", err.message);
  }
})();
