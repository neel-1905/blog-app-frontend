import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";

const AddBlog = () => {
  const [blogDetails, setBlogDetails] = useState(null);
  const navigate = useNavigate();

  const date = new Date();
  const time = date.toLocaleTimeString();

  const handleChange = (event) => {
    setBlogDetails({ ...blogDetails, [event.target.name]: event.target.value });
    console.log(blogDetails);
  };

  const handleAddBlog = async () => {
    try {
      const res = await fetch("http://localhost:3001/blogs/addBlog", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogDetails?.title,
          category: blogDetails?.category,
          content: blogDetails?.content,
          author: blogDetails?.author,
          time,
        }),
      });
      const formatRes = await res.json();
      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }
      alert(formatRes?.message);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <PrivateRoute>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40rem",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            border: "1px solid black",
            padding: "0rem 2rem 2rem 2rem",
            minWidth: "30%",
          }}
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !blogDetails?.title ||
              !blogDetails?.category ||
              !blogDetails?.content ||
              !blogDetails?.author ||
              !time
            ) {
              alert("Please fill all the details");
            } else {
              handleAddBlog();
            }
          }}
        >
          <h2 style={{ textAlign: "center" }}>Add Blog</h2>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Blog Author"
            onChange={handleChange}
          />
          <select name="category" onChange={handleChange}>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Comedy">Comedy</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          />

          <button>Add Blog</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default AddBlog;
