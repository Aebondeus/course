import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({extended:true}));

const start = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI || "here will be string", {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        app.listen(port, () => console.log(`App on port number ${port}`));
    }
    catch (e) {
        console.log("Error: ", console.log(e));
        process.exit(1);
    }
}