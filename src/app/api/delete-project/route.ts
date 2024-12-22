import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Project";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    await dbConnect();
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId'); 
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return NextResponse.json({
                success: false,
                message: 'Project Not found',
            },
            { status: 400 })
        }
        
        return NextResponse.json(
            {
                success: true,
                message: 'Project Deleted Successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error Deleting project:', error);

        return NextResponse.json(
            { success: false, message: 'Error Deleting project' },
            { status: 500 }
        );
    }
}
