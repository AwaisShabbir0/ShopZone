import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { registerSchema } from "../../schema/register";

const Register = () => {
  const router = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post("/api/users/register", values);
      if (res.status === 201) {
        toast.success("Account created! Please verify your email.", {
          position: "bottom-left",
          theme: "colored",
        });
        actions.resetForm();
        router.push("/auth/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!", {
        position: "bottom-left",
        theme: "colored",
      });
      console.log(err);
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: registerSchema,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Your Full Name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 border border-gray-300 rounded mb-3"
        />
        {errors.fullName && touched.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 border border-gray-300 rounded mb-3"
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 border border-gray-300 rounded mb-3"
        />
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 border border-gray-300 rounded mb-3"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
