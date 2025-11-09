// /api/upload.js
import { writeFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body; // base64 image

    // Lưu vào folder tạm trên server
    const filePath = path.join(process.cwd(), "public", "temp-cert.png");
    const base64Data = data.replace(/^data:image\/png;base64,/, "");
    await writeFile(filePath, base64Data, "base64");

    // Trả về URL public
    const url = `${req.headers.origin}/temp-cert.png`;
    res.status(200).json({ url });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
