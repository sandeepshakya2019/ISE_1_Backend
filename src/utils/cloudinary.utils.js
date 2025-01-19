import { v2 } from "cloudinary";
import fs from "fs";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async (localPath, username) => {
  try {
    if (!localPath) return null;
    const result = await v2.uploader.upload(localPath, {
      public_id: username,
      use_filename: true,
      resource_type: "auto",
    });
    console.log("[+] File uploaded to Cloudinary:", result.url);
    // fs.unlinkSync(localPath);
    return result;
  } catch (error) {
    console.error("[-] Error uploading to cloudinary", error);
    fs.unlinkSync(localPath);
    return null;
  }
};

export default uploadOnCloudinary;
