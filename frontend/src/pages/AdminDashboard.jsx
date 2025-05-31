import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { axiosApi } from "../utils/axios";
import Loader from "../components/Loader";

const AdminDashboard = () => {
  const { token, setToken } = useAuth();
  const [resignations, setResignations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lwd, setLwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showResponses, setShowResponses] = useState(false);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
    toast("Logged out successfully", { type: "success" });
    setToken(null);
    navigate("/");
  };
  const conclude = async (status, id = null) => {
    try {
      setLoading(true);

      const { data } = await axiosApi.put(
        "/admin/conclude_resignation",
        {
          resignationId: id || currentId,
          approved: status,
          lwd: status && lwd,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast(data.message, { type: "success" });
      setLwd("");
      await fetchResignations();
      setShowModal(false);
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchResignations = async () => {
    try {
      const { data } = await axiosApi.get("/admin/resignations", {
        headers: {
          Authorization: token,
        },
      });
      setResignations(data.data);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };
  const fetchResponses = async () => {
    try {
      const { data } = await axiosApi.get("/admin/exit_responses", {
        headers: {
          Authorization: token,
        },
      });
      setResponses(data.data);
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };
  useEffect(() => {
    fetchResignations();
    fetchResponses();
  }, []);
  return (
    <div className="w-full  gap-10 flex flex-col p-10 items-center min-h-screen bg-amber-100">
      <button
        className="bg-red-400  py-2 px-3 rounded-md cursor-pointer ml-auto"
        onClick={logout}
      >
        Logout
      </button>
      <div className="w-[55%] rounded bg-white flex flex-col p-6 gap-4">
        <p className="mx-auto text-2xl font-semibold">Resignations</p>
        <div className="font-semibold flex justify-between">
          <p>Employee ID</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {resignations.map((r) => (
          <div key={r._id} className="flex justify-between">
            <p>{r.employeeId}</p>
            <p>{r.status}</p>
            {r.status != "approved" && r.status != "rejected" ? (
              <div className="flex gap-3">
                <button
                  className="bg-green-400  py-2 px-3 rounded-md cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    setCurrentId(r._id);
                  }}
                >
                  Approve
                </button>
                <button
                  className="bg-red-400  py-2 px-3 rounded-md cursor-pointer"
                  onClick={async () => {
                    conclude(false, r._id);
                  }}
                >
                  {loading ? <Loader /> : "Reject"}
                </button>
              </div>
            ) : (
              <div className="w-[10rem]"></div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowResponses(!showResponses)}
        className="bg-green-400  py-2 px-3 rounded-md cursor-pointer mx-auto"
      >
        {showResponses ? "Hide" : "Show"} Responses
      </button>
      {showResponses &&
        responses.map((r, i) => (
          <div
            key={i}
            className="w-[55%] rounded bg-white flex flex-col p-6 gap-4"
          >
            <p>Employee ID : {r.employeeId}</p>
            {r.responses.map((resp, j) => (
              <div key={j}>
                <p>{resp.questionText}</p>
                <p>{resp.response}</p>
              </div>
            ))}
          </div>
        ))}
      {showModal && (
        <div className="fixed  inset-0 bg-black/50 flex justify-center items-center">
          <div className="w-[40%] rounded bg-white flex flex-col p-6 gap-4">
            <p>Last Working Day</p>
            <input
              type="date"
              className="border-2 border-gray-400"
              value={lwd}
              onChange={(e) => setLwd(e.target.value)}
            />
            <div className="flex gap-6">
              <button
                onClick={() => conclude(true)}
                className="bg-amber-400  py-2 px-3 rounded-md cursor-pointer"
              >
                {loading ? <Loader /> : "Submit"}
              </button>

              <button
                onClick={() => {
                  setLwd("");
                  setShowModal(false);
                }}
                className="bg-red-400  py-2 px-3 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
