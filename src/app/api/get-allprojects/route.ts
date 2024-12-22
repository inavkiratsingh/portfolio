import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Project";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();
    const url = new URL(request.url);
    try {
        const project = await ProjectModel.find({});
        
        return NextResponse.json(
            {
                success: true,
                data: project,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching projects:', error);

        return NextResponse.json(
            { success: false, message: 'Error fetching projects' },
            { status: 500 }
        );
    }
}
