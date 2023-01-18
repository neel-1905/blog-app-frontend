import React, { Children, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.isUserLoggedIn && !location.pathname.includes("/login")) {
      navigate("/login");
    }
  }, [context?.isUserLoggedIn]);

  if (!context?.isUserLoggedIn) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
