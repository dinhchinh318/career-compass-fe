import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Form, Input, Button, Avatar, Badge, Tooltip, Empty } from "antd";
import { 
  MessageCircle, Send, Sparkles, RotateCcw, 
  User, Bot, ChevronDown 
} from "lucide-react";
import ReactMarkdown from "react-markdown"; // Thêm thư viện render Markdown
import remarkGfm from "remark-gfm"; // Hỗ trợ bảng và task list
import logo from "../../assets/img/jpg/logo.jpg";
import { askOpenAI } from "../../services/openai.service";
import { useCurrentApp } from "../context/app.context";

const ModelAI = () => {
  const { user, latestResult } = useCurrentApp();
  const userId = user?._id || null;
  const scrollRef = useRef(null);
  const [form] = Form.useForm();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const storageKey = useMemo(() => (userId ? `chat_user_${userId}` : `chat_guest`), [userId]);

  /* ================= CORE LOGIC: ĐỒNG BỘ TRIỆT ĐỂ ================= */
  
  // Lưu lịch sử
  const saveChatHistory = useCallback((msgs) => {
    localStorage.setItem(storageKey, JSON.stringify(msgs.slice(-20)));
  }, [storageKey]);

  // Xóa lịch sử
  const clearChatHistory = useCallback(() => {
    localStorage.removeItem(storageKey);
    setMessages([]);
  }, [storageKey]);

  // FIX 1: Tự động dọn dẹp khi logout
  useEffect(() => {
    if (!userId) {
      clearChatHistory();
      Object.keys(localStorage).forEach(k => k.startsWith('chat_') && localStorage.removeItem(k));
    }
  }, [userId, clearChatHistory]);

  // FIX 2: Đồng bộ ngay khi có mã RIASEC mới (Quan trọng nhất)
  // Sử dụng JSON.stringify để so sánh object latestResult sâu hơn
  useEffect(() => {
    if (latestResult?.riasecCode) {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : [];
      
      // Nếu tin nhắn đầu tiên chưa có context của mã hiện tại, ta reset để AI tư vấn lại từ đầu
      if (parsed.length > 0 && !parsed[0].content.includes(latestResult.riasecCode)) {
        clearChatHistory();
      }
    }
  }, [latestResult?.riasecCode, storageKey, clearChatHistory]);

  // Tự động cuộn
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  /* ================= ACTION ================= */
  const handleAsk = async (values) => {
    const content = values.prompt?.trim();
    if (!content || loading) return;

    const userMsg = { id: Date.now(), role: "user", content };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    form.resetFields();
    setLoading(true);

    try {
      // Gửi mã RIASEC để AI luôn nhớ context
      const contextPrompt = latestResult?.riasecCode 
        ? `[USER_RIASEC: ${latestResult.riasecCode}]. Trả lời câu hỏi này theo phong cách chuyên gia tư vấn hướng nghiệp: ${content}` 
        : content;

      const response = await askOpenAI(contextPrompt, latestResult);
      
      const aiMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: typeof response === 'string' ? response : (response?.answer || "Lỗi kết nối")
      };

      const finalMsgs = [...newMessages, aiMsg];
      setMessages(finalMsgs);
      saveChatHistory(finalMsgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-bounce-subtle">
          <Badge count={latestResult?.riasecCode ? "RIASEC" : 0} color="#4f46e5">
            <Button
              type="primary"
              shape="circle"
              icon={<MessageCircle size={28} />}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 shadow-2xl bg-indigo-600 border-none flex items-center justify-center text-white hover:scale-110 transition-transform"
            />
          </Badge>
        </div>
      )}

      <div className={`fixed z-[9998] transition-all duration-500 flex flex-col bg-white shadow-2xl
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        bottom-0 right-0 w-full h-full md:bottom-24 md:right-6 md:w-[450px] md:h-[min(700px,85vh)] md:rounded-3xl border border-slate-100 overflow-hidden
      `}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={logo} size={42} className="ring-2 ring-indigo-50" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm m-0">AI Career Coach</h3>
              {latestResult && (
                <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                  KẾT QUẢ: {latestResult.riasecCode}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button type="text" shape="circle" icon={<RotateCcw size={16} />} onClick={clearChatHistory} className="text-slate-400" />
            <Button type="text" shape="circle" icon={<ChevronDown size={22} />} onClick={() => setIsOpen(false)} />
          </div>
        </div>

        {/* Chat Content with Markdown Support */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-[#f8fafc] space-y-4 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <Sparkles size={40} className="mb-4 text-indigo-200" />
              <p className="text-sm italic">"Tôi có thể giúp bạn tìm công việc phù hợp với mã {latestResult?.riasecCode || 'RIASEC'} của mình."</p>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex max-w-[90%] gap-2 ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <Avatar size={32} icon={msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />} className={msg.role === 'assistant' ? 'bg-indigo-600' : 'bg-slate-700'} />
                  
                  {/* Markdown Container */}
                  <div className={`p-3.5 rounded-2xl text-[14px] shadow-sm prose prose-slate max-w-none ${
                    msg.role === 'assistant' 
                      ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
                      : 'bg-indigo-600 text-white rounded-tr-none'
                  }`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start pl-10">
              <div className="bg-indigo-50 text-indigo-500 px-4 py-2 rounded-full text-xs font-medium animate-pulse">
                Đang phân tích định hướng...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <Form form={form} onFinish={handleAsk}>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 ring-indigo-100 transition-all">
              <Form.Item name="prompt" className="m-0 flex-1">
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  placeholder="Gõ thắc mắc của bạn tại đây..."
                  variant="borderless"
                  className="py-3 pl-4 pr-12 text-[15px]"
                  onPressEnter={(e) => {
                    if(!e.shiftKey && window.innerWidth > 768) { 
                      e.preventDefault(); 
                      form.submit(); 
                    }
                  }}
                />
              </Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                icon={<Send size={18} />} 
                className="absolute right-2 bottom-2 rounded-xl h-9 w-9 bg-indigo-600 border-none z-10"
              />
            </div>
          </Form>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
          .prose ul { padding-left: 1.2rem; margin: 0.5rem 0; }
          .prose strong { color: inherit; font-weight: 700; }
          .prose p { margin-bottom: 0.5rem; line-height: 1.5; }
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-subtle { animation: bounce-subtle 3s infinite ease-in-out; }
        `}} />
      </div>
    </>
  );
};

export default ModelAI;