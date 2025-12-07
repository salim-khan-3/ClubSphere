import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      //Successful login toast
      toast.success("Login successful! Welcome back.", {
        duration: 3000,
        position: "top-right",
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(" Login failed. Please check your credentials.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      await googleSignIn();
      toast.success("Google login successful! Welcome back.", {
        duration: 3000,
        position: "top-right",
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Google login failed. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 cursor-pointer  text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-70 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 font-medium">OR</div>

        <button
          onClick={handleGoogle}
          disabled={isLoading}
          className="w-full flex cursor-pointer  items-center justify-center gap-3 bg-white border-2 border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
