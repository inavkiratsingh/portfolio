import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Project";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId'); 
    try {
        const project = await ProjectModel.find({_id: projectId});
        
        return NextResponse.json(
            {
                success: true,
                data: project,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching project:', error);

        return NextResponse.json(
            { success: false, message: 'Error fetching project' },
            { status: 500 }
        );
    }
}
