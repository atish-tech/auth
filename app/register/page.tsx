import Layout from "../components/Layout";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="px-8 py-6 rounded-md mt-4 text-left bg-white fixed dark:bg-gray-800 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-black  dark:text-white">
            Register to your account
          </h3>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}