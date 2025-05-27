import * as Yup from "yup";

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters."),
  
  phoneNumber: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 characters.")
    .matches(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number."),

  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email address."),

  persons: Yup.number()
    .required("Number of persons is required.")
    .min(1, "There must be at least one person.")
    .integer("Number of persons must be an integer.")
    .positive("Number of persons must be a positive number."),

  date: Yup.date()
    .required("Date is required.")
    .min(new Date(), "Date must be in the future.")  // Ensuring the reservation date is not in the past
    .typeError("Please enter a valid date."),
});

