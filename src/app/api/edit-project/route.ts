import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Project";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { projectId, title, description, about, technologies, websiteLink, githubLink, publicImgId } = await request.json();
        console.log(projectId);
        
        if (!projectId) {
            return NextResponse.json(
                { success: false, message: "Project ID is required." },
                { status: 400 }
            );
        }

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            projectId,
            {
                title,
                description,
                about,
                technologies,
                websiteLink,
                githubLink,
                publicImgId,
            },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return NextResponse.json(
                { success: false, message: "Project not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Project updated successfully",
                data: updatedProject,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error", error);
        return NextResponse.json(
            { success: false, message: "Error updating project" },
            { status: 500 }
        );
    }
}
