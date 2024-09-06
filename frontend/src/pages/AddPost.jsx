import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFormik } from "formik";
import { postSchema } from "./../validations/postValidation";
import axiosInstance from "../utils/axiosInstance";

function AddPost() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  const onSubmit = async (values) => {
    if (!image) {
      toast.error("Please select an image");
      return; 
    }

    if (!validImageTypes.includes(image.type)) {
      toast.error("Please select a valid image file (jpg, png, gif)");
      return; 
    }

    try {
      const formData = new FormData();
      formData.append('caption', values.caption);
      formData.append('file', image);

      await axiosInstance.post('/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Post added successfully");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        caption: "",
      },
      validationSchema: postSchema,
      onSubmit,
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && !validImageTypes.includes(file.type)) {
      setFileError("Please select a valid image file (jpg, png, gif)");
      setImage(null);
      setImagePreview("");
      return;
    }

    setFileError("");
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-fuchsia-800 text-center">
            Add New Post
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700">Image</span>
            <input
              id="file_input"
              type="file"
              required
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
            {fileError && <p className="text-red-600">{fileError}</p>}
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-60 object-contain rounded-md"
                  style={{ width: "300px", height: "auto" }}
                />
              </div>
            )}
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Caption</span>
            <textarea
              value={values.caption}
              onChange={handleChange}
              onBlur={handleBlur}
              name="caption"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 outline-none resize-y"
              rows="3"
            />
            {errors.caption && touched.caption && (
              <p className="text-red-600">{errors.caption}</p>
            )}
          </label>

          <button
            type="submit"
            className="h-9 px-3 flex items-center justify-center select-none whitespace-nowrap transition-colors text-sm font-semibold rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-800/90 w-full"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
