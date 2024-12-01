import mongoose, { Schema } from "mongoose";
import { Technologies } from "@/types/technologies";

const TechnologySchema: Schema<Technologies> = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
});

const TechnologyModel = (mongoose.models.Technologies as mongoose.Model<Technologies>) || mongoose.model<Technologies>('Technologies', TechnologySchema);

export default TechnologyModel;