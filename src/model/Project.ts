import mongoose, { Schema } from "mongoose";
import { Project } from "@/types/projects";

const ProjectSchema: Schema<Project> = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
        minlength: [50, "Description must be at least 50 characters long"],
    },
    about: {
        type: String,
        required: [true, 'About is required'],
        minlength: [200, "About must be at least 200 characters long"],
    },
    technologies:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technologies" }],
        default: [],
    },
    websiteLink: {
        type: String,
        required: [true, 'Link is required'],
    },
    githubLink: {
        type: String,
        required: [true, 'Github Link is required'],
    },
    publicImgId: {
        type: String,
        required: [true, 'Project Image is required'],
    },
})

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || mongoose.model<Project>('Project', ProjectSchema);

export default ProjectModel;