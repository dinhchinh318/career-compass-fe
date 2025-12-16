import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";

import { useCurrentApp } from "../../components/context/app.context";
import { getQuestionsAPI } from "../../services/api.question";
import { submitTestAPI } from "../../services/api.result";

const options = [
  "Hoàn toàn không đồng ý",
  "Không đồng ý",
  "Trung lập",
  "Đồng ý",
  "Hoàn toàn đồng ý",
];

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { isAuthenticated, user } = useCurrentApp();
  const { setLatestResult } = useCurrentApp();
  const navigate = useNavigate();

  // Lấy danh sách câu hỏi
  useEffect(() => {
    if (!isAuthenticated) {
      message.warning("Please login to take the test!");
      navigate("/login");
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await getQuestionsAPI();
        if (res.error === 0) {
          setQuestions(res.data);
          setAnswers(res.data.map((q) => ({ questionId: q._id, option: "" })));
        } else if (res.error === -1) {
          message.error("Session expired! Please login again.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else {
          message.error(res.message || "Failed to load questions!");
        }
      } catch (err) {
        console.error(err);
        message.error("Network error! Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [isAuthenticated, navigate]);

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[currentIndex].option = option;
    setAnswers(updated);
  };

  const next = () => {
    if (!answers[currentIndex].option) {
      return message.warning("Please choose an answer!");
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => setCurrentIndex((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!answers[currentIndex].option) {
      return message.warning("Please choose an answer!");
    }

    setSubmitting(true);
    try {
      const res = await submitTestAPI({ answers });
      if (res.error === 0) {
        message.success("Submit successfully!");
        setLatestResult(res.data);
        navigate(`/result/${res.data._id}`);
      } else if (res.error === -1 && res.message.toLowerCase().includes("token")) {
        message.error("Session expired! Please login again.");
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else if (res.error !== 0) {
        message.error(res.message || "Submit failed!");
      }
    } catch (err) {
      console.error(err);
      message.error("Network error! Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center py-20 text-lg">
        No questions available. Please contact admin.
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Career Compass Test</h1>
      {user && (
        <p className="text-center text-gray-600 mb-4">
          Welcome, <span className="font-semibold">{user.name}</span>!
        </p>
      )}

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
        <div
          className="bg-blue-600 h-full rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question card */}
      <div className="bg-white shadow-md border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentIndex + 1} / {questions.length}
        </h2>
        <p className="text-lg mb-6">{currentQuestion.content}</p>

        <div className="space-y-3">
          {options.map((opt, idx) => (
            <label
              key={idx}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                currentAnswer.option === opt
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={`q-${currentQuestion._id}`}
                checked={currentAnswer.option === opt}
                onChange={() => handleSelect(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-lg border ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={next}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;

