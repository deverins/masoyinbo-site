"use client"
import { API_URL } from "@/constants/api";
import { userLoginSchema } from "@/validationSchema/loginSchema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

const LogIn = () => {

  const URL = `${API_URL}/v1/auth/login`;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      const { data } = await axios.post(URL, values);

      console.log("response", data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to dashboard if email is verified
      if (data.user?.email) {

        toast.success('Login successful');
        const username = data.user.username;
        // return navigate(`/${username}/profile`);

      }
    }
    catch (error: any) {
      toast.error(error.response.data.message)
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

  return (
    <div>
      (
      <section>
        <main className="pt-20 pb-5">
          <div className="max-w-md mx-auto shadow-lg p-6 rounded">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineMail className="mr-2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email Address"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
                  />
                </div>
                <span className="text-red-500">{errors.email}</span>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineLock className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
                  />
                </div>
                <span className="text-red-500">{errors.password}</span>
              </div>
              {loading ? (
                <div></div>
              ) : (
                <button
                  className="w-full  bg-secondary-saffron text-black text-sm sm:text-base font-bold py-2 px-4 rounded-md hover:bg-secondary-saffronLight outline-none focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:ring-offset-2 focus:ring-offset-yellow-100"
                  type="submit"
                  disabled={loading}
                >
                  Login as Admin
                </button>
              )}
              <div className="flex justify-between mt-2">
                <div>
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-500">Remember me</span>
                </div>
                <Link href="/forgot-password" className="text-secondary-saffronLight">Forgot password?</Link>
              </div>
              <div className="flex mt-2">
                <p className="text-gray-500">Don't have an account <span>
                  <Link href='/signup' className="text-gray-500 hover:underline hover:text-secondary-saffronLight">Register</Link></span></p>
              </div>
            </form>
          </div>
        </main>
      </section>
      )
    </div>
  );
};

export default LogIn;
