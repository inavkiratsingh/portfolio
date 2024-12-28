import dbConnect from "@/lib/dbConnect";
import AboutModel from "@/model/About";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();
    try {
        const about = await AboutModel.find({});
        
        return NextResponse.json(
            {
                success: true,
                data: about,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching about:', error);

        return NextResponse.json(
            { success: false, message: 'Error fetching about' },
            { status: 500 }
        );
    }
}
