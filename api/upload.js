import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { imageBase64 } = req.body;

      const uploadResp = await cloudinary.uploader.upload(imageBase64, {
        folder: "certs",
      });

      res.status(200).json({ url: uploadResp.secure_url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
