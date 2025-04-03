"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { urlBase } from "@/utils/urlBase";
import { useToast } from "./ui/use-toast";
import {signIn} from "next-auth/react"


const formSchema = z.object({
  email: z.string(),
  password: z.string()
  
});

export function LoginForm() {
   
      const [isLoading,setIsloading]=useState(false)
      const {toast}=useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    
    },
  });

 




 

  async function onSubmit(values: z.infer<typeof formSchema>) {
try{

     console.log("hello world");
     
}
     
   
   catch(error){
    console.log(error);
    

   }
   finally{
     setIsloading(false)
      
   }
    
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border w-[500px]"
      >
        <div className="flex flex-col gap-2 border w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
       

         <Button type="submit" >{!isLoading?"login":<div className="w-6 h-6 border-t-2 border-b-black rounded-full animate-spin"></div>}</Button>
      </form>
      <div>
        <Button onClick={()=>{signIn("google")}}>login with google</Button>
      </div>
    </Form>
  );
}
