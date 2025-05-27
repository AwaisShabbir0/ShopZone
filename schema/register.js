import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required."),
});
