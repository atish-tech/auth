import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Layout from "../components/Layout";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">
        Welcome, {session.user?.name || "User"}! This is a protected page.
      </p>
    </Layout>
  );
}
