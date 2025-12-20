import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message, Spin, Progress, Button, ConfigProvider } from "antd";
import { 
  ArrowLeftOutlined, 
  ArrowRightOutlined, 
  SendOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

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
  const [animationClass, setAnimationClass] = useState("fade-in");

  const { isAuthenticated, appLoading,  setLatestResult } = useCurrentApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (appLoading) return;

    if (!isAuthenticated) {
      message.warning("Vui lòng đăng nhập!");
      navigate("/login");
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await getQuestionsAPI();
        if (res.error === 0) {
          const shuffled = [...res.data].sort(() => Math.random() - 0.5);
          setQuestions(shuffled);
          setAnswers(shuffled.map((q) => ({ questionId: q._id, option: "" })));
        }
      } catch (err) {
        message.error("Lỗi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [appLoading, isAuthenticated, navigate]);

  const handleSelect = (option) => {
    const qId = questions[currentIndex]._id;
    setAnswers(prev => prev.map(a => a.questionId === qId ? { ...a, option } : a));
    if (currentIndex < questions.length - 1) {
      setTimeout(() => goToQuestion(currentIndex + 1), 250);
    }
  };

  const goToQuestion = (index) => {
    if (index === currentIndex || index < 0 || index >= questions.length) return;
    setAnimationClass(index > currentIndex ? "slide-left" : "slide-right");
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimationClass("fade-in");
    }, 120);
  };

  const answeredCount = useMemo(() => answers.filter(a => a.option !== "").length, [answers]);
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const handleSubmit = async () => {
    if (answeredCount < questions.length) {
      return message.warning("Vui lòng hoàn thành tất cả câu hỏi!");
    }
    
    setSubmitting(true);
    try {
      const res = await submitTestAPI({ answers });
      
      // Kiểm tra res.error hoặc res.data.error tùy vào cấu hình axios của bạn
      if (res && res.error === 0) {
        message.success("Nộp bài thành công!");

        // Lấy đúng object result (chứa riasecCode, details, ...)
        const finalResult = res.data; 
        
        // 1. Cập nhật vào Context ngay lập tức để ModelAI nhận được qua useCurrentApp
        setLatestResult(finalResult);

        // 2. Chuyển trang
        navigate(`/result/${finalResult._id}`);
      } else {
        message.error(res?.message || "Có lỗi xảy ra khi chấm điểm!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      message.error("Lỗi kết nối hệ thống!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8F9]">
      <Spin size="large" tip="Đang chuẩn bị..." />
    </div>
  );

  return (
    <ConfigProvider theme={{ token: { primaryColor: '#E11D48' } }}>
      <div className="min-h-screen bg-[#FFF8F9] pt-24 pb-10 px-4 font-sans text-slate-700">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* TRÁI: KHUNG TRẢ LỜI THU GỌN */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className={`bg-white shadow-sm border border-rose-100 rounded-2xl p-6 md:p-8 min-h-[500px] flex flex-col transition-all duration-200 ${animationClass}`}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-rose-500 font-bold text-xs uppercase tracking-tighter">Câu {currentIndex + 1} / {questions.length}</span>
                  <div className="h-[1px] flex-grow bg-rose-50"></div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                  {questions[currentIndex].content}
                </h2>
              </div>

              <div className="space-y-3 flex-grow">
                {options.map((opt, idx) => {
                  const currentQId = questions[currentIndex]._id;
                  const isSelected = answers.find(a => a.questionId === currentQId)?.option === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt)}
                      className={`w-full flex items-center p-4 rounded-xl transition-all border text-left
                        ${isSelected 
                          ? "border-rose-400 bg-rose-50/30" 
                          : "border-slate-100 bg-slate-50/30 hover:border-rose-200 hover:bg-white"}`}
                    >
                      <div className={`w-5 h-5 rounded-full border mr-4 flex-shrink-0 flex items-center justify-center
                        ${isSelected ? "border-rose-500 bg-rose-500" : "border-slate-300"}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className={`text-sm md:text-base ${isSelected ? "text-rose-600 font-semibold" : "text-slate-600 font-medium"}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-50">
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  onClick={() => goToQuestion(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="font-semibold text-slate-400"
                  type="text"
                >Trở lại</Button>

                {currentIndex === questions.length - 1 ? (
                  <Button 
                    type="primary" 
                    loading={submitting} 
                    onClick={handleSubmit} 
                    icon={<SendOutlined />}
                    className="h-11 px-8 rounded-lg bg-rose-600 font-bold shadow-md"
                  >Hoàn thành</Button>
                ) : (
                  <Button 
                    onClick={() => goToQuestion(currentIndex + 1)}
                    className="h-11 px-8 rounded-lg bg-slate-800 text-white font-semibold"
                  >Tiếp theo</Button>
                )}
              </div>
            </div>
          </div>

          {/* PHẢI: BẢNG Ô VUÔNG NHỎ (KHÔNG CHIA NHÓM) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AppstoreOutlined className="text-rose-500" />
                  <span className="font-bold text-xs uppercase tracking-tight text-slate-500">Tiến độ làm bài</span>
                </div>
                <span className="text-rose-600 font-bold text-xs">{answeredCount}/{questions.length}</span>
              </div>

              <Progress 
                percent={progressPercent} 
                strokeColor="#E11D48" 
                trailColor="#FFF1F2" 
                strokeWidth={6} 
                showInfo={false}
                className="mb-6" 
              />

              {/* Grid 8 cột, ô số cực nhỏ và sát nhau */}
              <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-8 gap-1.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {questions.map((q, idx) => {
                  const isDone = answers.find(a => a.questionId === q._id)?.option !== "";
                  const isActive = currentIndex === idx;
                  
                  return (
                    <div
                      key={q._id}
                      onClick={() => goToQuestion(idx)}
                      className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all border
                        ${isActive 
                          ? "border-rose-500 bg-rose-500 text-white shadow-sm scale-105 z-10" 
                          : isDone 
                            ? "border-rose-200 bg-rose-50 text-rose-500" 
                            : "border-slate-100 bg-slate-50/50 text-slate-300 hover:border-rose-200"}
                      `}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              {/* Chú thích thu gọn */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-around">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-rose-500 rounded-sm"></div>
                  <span className="text-[10px] text-slate-400 font-medium">Hiện tại</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-rose-50 border border-rose-200 rounded-sm"></div>
                  <span className="text-[10px] text-slate-400 font-medium">Đã xong</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-slate-100 rounded-sm"></div>
                  <span className="text-[10px] text-slate-400 font-medium">Chưa làm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .fade-in { animation: fadeIn 0.3s ease-out; }
          .slide-left { animation: slideLeft 0.15s ease-in forwards; }
          .slide-right { animation: slideRight 0.15s ease-in forwards; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideLeft { to { opacity: 0; transform: translateX(-15px); } }
          @keyframes slideRight { to { opacity: 0; transform: translateX(15px); } }
          .custom-scrollbar::-webkit-scrollbar { width: 3px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #FDA4AF; border-radius: 10px; }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default QuestionPage;