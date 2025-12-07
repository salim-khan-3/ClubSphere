import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log(loggedUser);

      await updateUser({
        displayName: data.name,
        photoURL: data.photo,
      });

      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(redirectPath);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();

      Swal.fire({
        title: "Welcome!",
        text: "Logged in with Google!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(redirectPath);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Photo URL</label>
            <input
              type="text"
              placeholder="https://example.com/photo.jpg"
              {...register("photo", { required: "Photo URL is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                validate: {
                  upper: (value) => /[A-Z]/.test(value) || "Must include uppercase letter",
                  lower: (value) => /[a-z]/.test(value) || "Must include lowercase letter",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>• At least one uppercase letter</li>
              <li>• At least one lowercase letter</li>
              <li>• Minimum 6 characters</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

          <div className="text-center text-gray-500 text-sm my-2">OR</div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full border py-2 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
















































// import React from 'react';

// const Register = () => {
//     return (
//          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
//         <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

//         <form className="space-y-4">

//           {/* Name */}
//           <div>
//             <label className="block font-medium mb-1">Full Name</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* Photo URL */}
//           <div>
//             <label className="block font-medium mb-1">Photo URL</label>
//             <input
//               type="text"
//               placeholder="https://example.com/photo.jpg"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block font-medium mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />

//             {/* Password requirements */}
//             <ul className="mt-2 text-sm text-gray-600 space-y-1">
//               <li>• At least one uppercase letter</li>
//               <li>• At least one lowercase letter</li>
//               <li>• Minimum 6 characters</li>
//             </ul>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Register
//           </button>

//           {/* Divider */}
//           <div className="text-center text-gray-500 text-sm my-2">OR</div>

//           {/* Google Button */}
//           <button
//             type="button"
//             className="w-full border py-2 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="google"
//               className="w-5 h-5"
//             />
//             Continue with Google
//           </button>

//         </form>
//       </div>
//     </div>
//     );
// };

// export default Register;