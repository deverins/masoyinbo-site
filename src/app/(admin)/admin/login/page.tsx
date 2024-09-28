"use client";
import { API_URL } from '@/constants/api';
import { useAuth } from "@/hooks/AuthContext";
import { userLoginSchema } from "@/validationSchema/loginSchema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

const LogIn = () => {
  const URL = `${API_URL}/v1/auth/login`;
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { login } = useAuth();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { data } = await axios.post(URL, values);
      login(data.user);
      window.dispatchEvent(new Event("loginStatusChanged"));

      if (data.user?.role === "admin") {
        toast.success("Login successful as Admin");
        return navigate.push(`/admin/dashboard`);
      } else {
        toast.success("Login successful");
        return navigate.push(`/`);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit,
  });

  if (!isMounted) {
    return <div className="loader mx-auto mt-56 items-center ease-linear rounded-full border-4 border-t-4 h-12 w-12 animate-spin" />;
  }
  return (
    <div>
      <section>
        <main className="flex justify-center items-center py-10 px-4">
          <div className=" w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 shadow-lg p-6 rounded">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-neutral-300">
                  Email Address
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineMail className="mr-2 text-gray-500 dark:text-neutral-300" />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email Address"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border  focus:ring focus:ring-primary-light rounded-lg"
                  />
                </div>
                <span className="text-red-500">{errors.email}</span>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-500 dark:text-neutral-300">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineLock className="mr-2 text-gray-500 dark:text-neutral-300" />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border  focus:ring focus:ring-primary-light rounded-lg"
                  />
                </div>
                <span className="text-red-500">{errors.password}</span>
              </div>

              {loading ? (
                <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 h-12 w-12 animate-spin" />
              ) : (
                <button
                  className="w-full bg-primary-light text-neutral-200  text-sm sm:text-base font-bold py-2 px-4 rounded-md  outline-none focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:ring-offset-2 focus:ring-offset-yellow-100"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </button>
              )}

              <div className="flex justify-between mt-2">
                <div>
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-500 dark:text-neutral-300">Remember me</span>
                </div>
                <Link href="/forgot-password" className="text-primary-light dark:text-neutral-200">
                  Forgot password?
                </Link>
              </div>

              <div className="flex mt-2">
                <p className="text-gray-500 dark:text-neutral-300">
                  Don&apos;t have an account{" "}
                  <span>
                    <Link href="/admin/signup" className="text-gray-500 dark:text-neutral-300 hover:underline hover:text-primary-light dark:hover:text-neutral-200">
                      Register
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default LogIn;
