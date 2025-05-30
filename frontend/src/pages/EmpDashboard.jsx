import { useState } from "react";
import { axiosApi } from "../utils/axios";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const EmpDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const submit = async (lwd) => {
    try {
      setLoading(true);
      const { data } = await axiosApi.post(
        "/user/resign",
        { lwd },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast("Resignation submitted successfully", { type: "success" });
      setShowModal(false);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    toast("Logged out successfully", { type: "success" });
    setToken(null);
    navigate("/");
  };
  return (
    <div className="w-full justify-center gap-10 flex items-center h-screen bg-amber-100">
      <button
        className="bg-amber-400  py-2 px-3 rounded-md cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Submit Resignation
      </button>
      <button
        className="bg-red-400  py-2 px-3 rounded-md cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
      {showModal && (
        <ResignationForm
          setShowModal={setShowModal}
          loading={loading}
          submit={submit}
        />
      )}
    </div>
  );
};

const ResignationForm = ({ setShowModal, loading, submit }) => {
  const [lwd, setLwd] = useState("");

  return (
    <div className="fixed  inset-0 bg-black/50 flex justify-center items-center">
      <div className="w-[40%] rounded bg-white flex flex-col p-6 gap-4 z-20">
        <p>Last Working Day</p>
        <input
          type="date"
          className="border-2 border-gray-400"
          value={lwd}
          onChange={(e) => setLwd(e.target.value)}
        />
        <div className="flex gap-8">
          <button
            onClick={() => submit(lwd)}
            className="bg-amber-400 mx-auto py-2 px-3 rounded-md cursor-pointer"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-red-400 mx-auto py-2 px-3 rounded-md cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmpDashboard;
