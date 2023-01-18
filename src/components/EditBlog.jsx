import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";

const EditBlog = () => {
  const [blogDetails, setBlogDetails] = useState(null);
  const param = useParams();
  const navigate = useNavigate();

  const date = new Date();

  const time = date.toLocaleTimeString();

  const handleChange = (event) => {
    setBlogDetails({ ...blogDetails, [event.target.name]: event.target.value });
    console.log(blogDetails);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/blogs/getOne/${param?.id}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );

        const formatRes = await res.json();
        if (!formatRes?.isSuccess) {
          throw new Error(formatRes?.isSuccess);
        }
        setBlogDetails(formatRes?.blog);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/blogs/edit/${param?.id}`, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogDetails?.title,
          category: blogDetails?.category,
          content: blogDetails?.content,
          author: blogDetails?.author,
          time: time,
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
              !blogDetails?.time
            ) {
              alert("Please fill all the details");
            } else {
              handleEdit();
            }
          }}
        >
          <h2 style={{ textAlign: "center" }}>Edit Blog</h2>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            onChange={handleChange}
            value={blogDetails?.title}
          />
          <select
            name="category"
            value={blogDetails?.category}
            onChange={handleChange}
          >
            <option value={blogDetails?.category}>
              {blogDetails?.category}
            </option>
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
            value={blogDetails?.content}
            onChange={handleChange}
          ></textarea>

          <button>Edit Blog</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default EditBlog;
