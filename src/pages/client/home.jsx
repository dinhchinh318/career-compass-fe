import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Settings,
  Search,
  Palette,
  Users,
  TrendingUp,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ChevronRight
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const riasecTypes = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Realistic",
      sub: "Nhóm Kỹ thuật (Thực tế)",
      desc: "Người thuộc nhóm này thường có khả năng về máy móc, dụng cụ, cây cối hoặc con vật. Họ thích các hoạt động ngoài trời và làm việc trực tiếp với đồ vật.",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Investigative",
      sub: "Nhóm Nghiên cứu",
      desc: "Đặc trưng bởi sự ham học hỏi, thích quan sát, tìm tòi và phân tích dữ liệu. Họ thường ưu tiên giải quyết vấn đề qua tư duy logic.",
      bgColor: "bg-rose-100/50",
      textColor: "text-rose-800",
      borderColor: "border-rose-200"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Artistic",
      sub: "Nhóm Nghệ thuật",
      desc: "Có khả năng sáng tạo phong phú, trực giác mạnh mẽ. Họ thích làm việc trong môi trường tự do, thể hiện bản thân qua nghệ thuật.",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social",
      sub: "Nhóm Xã hội",
      desc: "Thích làm việc với con người qua việc giúp đỡ, giảng dạy. Họ giàu lòng trắc ẩn và luôn hướng đến lợi ích cộng đồng.",
      bgColor: "bg-[#fff1f2]",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Enterprising",
      sub: "Nhóm Quản lý",
      desc: "Có tố chất lãnh đạo, khả năng thuyết phục và quyết đoán. Họ thích môi trường cạnh tranh và quản lý dự án, con người.",
      bgColor: "bg-rose-100/50",
      textColor: "text-rose-800",
      borderColor: "border-rose-200"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Conventional",
      sub: "Nhóm Nghiệp vụ",
      desc: "Thích làm việc với dữ liệu, con số và quy trình rõ ràng. Họ là những người tỉ mỉ, đáng tin cậy và chính xác cao.",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fffafa] text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* --- SECTION 1: HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50/50 to-transparent -z-10 skew-x-12"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-100/40 blur-[100px] rounded-full -z-10"></div>
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-rose-100 shadow-sm text-rose-600 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
            <ShieldCheck size={16} className="text-rose-500" /> 
            Dự án Nghiên cứu Khoa học Kỹ thuật
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Thấu hiểu bản thân <br/>
            Định hướng <span className="text-rose-600 relative">
              Tương lai
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9C118.957 4.47226 238.497 3.35976 355 8" stroke="#FDA4AF" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
              "Lựa chọn nghề nghiệp đúng đắn là chìa khóa mở ra cánh cửa thành công và hạnh phúc."
            </p>
            
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto text-justify md:text-center">
              Dựa trên học thuyết RIASEC của Tiến sĩ John Holland, chúng tôi giúp bạn khám phá thế mạnh tiềm ẩn và kết nối với những ngành nghề phù hợp nhất.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
              <button 
                onClick={() => navigate("/register")}
                className="group relative px-10 py-5 bg-rose-600 text-white rounded-full font-bold text-lg shadow-xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <span>Bắt đầu khám phá</span>
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('riasec-grid').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-rose-300 transition-all duration-300"
              >
                Tìm hiểu RIASEC
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: RIASEC GRID --- */}
      <section id="riasec-grid" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3 text-rose-500 font-bold tracking-widest text-sm uppercase">
              <div className="hidden md:block w-10 h-[2px] bg-rose-500"></div>
              Hệ thống phân loại
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">
              6 Nhóm Tính Cách Đặc Trưng
            </h2>
          </div>
          <p className="max-w-md text-slate-500 text-sm leading-relaxed mx-auto md:mx-0">
            Mỗi cá nhân thường là sự kết hợp của nhiều nhóm, định hình nên phong cách làm việc độc bản.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {riasecTypes.map((type, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-[2.5rem] border ${type.borderColor} ${type.bgColor} transition-all duration-500 hover:shadow-2xl hover:shadow-rose-100/60 group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-10">
                <div className={`p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-500 ${type.textColor}`}>
                  {type.icon}
                </div>
                <span className="text-rose-200/50 text-5xl font-black italic select-none">
                  0{i + 1}
                </span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <h3 className="text-[11px] font-black text-rose-400 uppercase tracking-[0.2em] mb-1">
                    {type.title}
                  </h3>
                  <h4 className="text-2xl font-bold text-slate-800">
                    {type.sub}
                  </h4>
                </div>
                
                <p className="text-slate-600 leading-relaxed pt-4 border-t border-rose-200/40">
                  {type.desc}
                </p>
              </div>

              {/* Decorative Circle on Hover */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:bg-rose-200/20 transition-all"></div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: CALL TO ACTION CARD --- */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center md:text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 text-rose-400 font-bold text-sm tracking-wider uppercase">
                <BookOpen size={20} />
                Bắt đầu hành trình của bạn
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Sẵn sàng thực hiện bài trắc nghiệm chuẩn hóa?
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Chỉ mất 10 phút để nhận diện tính cách và nhận gợi ý lộ trình học tập tối ưu.
              </p>
            </div>
            
            <button 
              onClick={() => navigate("/register")}
              className="group flex-shrink-0 w-full md:w-auto px-12 py-6 bg-rose-600 text-white rounded-2xl font-black text-xl hover:bg-rose-500 hover:shadow-2xl hover:shadow-rose-600/30 transition-all flex items-center justify-center gap-3"
            >
              Đăng ký ngay
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-rose-100/20 blur-[120px] -z-20 rounded-full pointer-events-none"></div>
    </div>
  );
};

export default HomePage;