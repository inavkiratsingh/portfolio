import dbConnect from "@/lib/dbConnect";
import AboutModel from "@/model/About";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();
    const url = new URL(request.url);
    const aboutId = url.searchParams.get('aboutId'); 
    try {
        const about = await AboutModel.find({_id: aboutId});
        
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
