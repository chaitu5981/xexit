import { useState } from "react";
import Loader from "../components/Loader";
import { axiosApi } from "../utils/axios";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ExEmpDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const questions = [
    "What prompted you to start looking for another job?",
    "Would you recommend this company to others?",
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const submit = async () => {
    let responses = [];
    for (let i = 0; i < questions.length; i++) {
      responses.push({ questionText: questions[i], response: answers[i] });
    }
    try {
      setLoading(true);
      const { data } = await axiosApi.post(
        "/user/responses",
        { responses },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast(data.message, { type: "success" });
    } catch (error) {
      toast(error.response.data.message, { type: "warning" });
    } finally {
      setLoading(false);
      setAnswers(Array(questions.length).fill(""));
    }
  };
  const logout = () => {
    toast("Logged out successfully", { type: "success" });
    setToken(null);
    navigate("/");
  };
  const updateAnswer = (val, index) => {
    let answers1 = answers;
    answers1 = answers1.map((a, i) => (i == index ? val : a));
    setAnswers(answers1);
  };
  return (
    <div className="w-full  gap-10 flex flex-col p-10 items-center h-screen bg-amber-100">
      <button
        className="bg-red-400  py-2 px-3 rounded-md cursor-pointer ml-auto"
        onClick={logout}
      >
        Logout
      </button>
      <div className="w-[40%] rounded bg-white flex flex-col p-6 gap-4 z-20">
        <p>Questionnaire</p>
        {questions.map((q, i) => (
          <div key={i}>
            <p>{q}</p>
            <input
              type="text"
              className="border-2 border-gray-400 p-2 rounded-md w-full"
              value={answers[i]}
              onChange={(e) => updateAnswer(e.target.value, i)}
            />
          </div>
        ))}
        <button
          onClick={submit}
          className="bg-amber-400 mx-auto py-2 px-3 rounded-md cursor-pointer"
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </div>
  );
};
export default ExEmpDashboard;
