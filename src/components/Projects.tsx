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
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { useEffect, useState } from "react"
import axios from "axios"
import { CldImage, CldUploadWidget } from 'next-cloudinary';

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters."
  }),
  about: z.string().min(200, {
    message: "About must be at least 50 characters."
  }),
  technologies: z
    .array(z.string())
    .optional()
    .default([])
    .refine((tech) => Array.isArray(tech), {
      message: "Technologies must be an array of strings.",
    }),
  websiteLink: z.string().url({
    message: "Website Link must be a valid URL.",
  }),
  githubLink: z.string().url({
    message: "GitHub Link must be a valid URL.",
  }),
})


export function Projects({ projectId }: any) {
  function setForm(title:string, description:string, about:string, technologies:any, websiteLink:string, githubLink:string, publicImgId: string) {
    form.setValue("title", title);
    form.setValue("description", description);
    form.setValue("about", about);
    form.setValue("technologies", technologies);
    form.setValue("websiteLink", websiteLink);
    form.setValue("githubLink", githubLink);
    setPublicImgId(publicImgId);
  }
  const [data, setData] = useState([]);
  const [publicImgId, setPublicImgId] = useState("");
  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `/api/get-project?projectId=${projectId}`
      );
      const {title, description, about, technologies, websiteLink, githubLink, publicImgId} = response.data.data[0];
      setForm(title, description, about, technologies, websiteLink, githubLink, publicImgId);
      setForm
    } catch (error) {
      console.log(error);      
    } 
  };


  useEffect(() => {
    async function fetchTechnologies() {
      
      try {
        const response = await fetch(`/api/get-technology`, {
          method: "GET",
        });

        if (response.ok) {          
          const tech = await response.json();
          setData(tech.data);
        
        } else {
          console.error("Failed to fetch technologies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    }

    if(projectId) {
      fetchProject();
    }

    fetchTechnologies();
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const update = {
        ...values,
        publicImgId
      }
      console.log('in try', update);
      
      const response = await axios.post('/api/add-project', update);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-100">Title</FormLabel>
              <FormControl>
                <Input
                placeholder="project title" 
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-100">Description</FormLabel>
              <FormControl>
                <Input placeholder="project description" className="focus:bg-zinc-800 text-zinc-400" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-100">About</FormLabel>
              <FormControl>
                <Textarea placeholder="Write About the Project" rows={4} className="resize-none focus:bg-zinc-800 text-zinc-400" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-100">Technologies used in this project</FormLabel>
              <FormControl>
              <div className="space-y-2">
                {data?.map((tech:any) => (
                  <div key={tech._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={tech._id}
                      value={tech._id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), tech._id]);
                        } else {
                          field.onChange(
                            field.value.filter((item) => item !== tech._id)
                          );
                        }
                      }}
                      checked={field.value?.includes(tech._id) || false}
                    />
                    <label
                      htmlFor={tech._id}
                      className="text-sm font-medium leading-none text-zinc-400"
                    >
                      {tech.name}
                    </label>
                  </div>
                ))}
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {publicImgId && (
            <CldImage src = {publicImgId} alt = {publicImgId} width = {"300"} height = {"300"} />
          )}
          <CldUploadWidget
          onSuccess={({event, info}) => {
            if (typeof info === 'object' && 'public_id' in info) {
              setPublicImgId(info.public_id);
            } else {
              console.error("Unexpected 'info' format:", info);
            }
          }}
          onError={(error) => console.error("Upload failed:", error)}
          options={{ sources: ['local', 'url', 'unsplash'] }}
          uploadPreset="shk7pnqu">
            {({ open }) => {
              return (
                <button onClick={() => open()} className="bg-red-500 px-6 py-3 rounded-md text-zinc-200 mt-2">
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        <FormField
          control={form.control}
          name="websiteLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-100">Website Link</FormLabel>
              <FormControl>
                <Input placeholder="Valid Live Website Link" className="focus:bg-zinc-800 text-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-100">Github Link</FormLabel>
              <FormControl>
                <Input placeholder="Valid Github repositry link" className="focus:bg-zinc-800 text-zinc-400" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {projectId ? (
          <div className="flex space-x-4">
            <Button 
              type="button" 
              onClick={async () => {
                try {
                  const update = {
                    ...form.getValues(),
                    publicImgId,
                    projectId
                  };
                  console.log("Editing project:", update);

                  const response = await axios.post(`/api/edit-project`, update);
                  let project = response.data.data;
                  setForm(project.title, project.description, project.about, project.technologies, project.websiteLink, project.githubLink, project.publicImgId);
                } catch (error) {
                  console.error("Error updating project:", error);
                }
              }}
            >
              Save
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={async () => {
                try {
                  await axios.delete(`/api/delete-project/?projectId=${projectId}`);
                  console.log("Project deleted");
                } catch (error) {
                  console.error("Error deleting project:", error);
                }
              }}
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
