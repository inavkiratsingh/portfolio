import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/Project";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const { title, description, about, technologies, websiteLink, githubLink } = await request.json();
        // console.log(title, about);

        const newProject = new ProjectModel({
            title,
            description,
            about,
            technologies,
            websiteLink, 
            githubLink
        });

        await newProject.save();
        
        
        return Response.json(
            {
              success: true,
              message: 'Project added successfully',
            },
            { status: 200 }
        );
    } catch (error:any) {
        if(error.code === 11000) {
            return Response.json(
                { success: false, message: 'Project title already exists.' },
                { status: 400 }
            );
        } else{
            console.log('Error', error);
            return Response.json(
                { success: false, message: 'Error adding Project' },
                { status: 500 }
            );
        }
        
    }
}