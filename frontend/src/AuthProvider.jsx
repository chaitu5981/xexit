import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { axiosApi } from "./utils/axios";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await axiosApi.get("/auth/get-logged-user", {
          headers: {
            Authorization: token,
          },
        });
        if (res.status == 200) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
