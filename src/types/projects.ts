import { Document, Types } from "mongoose";
import { Technologies } from "./technologies";

export interface Project extends Document{
  title: string;
  description: string;
  about: string;
  technologies: Types.ObjectId[];
  websiteLink: string;
  githubLink: string;
}
