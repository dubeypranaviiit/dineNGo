"use client";

import { IItem } from "@/database/models/item.model";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import admin from "@/public/admin/admin"; // Ensure this path is correct

const AddProduct: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<Partial<IItem>>({
    name: "",
    category: "",
    diet: "",
    price: 0,
    description: "",
    image: "",
    isSpecial: false,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name || "");
    formData.append("category", data.category || "");
    formData.append("diet", data.diet || "");
    formData.append("price", String(data.price || 0));
    formData.append("description", data.description || "");
    formData.append("image", image);
    formData.append("isSpecial", String(data.isSpecial || false));

    try {
      const response = await axios.post("/api/food", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          category: "",
          diet: "",
          price: 0,
          description: "",
          image: "",
          isSpecial: false,
        });
        setImage(null);
      } else {
        toast.error("Error submitting data");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 ml:pl-16">
        {/* Image Upload */}
        <p className="text-xl">Upload Image</p>
        <label htmlFor="image">
          <Image
            src={image ? URL.createObjectURL(image) : admin.uploadIcon}
            alt="upload"
            width={140}
            height={70}
            className="mt-4"
          />
        </label>
        <input type="file" id="image" hidden required onChange={onFileChange} />

        {/* Name */}
        <p className="text-xl mt-4">Item Name</p>
        <input
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Item Name"
          required
        />

        {/* Category */}
        <p className="text-xl mt-4">Category</p>
        <input
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Category"
          required
        />

        {/* Diet */}
        <p className="text-xl mt-4">Diet</p>
        <input
          name="diet"
          onChange={onChangeHandler}
          value={data.diet}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Diet"
          required
        />

        {/* Price */}
        <p className="text-xl mt-4">Price</p>
        <input
          name="price"
          onChange={onChangeHandler}
          value={data.price}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="number"
          placeholder="Price"
          required
        />

        {/* Description */}
        <p className="text-xl mt-4">Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="Description"
          required
        />

        {/* Is Special Checkbox */}
        <label className="flex items-center mt-4">
          <input
            type="checkbox"
            name="isSpecial"
            checked={data.isSpecial}
            onChange={onChangeHandler}
            className="mr-2"
          />
          Special Item
        </label>

        {/* Submit Button */}
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default AddProduct;
