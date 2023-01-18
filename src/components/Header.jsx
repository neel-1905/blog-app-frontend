import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const context = useContext(AuthContext);

  return (
    context?.isUserLoggedIn && (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          minWidth: "320px",
          backgroundColor: "#273444",
          color: "white",
        }}
      >
        <div>
          <h1>BLOG WEBSITE</h1>
        </div>
        <div>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              listStyle: "none",
              textTransform: "uppercase",
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  padding: "20px 20px 20px 0px",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/addBlog"
                style={{
                  textDecoration: "none",
                  padding: "20px",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                Add Blog
              </Link>
            </li>
            <li>
              <Link
                onClick={context?.handleLogout}
                style={{
                  textDecoration: "none",
                  padding: "20px",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default Header;
