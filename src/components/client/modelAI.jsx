// import { Form, Input, Button } from "antd";
// import { useState } from "react";
// import { MessageCircle, X } from "lucide-react";
// import logo from "../../assets/img/jpg/logo.jpg";
// import { askOpenAI } from "../../services/openai.service";
// import { getResultByIdAPI } from "../../services/api.result";

// const ModelAI = ({ riasecResult = null }) => {
//   const [messages, setMessages] = useState([]);
//   const [form] = Form.useForm();
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const predefinedPrompts = [
//     "Tôi nên học ngành gì?",
//     "Phân tích tính cách của tôi",
//     "Gợi ý nghề nghiệp phù hợp",
//   ];

//   const handleAsk = async (prompt) => {
//   if (!prompt || !prompt.trim()) return;

//   const userMessage = { role: "user", content: prompt };
//   setMessages((prev) => [...prev, userMessage]);

//   setLoading(true);

//   try {
//     const response = await askOpenAI(prompt, riasecResult, { rawResponse: true });

//     // Nếu muốn raw response
//     let aiReply;
//     if (response?.config) {
//       // Đây là response nguyên từ Axios
//       aiReply = JSON.stringify(response.data, null, 2); 
//     } else {
//       // Đây là response.data bình thường
//       aiReply = response?.answer || response?.reply || response?.message || "Xin lỗi, tôi không thể trả lời câu hỏi này.";
//     }


//     console.log("Final AI Reply:", aiReply);

//     const aiMessage = { role: "assistant", content: aiReply };
//     setMessages((prev) => [...prev, aiMessage]);
//   } catch (err) {
//     console.error("askOpenAI error:", err);

//     const errorMessage = {
//       role: "assistant",
//       content: `Lỗi: ${err.response?.data?.message || err.message || "Đã có lỗi xảy ra. Vui lòng thử lại."}`
//     };
//     setMessages((prev) => [...prev, errorMessage]);
//   } finally {
//     setLoading(false);
//   }
// };



//   const onFinish = ({ prompt }) => {
//     handleAsk(prompt);
//     form.resetFields();
//   };

//   const handleReset = () => setMessages([]);

//   return (
//     <>
//       <div className="fixed bottom-4 right-4 z-50">
//         {!isOpen && (
//           <button
//             className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
//             onClick={() => setIsOpen(true)}
//             title="Chat với AI"
//           >
//             <MessageCircle size={24} />
//           </button>
//         )}
//       </div>

//       {isOpen && (
//         <div className="fixed bottom-4 right-4 w-96 max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-50">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <img src={logo} alt="AI" className="w-8 h-8 rounded-full" />
//               <span className="font-semibold">Career Compass AI</span>
//             </div>
//             <div className="flex items-center gap-2">
//               {messages.length > 0 && (
//                 <button onClick={handleReset} title="Reset chat" className="hover:bg-white/20 p-1 rounded transition">
//                   <X size={20} />
//                 </button>
//               )}
//               <button onClick={() => setIsOpen(false)} title="Đóng" className="hover:bg-white/20 p-1 rounded transition">
//                 <X size={20} />
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100">
//             {messages.length === 0 ? (
//               <div className="flex flex-col gap-3">
//                 {/* Welcome message */}
//                 <div className="flex items-start gap-2">
//                   <img src={logo} alt="AI" className="w-10 h-10 rounded-full flex-shrink-0 shadow-md" />
//                   <div className="bg-white p-4 rounded-lg shadow-md max-w-[80%] border border-indigo-100">
//                     <p className="font-bold text-base text-indigo-700 mb-2">
//                       Xin chào! Tôi là AI Career Compass 👋
//                     </p>
//                     <p className="text-sm text-gray-700 leading-relaxed">
//                       Tôi có thể giúp bạn tư vấn về nghề nghiệp, phân tích tính cách và gợi ý lộ trình phát triển dựa trên kết quả RIASEC của bạn.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Predefined prompts */}
//                 <div className="flex flex-col gap-2 mt-2">
//                   <p className="text-sm font-semibold text-gray-700 px-1">💡 Gợi ý câu hỏi:</p>
//                   {predefinedPrompts.map((text, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handleAsk(text)}
//                       disabled={loading}
//                       className="text-left text-sm bg-white hover:bg-indigo-50 border border-gray-300 hover:border-indigo-400 hover:shadow-md rounded-lg px-4 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-medium"
//                     >
//                       {text}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               // Chat messages
//               messages.map((msg, index) => (
//                 <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] p-4 rounded-lg shadow-md ${
//                     msg.role === "user" 
//                       ? "bg-indigo-600 text-white" 
//                       : "bg-white text-gray-900 border border-gray-200"
//                   }`}>
//                     <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
//                   </div>
//                 </div>
//               ))
//             )}

//             {/* Loading indicator */}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-white p-4 rounded-lg shadow-md flex gap-1.5 border border-indigo-100">
//                   <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
//                   <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                   <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg">
//             <Form form={form} onFinish={onFinish} className="flex gap-2">
//               <Form.Item name="prompt" className="flex-1 m-0">
//                 <Input
//                   placeholder="Nhập câu hỏi của bạn..."
//                   allowClear
//                   disabled={loading}
//                   onPressEnter={() => form.submit()}
//                   className="text-gray-900"
//                 />
//               </Form.Item>
//               <Button 
//                 htmlType="submit" 
//                 type="primary" 
//                 loading={loading} 
//                 className="bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md"
//               >
//                 Gửi
//               </Button>
//             </Form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ModelAI;




import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { MessageCircle, X, AlertCircle } from "lucide-react";
import logo from "../../assets/img/jpg/logo.jpg";
import { askOpenAI } from "../../services/openai.service";
import { getResultByIdAPI } from "../../services/api.result";
import { useCurrentApp } from "../context/app.context";

const ModelAI = () => {
  /* ================= CONTEXT ================= */
  const { user, latestResult } = useCurrentApp();

  const userId = user?._id || null;
  const resultId = latestResult?._id || null;

  /* ================= STATE ================= */
  const [messages, setMessages] = useState([]);
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resultData, setResultData] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOAD RIASEC ================= */
  useEffect(() => {
    // ✅ ƯU TIÊN DỮ LIỆU VỪA SUBMIT
    if (latestResult) {
      setResultData(latestResult);
      console.log("✅ Using latestResult from context:", latestResult);
      return;
    }

    // ✅ CHƯA LOGIN / CHƯA TEST → AI BASIC
    if (!userId && !resultId) {
      console.log("ℹ️ ModelAI: Basic mode (no user/result)");
      return;
    }

    const loadResult = async () => {
      try {
        setLoadingResult(true);
        setError("");

        console.log("🔄 Loading result for:", { userId, resultId });

        const res = await getResultByIdAPI(resultId || userId);
        const data = res?.data || res;

        if (data?.riasecCode) {
          setResultData(data);
          console.log("✅ Loaded RIASEC result:", data);
        } else {
          console.warn("⚠️ No riasecCode in response:", data);
        }
      } catch (err) {
        console.error("❌ Error loading RIASEC:", err);
        setError("Không thể tải kết quả RIASEC");
      } finally {
        setLoadingResult(false);
      }
    };

    loadResult();
  }, [latestResult, userId, resultId]);

  /* ================= PREDEFINED ================= */
  const predefinedPrompts = [
    "Tôi nên học ngành gì?",
    "Phân tích tính cách của tôi",
    "Gợi ý nghề nghiệp phù hợp",
    "Lộ trình phát triển sự nghiệp",
  ];

  /* ================= RIASEC CONTEXT ================= */
  const buildRiasecContext = () => {
    if (!resultData) return "";

    const { riasecCode, details, createdAt } = resultData;

    const categoryNames = {
      R: "Realistic (Thực tế)",
      I: "Investigative (Nghiên cứu)",
      A: "Artistic (Nghệ thuật)",
      S: "Social (Xã hội)",
      E: "Enterprising (Doanh nghiệp)",
      C: "Conventional (Thông thường)",
    };

    const sortedScores = Object.entries(details || {})
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ key, value }));

    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 KẾT QUẢ TRẮC NGHIỆM RIASEC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 MÃ RIASEC: ${riasecCode}
${riasecCode.split("").map(c => `   • ${categoryNames[c]}`).join("\n")}

📈 CHI TIẾT ĐIỂM SỐ:
${sortedScores.map(
  ({ key, value }, i) =>
    `   ${i + 1}. ${categoryNames[key]}: ${value} điểm ${i === 0 ? '⭐' : i === 1 ? '🌟' : i === 2 ? '✨' : ''}`
).join("\n")}

📅 Ngày làm bài: ${createdAt
      ? new Date(createdAt).toLocaleDateString("vi-VN")
      : "N/A"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
  };

  /* ================= ASK AI ================= */
  const handleAsk = async (prompt) => {
    if (!prompt?.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    setLoading(true);
    setError("");

    try {
      let finalPrompt = prompt;

      if (resultData?.riasecCode) {
        const context = buildRiasecContext();
        finalPrompt = `${context}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❓ CÂU HỎI CỦA HỌC VIÊN: ${prompt}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 YÊU CẦU TƯ VẤN:
- Phân tích dựa trên kết quả RIASEC (${resultData.riasecCode}) ở trên
- Giải thích ý nghĩa điểm số và tính cách
- Gợi ý ngành học, nghề nghiệp CỤ THỂ phù hợp
- Đưa ra lộ trình phát triển rõ ràng
- Trình bày dễ hiểu, thân thiện bằng tiếng Việt
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

        console.log("📤 Sending WITH RIASEC context");
      } else {
        console.log("📤 Sending WITHOUT RIASEC context");
      }

      console.log("📝 Final prompt preview:", finalPrompt.substring(0, 200) + "...");

      const response = await askOpenAI(finalPrompt, resultData);

      console.log("📥 OpenAI raw response:", response);

      // Xử lý nhiều format response
      let aiReply = "";
      
      if (typeof response === 'string') {
        aiReply = response;
      } else if (response?.answer) {
        aiReply = response.answer;
      } else if (response?.reply) {
        aiReply = response.reply;
      } else if (response?.message) {
        aiReply = response.message;
      } else if (response?.data) {
        if (typeof response.data === 'string') {
          aiReply = response.data;
        } else {
          aiReply = response.data.answer || response.data.reply || response.data.message || "";
        }
      } else if (response?.choices?.[0]?.message?.content) {
        aiReply = response.choices[0].message.content;
      }

      if (!aiReply || aiReply.trim() === "") {
        console.warn("⚠️ Empty AI response:", response);
        aiReply = "Xin lỗi, tôi chưa nhận được phản hồi từ hệ thống. Vui lòng thử lại.";
      }

      console.log("✅ Final AI reply:", aiReply.substring(0, 100) + "...");

      setMessages(prev => [...prev, { role: "assistant", content: aiReply }]);
    } catch (err) {
      console.error("❌ OpenAI error:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra. Vui lòng thử lại.";
      setMessages(prev => [...prev, { role: "assistant", content: `❌ Lỗi: ${msg}` }]);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = ({ prompt }) => {
    handleAsk(prompt);
    form.resetFields();
  };

  const handleReset = () => {
    setMessages([]);
    setError("");
  };

  const getTotalScore = () =>
    Object.values(resultData?.details || {}).reduce((a, b) => a + b, 0);

  /* ================= RENDER ================= */
  // Kiểm tra có data không
  const hasResult = Boolean(resultData?.riasecCode);
  const isBasicMode = !hasResult && !loadingResult;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            onClick={() => setIsOpen(true)}
            title="Chat với AI Career Advisor"
            aria-label="Mở chat AI"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-50">
          
          {/* ========== HEADER ========== */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="AI Assistant" 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <span className="font-semibold block">Career Compass AI</span>
                {loadingResult && (
                  <span className="text-xs opacity-90">Đang tải kết quả...</span>
                )}
                {hasResult && (
                  <span className="text-xs opacity-90 font-medium">
                    {resultData.riasecCode} • {getTotalScore()} điểm
                  </span>
                )}
                {isBasicMode && (
                  <span className="text-xs opacity-90">Chế độ cơ bản</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button 
                  onClick={handleReset} 
                  title="Xóa lịch sử chat" 
                  className="hover:bg-white/20 p-1 rounded transition"
                  aria-label="Reset chat"
                >
                  <X size={20} />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)} 
                title="Đóng chat" 
                className="hover:bg-white/20 p-1 rounded transition"
                aria-label="Đóng chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* ========== ERROR BANNER ========== */}
          {error && (
            <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {/* ========== CHAT CONTENT ========== */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-3">
                
                {/* Welcome Message */}
                <div className="flex items-start gap-2">
                  <img 
                    src={logo} 
                    alt="AI" 
                    className="w-10 h-10 rounded-full flex-shrink-0 shadow-md object-cover" 
                  />
                  <div className="bg-white p-4 rounded-lg shadow-md max-w-[80%] border border-indigo-100">
                    <p className="font-bold text-base text-indigo-700 mb-2">
                      Xin chào! Tôi là AI Career Compass 👋
                    </p>
                    
                    {loadingResult ? (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Đang tải kết quả RIASEC của bạn...
                      </p>
                    ) : hasResult ? (
                      <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                        <p>
                          Tôi đã phân tích kết quả RIASEC của bạn với mã{" "}
                          <strong className="text-indigo-700">{resultData.riasecCode}</strong>.
                        </p>
                        
                        {/* Score Details */}
                        <div className="bg-indigo-50 p-2 rounded text-xs space-y-1">
                          {Object.entries(resultData.details || {})
                            .sort((a, b) => b[1] - a[1])
                            .map(([key, value], index) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="font-medium">
                                  {key} {index === 0 ? '⭐' : index === 1 ? '🌟' : index === 2 ? '✨' : ''}:
                                </span>
                                <span className="font-semibold text-indigo-700">{value} điểm</span>
                              </div>
                            ))
                          }
                        </div>
                        
                        <p className="mt-2">
                          Hãy hỏi tôi về nghề nghiệp, tính cách và lộ trình phát triển phù hợp!
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <p>
                          Tôi có thể giúp bạn tư vấn về nghề nghiệp và phát triển sự nghiệp.
                        </p>
                        {isBasicMode && (
                          <p className="mt-2 text-xs text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-200">
                            💡 <strong>Mẹo:</strong> Hoàn thành bài test RIASEC để nhận tư vấn chính xác hơn!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Predefined Prompts */}
                {!loadingResult && (
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-sm font-semibold text-gray-700 px-1">💡 Gợi ý câu hỏi:</p>
                    {predefinedPrompts.map((text, i) => (
                      <button
                        key={i}
                        onClick={() => handleAsk(text)}
                        disabled={loading}
                        className="text-left text-sm bg-white hover:bg-indigo-50 border border-gray-300 hover:border-indigo-400 hover:shadow-md rounded-lg px-4 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-medium"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              
              /* Chat Messages */
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                    msg.role === "user" 
                      ? "bg-indigo-600 text-white" 
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg shadow-md flex gap-1.5 border border-indigo-100">
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>

          {/* ========== INPUT FORM ========== */}
          <div className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg">
            <Form form={form} onFinish={onFinish} className="flex gap-2">
              <Form.Item name="prompt" className="flex-1 m-0">
                <Input
                  placeholder="Nhập câu hỏi của bạn..."
                  allowClear
                  disabled={loading}
                  onPressEnter={() => form.submit()}
                  className="text-gray-900"
                />
              </Form.Item>
              <Button 
                htmlType="submit" 
                type="primary" 
                loading={loading} 
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md"
              >
                Gửi
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelAI;
