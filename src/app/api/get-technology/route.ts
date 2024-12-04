import dbConnect from "@/lib/dbConnect";
import TechnologyModel from "@/model/Technology";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const technologies = await TechnologyModel.find({});
        
        return NextResponse.json(
            {
                success: true,
                data: technologies,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching technologies:', error);

        return NextResponse.json(
            { success: false, message: 'Error fetching technologies' },
            { status: 500 }
        );
    }
}
