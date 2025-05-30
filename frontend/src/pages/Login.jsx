import { useState } from "react";
import { axiosApi } from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const login = async () => {
    try {
      setLoading(true);
      const res = await axiosApi.post("/auth/login", { username, password });
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        toast("User Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full justify-center flex items-center h-screen bg-amber-100">
      <div className="w-[40%] rounded bg-white flex flex-col p-6 gap-4">
        <p className="mx-auto text-2xl font-semibold">Login</p>
        <div>Username :</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2"
        />
        <div>Password :</div>
        <input
          type="password"
          className="p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-amber-400 mx-auto py-2 px-3 rounded-md cursor-pointer"
        >
          {loading ? <Loader /> : "Submit"}
        </button>
        <p>
          Don't have an Account?{" "}
          <Link to={"/register"} className="font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
