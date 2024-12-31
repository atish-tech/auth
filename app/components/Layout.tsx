"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                Home
              </Link>
            </div>
            <div className="flex items-center">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-gray-900 mx-4"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 mx-4"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
