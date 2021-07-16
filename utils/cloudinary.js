import cloudinary from "cloudinary";
import { config } from '../config.js';


const cloud = cloudinary.v2;
cloud.config({
  cloud_name: process.env.CLOUD_NAME || config.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY || config.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET || config.CLOUD_SECRET,
});

export default cloud;
