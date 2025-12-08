import { Form, Input, Button } from "antd";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import logo from "../../assets/img/jpg/logo.jpg";
import { askOpenAI } from "../../services/openai.service";

const ModelAI = ({ riasecResult = null }) => {
  const [messages, setMessages] = useState([]);
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const predefinedPrompts = [
    "Tôi nên học ngành gì?",
    "Phân tích tính cách của tôi",
    "Gợi ý nghề nghiệp phù hợp",
  ];

  const handleAsk = async (prompt) => {
  if (!prompt || !prompt.trim()) return;

  const userMessage = { role: "user", content: prompt };
  setMessages((prev) => [...prev, userMessage]);

  setLoading(true);

  try {
    const response = await askOpenAI(prompt, riasecResult, { rawResponse: true });

    // Nếu muốn raw response
    let aiReply;
    if (response?.config) {
      // Đây là response nguyên từ Axios
      aiReply = JSON.stringify(response.data, null, 2); 
    } else {
      // Đây là response.data bình thường
      aiReply = response?.answer || response?.reply || response?.message || "Xin lỗi, tôi không thể trả lời câu hỏi này.";
    }


    console.log("Final AI Reply:", aiReply);

    const aiMessage = { role: "assistant", content: aiReply };
    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error("askOpenAI error:", err);

    const errorMessage = {
      role: "assistant",
      content: `Lỗi: ${err.response?.data?.message || err.message || "Đã có lỗi xảy ra. Vui lòng thử lại."}`
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setLoading(false);
  }
};



  const onFinish = ({ prompt }) => {
    handleAsk(prompt);
    form.resetFields();
  };

  const handleReset = () => setMessages([]);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
            onClick={() => setIsOpen(true)}
            title="Chat với AI"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="AI" className="w-8 h-8 rounded-full" />
              <span className="font-semibold">Career Compass AI</span>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button onClick={handleReset} title="Reset chat" className="hover:bg-white/20 p-1 rounded transition">
                  <X size={20} />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} title="Đóng" className="hover:bg-white/20 p-1 rounded transition">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100">
            {messages.length === 0 ? (
              <div className="flex flex-col gap-3">
                {/* Welcome message */}
                <div className="flex items-start gap-2">
                  <img src={logo} alt="AI" className="w-10 h-10 rounded-full flex-shrink-0 shadow-md" />
                  <div className="bg-white p-4 rounded-lg shadow-md max-w-[80%] border border-indigo-100">
                    <p className="font-bold text-base text-indigo-700 mb-2">
                      Xin chào! Tôi là AI Career Compass 👋
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Tôi có thể giúp bạn tư vấn về nghề nghiệp, phân tích tính cách và gợi ý lộ trình phát triển dựa trên kết quả RIASEC của bạn.
                    </p>
                  </div>
                </div>

                {/* Predefined prompts */}
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
              </div>
            ) : (
              // Chat messages
              messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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

            {/* Loading indicator */}
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

          {/* Input */}
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
