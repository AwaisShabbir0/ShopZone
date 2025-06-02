import * as Yup from "yup";

export const productSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  desc: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  smallPrice: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
});
