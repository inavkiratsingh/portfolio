"use client"

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
import { useEffect } from "react"

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

export function Projects() {

  // const apiUrl = process.env.NEXT_PUBLIC_URI;
  
  // useEffect(() => {
  //   async function fetchTechnologies() {
  //     // console.log(apiUrl);
      
  //     try {
  //       const response = await fetch(`${apiUrl}/get-technology`, {
  //         method: "GET",
  //       });

  //       if (response.ok) {
  //         console.log(response);
          
  //         const data = await response.json();
  //         console.log(data);
          
  //       } else {
  //         console.error("Failed to fetch technologies:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching technologies:", error);
  //     }
  //   }

  //   fetchTechnologies();
  // }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                <Input placeholder="project title" className="focus:bg-zinc-800 text-zinc-400" {...field} />
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
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
