"use client";

// library imports
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter, usePathname } from "next/navigation";
interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string | null;
  };
}

export default function Profile() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession() as { data: ExtendedSession | null };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (session?.user?.accessToken) {
      // fetch user profile if access token is available
      getUserProfile(session.user.accessToken);
    } else {
      // Redirect to `/login` if no access token or no session
      router.push("/auth/login?next=" + pathname);
    }
  }, []);

  const getUserProfile = (token: string) => {
    setLoadingProfile(true);
    fetch(`${baseUrl}/auth/user_profile`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setLoadingProfile(false);
      })
      .catch((error) => {
        // handle error here
        console.error(error);
      });
  };

  return (
    <>
      {" "}
      {loadingProfile ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>User Profile</p>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
      )}
    </>
  );
}