import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/loginValidation";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setSession } from "../../features/session/sessionReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    console.log('hello world');
    
    try {
      const response = await axiosInstance.post('/sessions',values)
      if(response.status==201){
        toast.success("logged in successfully")
        dispatch(setSession(response.data))
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error?.message)
      console.log(error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {" "}
      {/* Full-screen flex container */}
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-fuchsia-800 text-center">
            Login
          </h2>
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
          <div className="grid">
            <button
              type="submit"
              className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-800/90"
            >
              Login
            </button>
          </div>
          <div className="mt-7 font-semibold">
            Don&apos;t have an account ?
            <Link to={"/register"}>
              {" "}
              <span className="text-fuchsia-800 underline hover:cursor-pointer">
                Register
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
