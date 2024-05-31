import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../environtment";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryUploadOptions = async (
  category: string,
  image: string
): Promise<{ secureUrl: string | undefined; publicId: string | undefined }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `tours app/${category}` }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            secureUrl: result?.secure_url,
            publicId: result?.public_id,
          });
        }
      })
      .end(image);
  });
};

export const cloudImage = {
  upload: {
    tour: async (image: string) => {
      return await cloudinaryUploadOptions("tours", image);
    },
  },
  delete: async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
  },
};
