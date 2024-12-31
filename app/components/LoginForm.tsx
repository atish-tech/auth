"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LoginFormInputType } from "@/types/user";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn, SignInResponse } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { toast } from "sonner";

export default function LoginForm(): JSX.Element {
  const router: AppRouterInstance = useRouter();

  const [input, setInput] = useState<LoginFormInputType>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      ...input,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully");

      router.push("/dashboard");
    }
  }

  function onChangeInput(key: string, value: string): void {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-4">
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
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
            Don't have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-indigo-600 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
