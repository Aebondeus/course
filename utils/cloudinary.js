import cloudinary from "cloudinary";
const cloud = cloudinary.v2;
cloud.config({ // set it all as process.env
    cloud_name: 'mordorcloud', 
    api_key: '515163683432287', 
    api_secret: 'kb4CrGweJFJ3Nu-wj6u_O_Yh5o0' 
})

export default cloud;