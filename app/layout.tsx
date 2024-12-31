import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Authentication",
  description: "Authentication template with Next.js 15 and NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider> */}
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
