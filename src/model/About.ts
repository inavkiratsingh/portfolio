import mongoose, { Schema } from "mongoose";
import { About } from "@/types/about";

const AboutSchema: Schema<About> = new mongoose.Schema({
    start:{
        type: String,
        required: [true, 'Start date is required'],
        trim: true,
    },
    end:{
        type: String,
        required: [true, 'End date is required'],
        trim: true,
    },
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, "Description must be at least 10 characters long"],
    },
    link: {
        type: String,
        required: [true, 'Link is required']
    },
    type: {
        type: String,
        required: [true, 'type is required']
    },
})

const AboutModel = (mongoose.models.About as mongoose.Model<About>) || mongoose.model<About>('About', AboutSchema);

export default AboutModel;