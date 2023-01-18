import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PrivateRoute from "../context/PrivateRoute";

const ListBlogs = () => {
  const [blogDetails, setBlogDetails] = useState([]);
  // const context = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/blogs/all", {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        const blogData = await res.json();
        setBlogDetails(blogData.blogs);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/blogs/delete/${id}`, {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const formatRes = await res.json();

      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }
      const filteredData = blogDetails.filter((item) => item._id !== id);
      setBlogDetails(filteredData);
    } catch (err) {
      alert(err);
    }
  };

  console.log(blogDetails);

  return (
    <PrivateRoute>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
            backgroundColor: "darkslateblue",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            BLOGS
          </h1>
          {blogDetails.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                padding: "2rem 2rem 0.5rem 2rem",
                border: "1px solid black",
                minWidth: "300px",
                margin: "2rem",
                height: "40rem",
                backgroundColor: "white",
              }}
            >
              <div className="header">
                <h1>{item.title}</h1>
                <h3>
                  <i>{item.category}</i>
                </h3>
              </div>
              <div
                className="content"
                style={{ overflow: "scroll", height: "30rem" }}
              >
                <pre
                  style={{
                    fontSize: "1rem",
                    textAlign: "justify",
                    whiteSpace: "pre-wrap",
                    padding: "5px",
                  }}
                >
                  {item.content}
                </pre>
                <br />
              </div>
              <div className="footer">
                <br />-{item.author} <br /> Posted on {item.time}
              </div>
              <div
                className="buttons"
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link to={`/edit/${item._id}`}>
                  <button
                    style={{ margin: "10px", width: "10rem", padding: "5px" }}
                  >
                    Edit
                  </button>
                </Link>

                <Link onClick={() => handleDelete(item._id)}>
                  <button
                    style={{ margin: "10px", width: "10rem", padding: "5px" }}
                  >
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PrivateRoute>
  );
};

export default ListBlogs;
