import { Document, Types } from "mongoose";

export interface About extends Document{
  start: string;
  end: string;
  title: string;
  description: string;
  link: string;
  type: string;
}
