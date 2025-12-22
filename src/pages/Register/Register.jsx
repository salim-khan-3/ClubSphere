import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser, googleSignIn, logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
       await createUser(data.email, data.password);

      await updateUser({
        displayName: data.name,
        photoURL: data.photo,
      });

      /** ------------------------------
       *  SAVE USER TO DATABASE HERE
       * ------------------------------ */
      await fetch("https://club-sphere-server-six.vercel.app/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          photoURL: data.photo,
        }),
      });

      // STOP AUTO LOGIN after register
      await logOut();

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
      const result = await googleSignIn();

      /** SAVE GOOGLE USER TO DATABASE */
      await fetch("https://club-sphere-server-six.vercel.app/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });

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
    // same UI — unchanged
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Photo URL</label>
            <input
              type="text"
              {...register("photo", { required: "Photo URL is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                validate: {
                  upper: (v) => /[A-Z]/.test(v) || "Must include uppercase letter",
                  lower: (v) => /[a-z]/.test(v) || "Must include lowercase letter",
                }
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
            Register
          </button>

          <div className="text-center text-gray-500 my-2">OR</div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full border py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;