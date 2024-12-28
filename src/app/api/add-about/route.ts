import dbConnect from "@/lib/dbConnect";
import AboutModel from "@/model/About";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    await dbConnect();

    try {

        const { start, end, title, description, link, type } = await request.json();

        const newEvent = new AboutModel({
            start,
            end,
            title,
            description,
            link,
            type
        });

        await newEvent.save();
        
        
        return NextResponse.json(
            {
              success: true,
              message: 'Event added successfully',
            },
            { status: 200 }
        );
    } catch (error:any) {
        if(error.code === 11000) {
            return NextResponse.json(
                { success: false, message: 'Event title already exists.' },
                { status: 400 }
            );
        } else{
            console.log('Error', error);
            return NextResponse.json(
                { success: false, message: 'Error adding Event' },
                { status: 500 }
            );
        }
        
    }
}