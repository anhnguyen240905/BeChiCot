// pages/api/upload-cert.js
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { imageBase64 } = req.body; // client gửi base64

      // Xử lý base64 -> buffer
      const base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Lưu file vào /public/uploads (tạo thư mục trước nhé)
      const timestamp = Date.now();
      const filename = `cert-${timestamp}.png`;
      const filePath = path.join(process.cwd(), "public", "uploads", filename);

      await fs.writeFile(filePath, buffer);

      // Trả về URL public
      const url = `${req.headers.origin}/uploads/${filename}`;
      res.status(200).json({ url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
