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
  name: z.string(),
})

type Technology = {
  _id: string;
  name: string;
};

export function Technology({ projectId }: any) {

  const [data, setData] = useState<Technology[]>([]);



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

    fetchTechnologies();
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onDelete(techId: any) {
    console.log(techId);
    try{
      await axios.delete(`/api/delete-technology/?techId=${techId}`);
      console.log("deleted");
      
    } catch (error) {
      console.log(error);
      
    }
    
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      
      const response = await axios.post('/api/add-technology', values);
      
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
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

          
        <Button type="submit">Submit</Button>

        </form>
      </Form>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full border-collapse border border-zinc-700">
          <thead>
            <tr className="bg-zinc-900 text-zinc-300">
              <th className="px-4 py-2 text-left border border-zinc-700">Technology Name</th>
              <th className="px-4 py-2 text-left border border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tech, index) => (
              <tr key={index} className="hover:bg-zinc-800">
                <td className="px-4 py-2 border border-zinc-700 text-zinc-200">{tech.name}</td>
                <td className="px-4 py-2 border border-zinc-700">
                  <button
                    onClick={() => onDelete(tech._id)}
                    className="px-3 py-1 text-white bg-red-700 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
