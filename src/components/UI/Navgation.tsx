import { useAuth } from "../../hooks/AuthContext";
import AdminNav from "../AdminNav";
import Navbar from "../Navbar";

export const Navigation = () => {
  const { isLoggedIn, userRole } = useAuth();
  return (
    <>
      {isLoggedIn && userRole === 'admin' ? <AdminNav /> : <Navbar />}
    </>
  );
};