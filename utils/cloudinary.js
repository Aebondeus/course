import cloudinary from "cloudinary";
import config from "../config";
const cloud = cloudinary.v2;
cloud.config({ // set it all as process.env
    cloud_name: process.env.CLOUD_NAME || config.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY || config.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET || config.CLOUD_SECRET
})

export default cloud;