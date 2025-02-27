const cloudinary = require('cloudinary').v2;
cloudinary.config();

// Utility function to upload image to Cloudinary
exports.uploadToCloudinary = async (filePath) => {
    if (!filePath) return null;
    try {
      const result = await cloudinary.uploader.upload(filePath);
      return result.url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  }