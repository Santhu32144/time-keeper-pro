import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default Index;
