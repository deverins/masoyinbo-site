"use client"
import { API_URL } from "@/constants/api";
import { userRegisterationSchema } from "@/validationSchema/userSchema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const SignUp = () => {

  const URL = `${API_URL}/v1/auth/signup`;
  const [loading, setLoading] = useState(false);
  const navigate = useRouter()
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { data } = await axios.post(URL, values, {});
      navigate.push('/admin/login')
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      toast.success("User registered successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.error("Sign up error:", error);

    } finally {

      setLoading(false);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: userRegisterationSchema,
    onSubmit,
  });

  return (
    <div>
      <section>
        <main className="flex justify-center items-center py-10 px-4">
          <div className=" w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 shadow-lg p-6 rounded">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-neutral-300">
                  fullName
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500 dark:text-neutral-300 " />
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    autoComplete="false"
                    placeholder="fullName"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border  focus:ring focus:ring-primary-light rounded-lg"
                  />
                </div>
                <span className="text-red-500">{errors.fullName}</span>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-500 dark:text-neutral-300">
                  Username
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500 dark:text-neutral-300 " />
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    autoComplete="false"
                    placeholder="Username"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border  focus:ring focus:ring-primary-light rounded-lg"
                  />
                </div>
                <span className="text-red-500">{errors.username}</span>
              </div>
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
                <div></div>
              ) : (
                <button
                  className="w-full bg-primary-light text-neutral-200  text-sm sm:text-base font-bold py-2 px-4 rounded-md  outline-none focus:outline-none focus:ring-2 focus:ring-primary-lightBlack focus:ring-offset-2 focus:ring-offset-primring-primary-lightBlack"
                  type="submit"
                  disabled={loading}
                >
                  Sign Up as Admin
                </button>
              )}
              <div className="text-center mt-4 mb-14">
                <p className="text-gray-500 dark:text-neutral-300">Already have an admin account?</p>
                <Link href="/admin/login" className="text-sm sm:text-base text-gray-500 dark:text-neutral-300 hover:underline hover:text-primary-light dark:hover:text-neutral-200">Admin Login here</Link>
              </div>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default SignUp;
