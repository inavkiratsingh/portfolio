import dbConnect from "@/lib/dbConnect";
import TechnologyModel from "@/model/Technology";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { name } = await request.json();
        console.log(name);
        
        const newTech = new TechnologyModel({
            name,
        });

        await newTech.save();
        
        return Response.json(
            {
              success: true,
              message: 'Technology added successfully',
            },
            { status: 200 }
        );
    } catch (error: any) {
        if(error.code === 11000) {
            return Response.json(
                { success: false, message: 'Technology already exists.' },
                { status: 400 }
            );
        }else {
            console.log('Error', error);
            return Response.json(
                { success: false, message: 'Error adding Technology' },
                { status: 500 }
            );
        }
        
    }
}