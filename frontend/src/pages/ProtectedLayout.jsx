import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const ProtectedLayout = ({ role }) => {
  const { user } = useAuth();
  if (user && user.role == role)
    return (
      <div>
        <Outlet />
      </div>
    );
  else <Navigate to="/not-found" />;
};
export default ProtectedLayout;
