import React, { useEffect, useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useFormik } from "formik";
import { productSchema } from "../../schema/product";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const AddProduct = ({ setIsProductModal }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef();

  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOnchange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      category: "",
      smallPrice: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      console.log("📤 Form submitted:", values);
      console.log("📷 Selected file:", file);

      if (!file) {
        toast.error("Please select an image.");
        return;
      }

      setBtnDisabled(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "shopzone");

      console.log("🚀 Uploading to Cloudinary with preset:", formData.get("upload_preset"));

      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/djbozc4ph/image/upload", // ✅ Correct cloud name
          formData
        );

        console.log("✅ Cloudinary upload success:", uploadRes.data);
        const imageUrl = uploadRes.data.secure_url;

        const productData = {
          img: imageUrl,
          title: values.title,
          desc: values.desc,
          category: values.category.toLowerCase(),
          prices: [values.smallPrice],
        };

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
          productData
        );

        if (res.status === 201) {
          toast.success("Product created successfully!");
          setIsProductModal(false);
        }
      } catch (err) {
        const msg = err?.response?.data?.error?.message || err.message;
        console.error("❌ Cloudinary Upload Failed:", msg);
        toast.error(`Upload failed: ${msg}`);
      }

      setBtnDisabled(false);
    },
  });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (window.confirm("Are you sure you want to exit?")) {
            setIsProductModal(false);
          }
        }}
      >
        <div className="w-full h-full grid place-content-center relative">
          <form
            onSubmit={formik.handleSubmit}
            className="relative z-50 md:w-[800px] w-[370px] bg-white border-2 p-8 md:p-10 rounded-3xl overflow-hidden"
          >
            <Title addClass="text-[40px] text-center">Add a New Product</Title>

            {/* Image Upload */}
            <div className="flex flex-row text-sm mt-8 gap-5 h-20">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleOnchange}
                  accept="image/*"
                />
                <button
                  type="button"
                  className="btn-primary !rounded-none !bg-blue-600"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    <img
                      className="rounded-full border-2 border-primary"
                      src={imageSrc}
                      alt="preview"
                      width={90}
                      height={90}
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="overflow-y-auto max-h-[60vh] mt-4">
              {/* Title */}
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-1">Title</span>
                <input
                  type="text"
                  name="title"
                  placeholder="Write a Title"
                  className={`border p-3 rounded-md ${
                    formik.errors.title && formik.touched.title ? "border-red-500" : "border-gray-400"
                  }`}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.title && formik.touched.title && (
                  <span className="text-xs mt-1 text-danger">{formik.errors.title}</span>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-1">Description</span>
                <textarea
                  name="desc"
                  placeholder="Write a Description"
                  className={`border p-3 h-16 rounded-md ${
                    formik.errors.desc && formik.touched.desc ? "border-red-500" : "border-gray-400"
                  }`}
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.desc && formik.touched.desc && (
                  <span className="text-xs mt-1 text-danger">{formik.errors.desc}</span>
                )}
              </div>

              {/* Category */}
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-1">Select Category</span>
                <select
                  name="category"
                  className="border p-2 rounded-md"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.title.toLowerCase()}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {formik.errors.category && formik.touched.category && (
                  <span className="text-xs mt-1 text-danger">{formik.errors.category}</span>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-1">Price</span>
                <input
                  type="number"
                  name="smallPrice"
                  placeholder="Price"
                  className={`border p-1 text-sm outline-none md:w-28 ${
                    formik.errors.smallPrice && formik.touched.smallPrice
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  value={formik.values.smallPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.smallPrice && formik.touched.smallPrice && (
                  <span className="text-xs mt-1 text-danger">
                    {formik.errors.smallPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="absolute right-8 bottom-6">
              <button
                className={`btn-primary ${btnDisabled ? "!bg-green-400 cursor-not-allowed" : "!bg-success"}`}
                type="submit"
                disabled={btnDisabled}
              >
                {btnDisabled ? <CircularProgress size={20} /> : "Create"}
              </button>
            </div>

            <button
              className="absolute top-4 right-4"
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to exit?")) {
                  setIsProductModal(false);
                }
              }}
            >
              <GiCancel size={25} />
            </button>
          </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
