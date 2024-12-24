import dbConnect from "@/lib/dbConnect";
import TechnologyModel from "@/model/Technology";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    await dbConnect();
    const url = new URL(request.url);
    const techId = url.searchParams.get('techId'); 
    try {
        const deletedTech = await TechnologyModel.findByIdAndDelete(techId);

        if (!deletedTech) {
            return NextResponse.json({
                success: false,
                message: 'Technology Not found',
            },
            { status: 400 })
        }
        
        return NextResponse.json(
            {
                success: true,
                message: 'Technology Deleted Successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error Deleting technoloy:', error);

        return NextResponse.json(
            { success: false, message: 'Error Deleting technoloy' },
            { status: 500 }
        );
    }
}
