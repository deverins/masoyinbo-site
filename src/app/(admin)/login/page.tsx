"use client"
import { API_URL } from "@/constants/api";
import { userLoginSchema } from "@/validationSchema/loginSchema";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";

const LogIn = () => {

  const URL = `${API_URL}/v1/auth/login`;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(URL, values, {});
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      toast.success("User registered successfully.");
      console.log(response);
    } catch (error) {
      toast.error("Sign up failed. Please try again later.");
      console.error("Sign up error:", error);

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
            </form>
          </div>
        </main>
      </section>
      )
    </div>
  );
};

export default LogIn;
