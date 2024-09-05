import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { postSchema } from "./../validations/postValidation";

function AddPost() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  const onSubmit = async (values) => {
    console.log('thi is values--',values);
    console.log('thi is photo--',photo);
    
    if (!image) {
      toast.error("Please select an image");
      return; 
    }

    if (!validImageTypes.includes(image.type)) {
      toast.error("Please select a valid image file (jpg, png, gif)");
      return; 
    }

    try {
      
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
      setPhoto(null);
      return;
    }

    setFileError("");
    const selectedPhoto = e.target.files[0];
    setPhotoToBase(selectedPhoto);

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const setPhotoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
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
              className="mt-1 block w-full border border-gray-300 rounded-md"
              rows="3"
            />
            {errors.caption && touched.caption && (
              <p className="text-red-600">{errors.caption}</p>
            )}
          </label>

          <button
            type="submit"
            className="bg-fuchsia-800 text-white px-4 py-2 rounded w-full"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
