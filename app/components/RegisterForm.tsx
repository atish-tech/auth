"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RegisterFormInputType } from "@/types/user";
import { toast } from "sonner";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { IconBrandGithub } from "@tabler/icons-react";

export default function RegisterForm() {
  const router: AppRouterInstance = useRouter();

  const [input, setInput] = useState<RegisterFormInputType>({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    try {
      e.preventDefault();

      await axios.post("/api/register", {
        body: input,
      });

      toast.success("User registered successfully");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  function onChangeInput(key: string, value: string): void {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="my-8">
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </Label>
          <Input
            type="text"
            id="name"
            value={input.name}
            onChange={(e) => onChangeInput("name", e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={input.email}
            onChange={(e) => onChangeInput("email", e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            value={input.password}
            onChange={(e) => onChangeInput("password", e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <Button
          type="submit"
          className="w-full flex justify-center mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          // onClick={handleSubmit}
        >
          Register
        </Button>
      </form>

      <div>
        <div className="flex items-center justify-center w-full gap-2 my-3">
          <div className="w-full">
            <Separator className=" h-[3px] rounded-full" />
          </div>

          <p>Or</p>

          <div className="w-full">
            <Separator className=" h-[3px] rounded-full" />
          </div>
        </div>

        <Button
          onClick={() => signIn("github")}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <IconBrandGithub className="w-8 h-8" />
        </Button>

        <div className="mt-5 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-indigo-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
