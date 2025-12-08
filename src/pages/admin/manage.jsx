import React, { useState, useEffect } from "react";
import { createQuestionAPI, getQuestionsAPI, deleteQuestionAPI } from "../../services/api.question";
import { getAllUsersAPI } from "../../services/api.result";

const ManagePage = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");

  const [newQuestion, setNewQuestion] = useState({
    content: "",
    category: "R",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(""); // Clear error trước khi load
      
      const [qRes, uRes] = await Promise.all([
        getQuestionsAPI(),
        getAllUsersAPI(),
      ]);

      console.log("📦 Questions response:", qRes);
      console.log("📦 Users response:", uRes);

      // Xử lý response linh hoạt
      const questionsData = Array.isArray(qRes) ? qRes : 
                           Array.isArray(qRes?.data) ? qRes.data : [];
      const usersData = Array.isArray(uRes) ? uRes :
                       Array.isArray(uRes?.data) ? uRes.data : [];

      setQuestions(questionsData);
      setUsers(usersData);
      
      console.log("✅ Loaded:", questionsData.length, "questions,", usersData.length, "users");
    } catch (err) {
      console.error("❌ Load admin data failed:", err);
      setError(err.message || "Failed to load admin data");
      setQuestions([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.content.trim()) {
      setError("Question content cannot be empty");
      return;
    }

    try {
      setError("");
      const created = await createQuestionAPI(newQuestion);
      
      if (created) {
        const newQ = created.data || created; // Handle both formats
        setQuestions((prev) => [...prev, newQ]);
        setNewQuestion({ content: "", category: "R" });
        setShowAddForm(false);
      }
    } catch (err) {
      console.error("❌ Add question failed:", err);
      setError(err.message || "Failed to add question");
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      setError("");
      await deleteQuestionAPI(id);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("❌ Delete question failed:", err);
      setError(err.message || "Failed to delete question");
    }
  };

  const getCategoryName = (c) =>
    ({
      R: "Realistic",
      I: "Investigative",
      A: "Artistic",
      S: "Social",
      E: "Enterprising",
      C: "Conventional",
    }[c] || c);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Admin Dashboard</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT - QUESTIONS */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Questions</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              {showAddForm ? "Cancel" : "Add Question"}
            </button>
          </div>

          {showAddForm && (
            <form
              onSubmit={handleAddQuestion}
              className="bg-gray-50 p-4 rounded-xl shadow-inner mb-6"
            >
              <label className="font-semibold text-gray-700">Question Content</label>
              <textarea
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
                value={newQuestion.content}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, content: e.target.value })
                }
                required
                placeholder="Enter question content..."
              />

              <label className="font-semibold mt-3 block text-gray-700">Category</label>
              <select
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={newQuestion.category}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, category: e.target.value })
                }
              >
                {["R", "I", "A", "S", "E", "C"].map((c) => (
                  <option key={c} value={c}>
                    {getCategoryName(c)}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Add Question
              </button>
            </form>
          )}

          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Questions ({questions.length})
          </h3>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {questions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No questions found</p>
            ) : (
              questions.map((q) => (
                <div
                  key={q._id}
                  className="p-4 border border-gray-200 rounded-lg flex justify-between items-start bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-1 mr-3">
                    <p className="font-medium text-gray-800">{q.content}</p>
                    <p className="text-sm mt-1 text-gray-500">
                      {getCategoryName(q.category)} ({q.category})
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT - USERS */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">User Results</h2>
          <p className="text-gray-600 mb-4 font-medium">
            Total users: {users.length}
          </p>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No users found</p>
            ) : (
              users.map((u, idx) => (
                <div
                  key={u._id || idx}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {idx + 1}. {u.name || "Unnamed User"}
                  </h3>
                  <p className="text-gray-600 text-sm">{u.email || "N/A"}</p>

                  <p className="mt-2">
                    <span className="font-semibold text-gray-700">Result: </span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium">
                      {u.results?.[0]?.riasecCode || "N/A"}
                    </span>
                  </p>

                  {u.results?.[0]?.details && (
                    <p className="text-sm mt-2 text-gray-600">
                      {Object.entries(u.results[0].details)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" | ")}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;