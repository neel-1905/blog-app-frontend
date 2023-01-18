import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRegisterDetails({
      ...registerDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "https://blog-app-backend-one.vercel.app/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerDetails?.name,
            email: registerDetails?.email,
            password: registerDetails?.password,
          }),
        }
      );

      const formatRes = await res.json();

      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }
      alert(formatRes?.message);
      navigate("/login");
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

          if (
            !registerDetails?.name ||
            !registerDetails?.email ||
            !registerDetails?.password ||
            !registerDetails?.confirmPassword
          ) {
            alert("Please fill all the details");
          } else if (
            !registerDetails?.password !== !registerDetails?.confirmPassword
          ) {
            alert("Passwords do not match");
          } else {
            handleRegister();
          }
        }}
      >
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <input
          style={{ padding: "0.4rem" }}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          style={{ padding: "0.4rem" }}
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          style={{ padding: "0.4rem" }}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          style={{ padding: "0.4rem" }}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <p style={{ margin: "0", padding: "0" }}>
          Already a Member? <Link to="/login">Login</Link>
        </p>
        <button style={{ padding: "0.4rem" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
