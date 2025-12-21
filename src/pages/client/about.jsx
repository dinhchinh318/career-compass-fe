import React from "react";
import { Tag, Typography, Divider } from "antd";
import { 
  Target, Users, Rocket, CheckCircle2, Microscope, School, 
  Database, Activity, ChevronRight, Award, Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import backgroundTruong from "../../assets/img/jpg/background.jpg";
import logoTruong from "../../assets/img/jpg/logo.jpg";


const { Title, Paragraph, Text } = Typography;

const RESEARCH_STATS = [
  { label: "Mẫu thực nghiệm", value: "250+", icon: Users, color: "from-rose-500 to-orange-500" },
  { label: "Độ chính xác", value: "92%", icon: Target, color: "from-orange-500 to-amber-600" },
  { label: "Dữ liệu ngành", value: "500+", icon: Database, color: "from-pink-500 to-rose-600" },
  { label: "Chỉ số tin cậy", value: "Alpha", icon: Activity, color: "from-red-500 to-pink-700" },
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fff5f7] text-slate-800 pb-20 font-sans overflow-x-hidden">
      
      {/* 1. HERO HEADER - Tối ưu độ nổi bật của chữ */}
      <section className="relative pt-32 pb-40 px-4 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Lớp nền ảnh trường */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundTruong})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7) contrast(1.2)' // Làm tối ảnh hơn một chút để chữ trắng/sáng nổi lên
          }}
        />
        
        {/* Lớp phủ Gradient Hồng-Cam đậm chất Sunset để trợ sáng cho chữ */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-rose-900/40 via-[#fff5f7]/80 to-[#fff5f7]" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          {/* Badge nổi bật */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-600 text-white mb-8 shadow-xl shadow-rose-500/30 border border-rose-400">
            <Award size={18} className="text-yellow-300" />
            <span className="text-sm font-bold tracking-widest uppercase">Dự án KHKT Cấp Tỉnh 2025 - 2026</span>
          </div>
          
          {/* Tiêu đề chính với Text-Shadow để nổi bật tuyệt đối */}
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
            Nghiên cứu Hệ thống <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-600 to-pink-700 drop-shadow-sm">
              Career Compass AI
            </span>
          </h1>
          
          {/* Paragraph với nền mờ nhẹ để dễ đọc hơn */}
          <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-lg">
            <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-semibold">
              Hệ thống trắc nghiệm hướng nghiệp RIASEC ứng dụng trí tuệ nhân tạo, 
              biến áp lực chọn ngành thành hành trình khám phá bản thân thú vị.
            </p>
          </div>

          {/* Stats Cards - Dùng màu đậm hơn để nổi bật trên nền hồng nhạt */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
            {RESEARCH_STATS.map((item, i) => (
              <div key={i} className="bg-white/80 border border-rose-100 p-8 rounded-[2.5rem] shadow-2xl shadow-rose-200/40 group hover:scale-105 transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 mx-auto shadow-lg shadow-rose-500/40 text-white`}>
                  <item.icon size={28} />
                </div>
                <div className="text-4xl font-black mb-1 tracking-tighter text-slate-900">{item.value}</div>
                <div className="text-rose-600 text-[10px] font-extrabold uppercase tracking-[0.2em]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SCHOOL PRIDE - Giữ nguyên tông nóng chuyên nghiệp */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="bg-white border-4 border-rose-50 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(244,63,94,0.15)]">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-rose-500"><School size={400} /></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
             <div className="md:w-1/3 text-center">
                <div className="w-52 h-52 bg-white p-6 rounded-[3rem] shadow-2xl border-2 border-rose-100 flex items-center justify-center rotate-3">
                  <img
                    src={logoTruong}
                    alt="Logo Trường"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mt-10 tracking-tight">THPT LÝ TỰ TRỌNG</h2>
                <div className="h-1.5 w-16 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto mt-4 rounded-full"></div>
             </div>
             
             <div className="md:w-2/3 text-left">
                <div className="inline-flex items-center gap-2 text-rose-600 font-black mb-6 tracking-widest text-sm">
                  <Sparkles size={20} className="fill-rose-500" /> <span>NƠI ƯƠM MẦM TÀI NĂNG</span>
                </div>
                <Title level={2} className="!text-slate-900 !font-black mb-8 !text-4xl md:!text-5xl leading-tight">
                  Môi trường giáo dục <br/> 
                  <span className="text-rose-600">Sáng tạo & Hội nhập</span>
                </Title>
                <Paragraph className="text-slate-600 text-xl leading-relaxed font-medium">
                  Đề tài được thực hiện bởi niềm tin rằng mỗi học sinh là một cá thể độc nhất. 
                  Với sự bảo trợ từ nhà trường, chúng tôi kiến tạo giải pháp giúp các bạn tự tin làm chủ tương lai.
                </Paragraph>
             </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO SECTION - Tăng cường tương phản */}
      <section className="py-24 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gradient-to-br from-white to-rose-50/30 border-2 border-white p-12 rounded-[3.5rem] shadow-xl shadow-rose-200/20 flex flex-col justify-between">
             <div>
                <div className="w-16 h-16 rounded-3xl bg-rose-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-rose-500/30">
                  <Microscope size={32} />
                </div>
                <h3 className="text-4xl font-black mb-6 text-slate-900">Nền tảng Khoa học</h3>
                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                  Ứng dụng mô hình tâm lý học <span className="text-rose-600 font-bold underline decoration-rose-300 underline-offset-8">RIASEC</span> kết hợp với thuật toán AI, 
                  chúng tôi mang đến kết quả hướng nghiệp có cơ sở dữ liệu thực chứng mạnh mẽ.
                </p>
             </div>
             <div className="mt-12 flex gap-4">
                <Tag color="volcano" className="rounded-full px-6 py-1.5 font-bold border-none shadow-md uppercase tracking-wider text-[10px]">AI Algorithm</Tag>
                <Tag color="magenta" className="rounded-full px-6 py-1.5 font-bold border-none shadow-md uppercase tracking-wider text-[10px]">Big Data</Tag>
             </div>
          </div>

          <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
             <div className="h-full flex flex-col justify-between relative z-10">
                <Rocket size={48} className="mb-10 text-rose-500" />
                <div>
                   <h3 className="text-3xl font-black mb-8 text-white">Triển vọng</h3>
                   <ul className="space-y-6">
                      {["Công nghệ 4.0", "Số hóa giáo dục", "Kết quả thực chứng"].map(item => (
                        <li key={item} className="flex items-center gap-4 font-bold text-lg text-slate-200">
                          <CheckCircle2 size={24} className="text-rose-500" /> {item}
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-24 text-center">
         <div className="max-w-3xl mx-auto px-4 bg-gradient-to-r from-rose-500 to-orange-500 p-16 rounded-[4rem] shadow-2xl shadow-rose-500/40 transform hover:-translate-y-2 transition-transform">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
               Sẵn sàng để kiến tạo <br/> tương lai của chính mình?
            </h3>
            <button
              onClick={() => navigate("/question")}
              className="bg-white text-rose-600 px-12 py-5 rounded-full font-black text-xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-4 mx-auto shadow-xl group"
            >
              BẮT ĐẦU NGAY
              <ChevronRight
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>

         </div>
      </section>
    </div>
  );
}