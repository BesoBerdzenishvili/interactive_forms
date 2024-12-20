import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.VITE_COUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_COUDINARY_KEY,
  api_secret: import.meta.env.VITE_COUDINARY_SECRET,
});
