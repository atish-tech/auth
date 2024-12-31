import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">
        Welcome to the Authentication Template
      </h1>
      <p className="mt-4">This is a public page that anyone can access.</p>
    </Layout>
  );
}
