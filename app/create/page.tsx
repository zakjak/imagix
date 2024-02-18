"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    image: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })
 
function page() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          image: "",
        },
      })

      function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }

  return (
    <div className="">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[80%] mx-auto mt-4 gap-2">
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input className="" placeholder="Enter your description" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <div className="">

        </div>
    </div>

  )
}

export default page