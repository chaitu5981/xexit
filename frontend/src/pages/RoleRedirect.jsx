import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Loader from "../components/Loader";

const RoleRedirect = () => {
  const { user, loading } = useAuth();
  console.log(user);
  console.log(loading);
  if (loading) return <Loader />;
  else if (user?.role == "emp") return <Navigate to="/emp" />;
  else if (user?.role == "exEmp") return <Navigate to="/exEmp" />;
  else if (user?.role == "hr") return <Navigate to="/admin" />;
  else if (user == null) return <Navigate to="/register" />;
};
export default RoleRedirect;
