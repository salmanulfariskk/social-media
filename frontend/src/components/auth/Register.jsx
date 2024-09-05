import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { useFormik } from "formik";
import { userSchema } from "../../validations/signupValidation";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function Register() {
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      const response = await axiosInstance.post('api/account/create',values)
      if(response.status==201){
        toast.success("Account created successfully")
        navigate("/login");
      }
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data?.error?.message)
      console.log(error);
    }
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-fuchsia-800 text-center">
            Register
          </h2>
          <label className="block mb-4">
            <span className="text-gray-700">Name</span>
            <input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4"
            />
          </label>
          <div>
            {errors.name && touched.name && (
              <p className="text-red-600">{errors.name}</p>
            )}
          </div>
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4"
            />
          </label>
          <div>
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}
          </div>

          <label className="block mb-6">
            <span className="text-gray-700">Password</span>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4"
            />
          </label>
          <div>
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>
          <label className="block mb-6">
            <span className="text-gray-700">Confirm Password</span>
            <input
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4"
            />
          </label>
          <div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-fuchsia-800 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
          <div className="mt-7 font-semibold">
            Don't have an account ?
            <Link to={"/login"}>
              {" "}
              <span className="text-fuchsia-800 underline hover:cursor-pointer">
                Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
