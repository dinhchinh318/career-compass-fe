import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form, Input, Button, Avatar, Badge, Tooltip } from "antd";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  User, 
  Bot, 
  Info,
  ChevronRight
} from "lucide-react";
import logo from "../../assets/img/jpg/logo.jpg";
import { askOpenAI } from "../../services/openai.service";
import { getResultByIdAPI } from "../../services/api.result";
import { useCurrentApp } from "../context/app.context";

/**
 * ModelAI Component - Production-Level AI Career Advisor
 * Features: Auth-aware state, Chat Memory Zones, Session Management
 */
const ModelAI = () => {
  /* ================= CONTEXT & REFS ================= */
  const { user, latestResult } = useCurrentApp();
  const userId = user?._id || null;
  const resultId = latestResult?._id || null;
  const scrollRef = useRef(null);
  const [form] = Form.useForm();

  /* ================= CHAT MEMORY HELPERS ================= */
  const getStorageKey = useCallback(() => {
    return userId ? `chat_user_${userId}` : `chat_guest`;
  }, [userId]);

  const loadChatHistory = useCallback(() => {
    const saved = localStorage.getItem(getStorageKey());
    return saved ? JSON.parse(saved) : [];
  }, [getStorageKey]);

  const saveChatHistory = (msgs) => {
    localStorage.setItem(getStorageKey(), JSON.stringify(msgs));
  };

  const clearChatHistory = () => {
    localStorage.removeItem(getStorageKey());
    setMessages([]);
  };

  /* ================= STATE ================= */
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(`sess_${Date.now()}`);

  /* ================= AUTH & STORAGE EFFECT ================= */
  // Handles Login/Logout state transitions
  useEffect(() => {
    // 1. Reset volatile states
    setMessages([]);
    setResultData(null);
    setError("");
    setSessionId(`sess_${Date.now()}`); // New session for new user state

    // 2. Load history based on new Zone (User or Guest)
    const history = loadChatHistory();
    setMessages(history);

    // 3. Clean up UI
    form.resetFields();
    
    console.log(`Auth Transition: ${userId ? 'User Mode' : 'Guest Mode'}`);
  }, [userId, loadChatHistory]); 

  /* ================= RIASEC DATA EFFECT ================= */
  useEffect(() => {
    if (latestResult) {
      setResultData(latestResult);
      return;
    }

    if (!userId && !resultId) {
        setResultData(null);
        return;
    }

    const fetchResult = async () => {
      try {
        setLoadingResult(true);
        const res = await getResultByIdAPI(resultId || userId);
        const data = res?.data || res;
        if (data?.riasecCode) setResultData(data);
      } catch (err) {
        setError("Không thể tải kết quả RIASEC");
      } finally {
        setLoadingResult(false);
      }
    };
    fetchResult();
  }, [latestResult, userId, resultId]);

  /* ================= UX HELPERS ================= */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  /* ================= AI LOGIC ================= */
  const handleAsk = async (content) => {
    if (!content?.trim() || loading) return;

    const userMsg = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: content.trim(),
      createdAt: new Date().toISOString(),
      sessionId,
      userId
    };

    const updatedWithUser = [...messages, userMsg];
    setMessages(updatedWithUser);
    saveChatHistory(updatedWithUser);
    setLoading(true);
    form.resetFields();

    try {
      let finalPrompt = content;
      if (resultData?.riasecCode) {
        finalPrompt = `[RIASEC: ${resultData.riasecCode}]\nQuestion: ${content}\nProvide expert career advice in Vietnamese.`;
      }

      const response = await askOpenAI(finalPrompt, resultData);
      
      const aiReply = typeof response === 'string' 
        ? response 
        : (response?.answer || response?.choices?.[0]?.message?.content || "Hệ thống đang bận.");

      const aiMsg = {
        id: `msg_${Date.now() + 1}`,
        role: "assistant",
        content: aiReply,
        createdAt: new Date().toISOString(),
        sessionId,
        userId
      };

      const finalHistory = [...updatedWithUser, aiMsg];
      setMessages(finalHistory);
      saveChatHistory(finalHistory);
    } catch (err) {
      setError("AI không phản hồi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER SUB-COMPONENTS ================= */
  const MessageBubble = ({ msg }) => {
    const isAi = msg.role === "assistant";
    return (
      <div className={`flex w-full mb-4 ${isAi ? "justify-start" : "justify-end"}`}>
        <div className={`flex max-w-[85%] ${isAi ? "flex-row" : "flex-row-reverse"}`}>
          <div className="mt-1 flex-shrink-0">
            {isAi ? <Avatar icon={<Bot size={18} />} className="bg-indigo-100 text-indigo-600 shadow-sm" /> : <Avatar icon={<User size={18} />} className="bg-slate-200 text-slate-600" />}
          </div>
          <div className={`mx-2 p-3 rounded-2xl text-sm shadow-sm ${isAi ? "bg-white text-slate-800 border border-slate-100 rounded-tl-none" : "bg-indigo-600 text-white rounded-tr-none"}`}>
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Badge dot={messages.length === 0 && !isOpen} color="#4f46e5" offset={[-5, 5]}>
          <button onClick={() => setIsOpen(!isOpen)} className={`w-14 h-14 rounded-full shadow-2xl transition-all flex items-center justify-center text-white ${isOpen ? "bg-slate-800 rotate-90" : "bg-indigo-600 hover:scale-105"}`}>
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </button>
        </Badge>
      </div>

      {/* Chat Interface */}
      <div className={`fixed z-[9998] transition-all duration-300 flex flex-col bg-white shadow-2xl
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        bottom-0 right-0 w-full h-full md:bottom-24 md:right-6 md:w-[420px] md:h-[min(650px,80vh)] md:rounded-3xl border border-slate-100 overflow-hidden
      `}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={logo} size="large" className="border border-slate-100" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">Career Advisor AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {userId ? "USER MODE" : "GUEST MODE"}
                </span>
                {resultData && <Badge count={resultData.riasecCode} style={{ backgroundColor: '#4f46e5', fontSize: '10px' }} />}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Tooltip title="Xóa lịch sử">
              <button onClick={clearChatHistory} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                <RotateCcw size={16} />
              </button>
            </Tooltip>
            <button onClick={() => setIsOpen(false)} className="p-2 md:hidden hover:bg-slate-50 rounded-full"><X size={20} /></button>
          </div>
        </div>

        {/* Chat Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 bg-[#fafbff] scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <Sparkles size={40} className="text-indigo-200 mb-3" />
              <p className="text-sm font-medium">Bắt đầu trò chuyện để nhận tư vấn hướng nghiệp</p>
            </div>
          ) : (
            messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)
          )}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 animate-pulse text-xs text-indigo-400 font-medium">AI đang suy nghĩ...</div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <Form form={form} onFinish={({ prompt }) => handleAsk(prompt)}>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-2xl focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
              <Form.Item name="prompt" className="m-0 flex-1">
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="bg-transparent border-none shadow-none focus:ring-0 text-sm"
                  onPressEnter={(e) => { if(!e.shiftKey) { e.preventDefault(); form.submit(); } }}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} icon={<Send size={16} />} className="rounded-xl bg-indigo-600 border-none h-10 w-10 flex items-center justify-center shadow-lg shadow-indigo-100" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ModelAI;