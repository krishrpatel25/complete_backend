import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile(file) {
   const result = await imagekit.files.upload({
     file: file.buffer.toString("base64"),
     fileName: file.originalname,
   });
  
  return result;
}
