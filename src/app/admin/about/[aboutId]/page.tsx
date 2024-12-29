"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Description } from "@radix-ui/react-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@radix-ui/react-checkbox"
import { useEffect } from "react"
import axios from "axios"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"

const formSchema = z.object({
  start: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  end: z.string().min(2, {
    message: "Description must be at least 2 characters."
  }),
  title: z.string().min(5, {
    message: "About must be at least 5 characters."
  }),
  description: z.string().min(10, {
    message: "About must be at least 10 characters."
  }),
  link: z.string().min(5, {
    message: "About must be at least 5 characters."
  }),
  type: z.string(),
})


export default function Page() {
    const params = useParams();
    const aboutId = params.aboutId;
    console.log(aboutId);
    
    function setForm(title:string, description:string, start:string, end:any, link:string, type:string) {
        form.setValue("title", title);
        form.setValue("description", description);
        form.setValue("start", start);
        form.setValue("end", end);
        form.setValue("type", type);
        form.setValue("link", link);
    }
    const fetchAbout = async () => {
        try {
            const response = await axios.get(
                `/api/get-about?aboutId=${aboutId}`
            );
            const {title, description, start, end, link, type} = response.data.data[0];
            setForm(title, description, start, end, link, type);
        
        } catch (error) {
        console.log(error);      
        } 
    };


  useEffect(() => {
    
    if(aboutId) {
      fetchAbout();
    }

  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      console.log('in try', values);
      
    //   const response = await axios.post('/api/add-project', values);
      console.log(values);
      
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-zinc-100">Title</FormLabel>
                <FormControl>
                    <Input
                    placeholder="About title"
                    className="focus:bg-zinc-800 text-zinc-400"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Description */}
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-zinc-100">Description</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="About description"
                    rows={4}
                    className="resize-none focus:bg-zinc-800 text-zinc-400"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Start and End Dates */}
            <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-zinc-100">Start Date (YYYY or YYYY-MM or YYYY-MM-DD)</FormLabel>
                <FormControl>
                    <Input
                    placeholder="e.g., 2024, 2024-12, 2024-12-28"
                    className="focus:bg-zinc-800 text-zinc-400"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-zinc-100">End Date (YYYY or YYYY-MM or YYYY-MM-DD)</FormLabel>
                <FormControl>
                    <Input
                    placeholder="e.g., 2024, 2024-12, 2024-12-28"
                    className="focus:bg-zinc-800 text-zinc-400"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Link */}
            <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-zinc-100">Link</FormLabel>
                <FormControl>
                    <Input
                    placeholder="Relevant link (e.g., website-http:// or portfolio-http://)"
                    className="focus:bg-zinc-800 text-zinc-400"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Type (Checkboxes for Study, Skill, Experience) */}
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-zinc-100">Type</FormLabel>
                <FormControl>
                    <RadioGroup
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="space-y-2"
                    >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Study" id="study" />
                        <Label htmlFor="study" className="text-sm font-medium leading-none text-zinc-400">
                        Study
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Skill" id="skill" />
                        <Label htmlFor="skill" className="text-sm font-medium leading-none text-zinc-400">
                        Skill
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Experience" id="experience" />
                        <Label htmlFor="experience" className="text-sm font-medium leading-none text-zinc-400">
                        Experience
                        </Label>
                    </div>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Submit Button */}
            {aboutId!="new" ? (
                <div className="flex space-x-4">
                    <Button 
                    type="button" 
                    // onClick={async () => {
                    //     try {
                    //     const update = {
                    //         ...form.getValues(),
                    //         publicImgId,
                    //         projectId
                    //     };
                    //     console.log("Editing project:", update);

                    //     const response = await axios.post(`/api/edit-project`, update);
                    //     let project = response.data.data;
                    //     setForm(project.title, project.description, project.about, project.technologies, project.websiteLink, project.githubLink, project.publicImgId);
                    //     } catch (error) {
                    //     console.error("Error updating project:", error);
                    //     }
                    // }}
                    >
                    Save
                    </Button>
                    <Button 
                    type="button" 
                    variant="destructive"
                    // onClick={async () => {
                    //     try {
                    //     await axios.delete(`/api/delete-project/?projectId=${projectId}`);
                    //     console.log("Project deleted");
                    //     } catch (error) {
                    //     console.error("Error deleting project:", error);
                    //     }
                    // }}
                    >
                    Delete
                    </Button>
                </div>
                ) : (
                <Button type="submit">Submit</Button>
                )}
        </form>
    </Form>

  )
}
