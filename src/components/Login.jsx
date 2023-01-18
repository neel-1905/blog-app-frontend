import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState(null);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://blog-app-backend-one.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginDetails?.email,
            password: loginDetails?.password,
          }),
        }
      );

      const formatRes = await res.json();

      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }
      alert(formatRes?.message);
      localStorage.setItem("token", formatRes?.token);
      context?.handleLogin();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "darkslateblue",
      }}
    >
      <form
        style={{
          border: "1px solid black",
          padding: "1rem 2rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          minWidth: "320px",
          backgroundColor: "white",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          if (!loginDetails?.email || !loginDetails?.password) {
            alert("Please fill all the details");
          } else {
            handleLogin();
          }
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <input
          style={{ padding: "0.5rem" }}
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />

        <input
          style={{ padding: "0.5rem" }}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <p style={{ margin: "0", padding: "0" }}>
          Not a member? <Link to="/register">Register</Link>
        </p>
        <button style={{ padding: "0.5rem" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
