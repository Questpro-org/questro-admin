import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn === null) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
