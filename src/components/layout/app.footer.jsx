import React from "react";
import logoTruong from "../../assets/img/jpg/logo.jpg";
import { IoLogoFacebook, IoLogoYoutube } from "react-icons/io5";
import { 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  Award,
  Fingerprint
} from "lucide-react";
// Giả định ModelAI là một component hiệu ứng nền hoặc bot
import ModelAI from "../client/modelAI";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080d1a] text-slate-400 pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* <ModelAI /> */}

      {/* Ambient Background Glow - Nhẹ nhàng, chuyên nghiệp hơn */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-indigo-500/5 blur-[80px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* PHẦN 1: BRAND IDENTITY & RESEARCH INFO */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20"></div>
                <img 
                  src={logoTruong} 
                  className="relative w-14 h-14 rounded-xl object-cover border border-white/10 shadow-2xl" 
                  alt="Logo Trường THPT" 
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Career<span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Compass</span>
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  Dự án Nghiên cứu KHKT 2025 - 2026
                </div>
              </div>
            </div>
            
            <p className="text-[15px] leading-relaxed text-slate-400 max-w-md italic font-light">
              "Số hóa mô hình tâm lý học Holland (RIASEC) trong công tác định hướng nghề nghiệp, 
              nhằm tối ưu hóa năng lực chọn môn học và nghề nghiệp cho học sinh THPT trong kỷ nguyên số."
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex gap-3">
                {[
                  { icon: <IoLogoFacebook />, link: "#", label: "Facebook Project" },
                  { icon: <IoLogoYoutube />, link: "#", label: "Project Demo" },
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.link}
                    aria-label={item.label}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-500"
                  >
                    <span className="text-lg">{item.icon}</span>
                  </a>
                ))}
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-2" />
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                <Award size={14} className="text-blue-500" /> Giải pháp KHKT Cấp Tỉnh
              </div>
            </div>
          </div>

          {/* PHẦN 2: NAVIGATION & ACADEMIC LINKS */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Cột 1: Hệ sinh thái */}
            <div className="space-y-6">
              <h3 className="text-white text-[13px] font-bold tracking-[0.15em] uppercase">
                Hệ sinh thái
              </h3>
              <ul className="space-y-4 text-[14px]">
                {[
                  { name: "Phân tích RIASEC", path: "#" },
                  { name: "Dữ liệu nghề nghiệp", path: "#" },
                  { name: "Phương pháp nghiên cứu", path: "#" },
                  { name: "Học liệu hướng nghiệp", path: "#" }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.path} className="hover:text-blue-400 transition-colors flex items-center group">
                      {item.name}
                      <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 2: Thông tin pháp lý/Khoa học */}
            <div className="space-y-6">
              <h3 className="text-white text-[13px] font-bold tracking-[0.15em] uppercase">
                Tài liệu nghiên cứu
              </h3>
              <ul className="space-y-4 text-[14px]">
                {[
                  { name: "Bản quyền thuật toán", path: "#" },
                  { name: "Chính sách bảo mật dữ liệu", path: "#" },
                  { name: "Cơ sở lý luận Holland", path: "#" },
                  { name: "Báo cáo thực nghiệm", path: "#" }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.path} className="hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 3: Đơn vị thực hiện */}
            <div className="col-span-2 md:col-span-1 space-y-6">
              <h3 className="text-white text-[13px] font-bold tracking-[0.15em] uppercase">
                Đơn vị thực hiện
              </h3>
              <div className="space-y-4 text-[13.5px]">
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-slate-300 leading-snug">
                    Trường THPT Lý Tự Trọng,<br/> 
                    Hoài Nhơn Bắc, Gia Lai
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-500 shrink-0" size={16} />
                  <p className="text-slate-300">thptltt@edu.vn</p>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="text-blue-500 shrink-0" size={16} />
                  <p className="text-slate-300 font-medium">Nhóm tác giả THPT</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: CHỨNG NHẬN & COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2 group cursor-help">
              <ShieldCheck size={14} className="text-emerald-500" /> 
              <span className="group-hover:text-slate-300 transition-colors">Dữ liệu thực nghiệm 2025</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <Fingerprint size={14} className="text-indigo-500" /> 
              <span className="group-hover:text-slate-300 transition-colors">Thuật toán AI độc lập</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <Globe size={14} className="text-blue-500" /> 
              <span className="group-hover:text-slate-300 transition-colors">Cộng đồng giáo dục Việt Nam</span>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-[11px] text-slate-600 font-medium tracking-wide">
              Bản quyền nội dung thuộc về Đề tài KHKT CareerCompass
            </p>
            <p className="text-[12px] text-slate-500">
              © {currentYear} • Tác giả đề tài: <span className="text-slate-300 font-bold hover:text-blue-400 transition-colors cursor-pointer">Nguyễn Duy Thư</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;