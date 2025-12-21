import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, message, Tag } from "antd";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer 
} from "recharts";
import { 
  BookOpen, Briefcase, GraduationCap, 
  LayoutDashboard, Star, Trophy, ArrowLeft, RefreshCw,
  Sparkles, CheckCircle2, Rocket, Lightbulb, Compass, Target
} from "lucide-react";
import { useCurrentApp } from "../../components/context/app.context";
import { getResultByIdAPI } from "../../services/api.result";

// --- DỮ LIỆU ĐỊNH HƯỚNG SẮC NÉT ---
const STUDY_ORIENTATION = {
  R: { subjects: ["Toán học", "Vật Lý", "Công Nghệ"], groups: "Khối A, A1", icon: "🛠️", color: "#e11d48" },
  I: { subjects: ["Toán học", "Hóa Học", "Sinh Học"], groups: "Khối A, B", icon: "🔬", color: "#2563eb" },
  A: { subjects: ["Ngữ Văn", "Tiếng Anh", "Mỹ Thuật"], groups: "Khối D, H, V", icon: "🎨", color: "#7c3aed" },
  S: { subjects: ["Ngữ Văn", "GDCD", "Tiếng Anh"], groups: "Khối D, C", icon: "🤝", color: "#059669" },
  E: { subjects: ["Toán học", "Ngữ Văn", "Tiếng Anh"], groups: "Khối D, A1", icon: "🚀", color: "#ea580c" },
  C: { subjects: ["Toán học", "Tin Học", "KTPL"], groups: "Khối A, D", icon: "📅", color: "#4b5563" }
};

const ResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, appLoading } = useCurrentApp();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appLoading &&!isAuthenticated) { navigate("/login"); return; }
    const fetchResult = async () => {
      try {
        const res = await getResultByIdAPI(id);
        if (res.data) setResult(res.data);
      } catch (err) { message.error("Lỗi tải dữ liệu"); }
      finally { setLoading(false); }
    };
    fetchResult();
  }, [id, isAuthenticated, navigate]);

  const chartData = useMemo(() => {
    if (!result?.details) return [];
    return Object.entries(result.details).map(([key, value]) => ({
      subject: key,
      A: value,
    }));
  }, [result]);

  const getCategoryName = (code) => ({
    R: "Thực tế", I: "Khám phá", A: "Nghệ thuật", S: "Xã hội", E: "Quản lý", C: "Nghiệp vụ",
  }[code] || code);

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-[#FFF5F7]"><Spin size="large" /></div>;

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-slate-800 font-sans pb-20">
      
      {/* 1. HEADER SECTION - TƯƠNG PHẢN MẠNH */}
      <div className="pt-8 md:pt-36 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] border-2 border-rose-100 shadow-[0_8px_30px_rgb(255,192,203,0.2)] overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Left Info */}
            <div className="p-8 md:p-14 lg:w-2/3 border-b lg:border-b-0 lg:border-r-2 border-rose-50">
              <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Target size={14} strokeWidth={3} /> Kết quả phân tích RIASEC
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                Mã định danh: <br/>
                <span className="text-rose-600 italic">{result.riasecCode}</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl">
                Bạn thuộc nhóm <span className="text-slate-900 font-bold underline decoration-rose-400 decoration-4 underline-offset-4">{getCategoryName(result.riasecCode[0])}</span>. 
                Sở thích và năng lực của bạn tập trung mạnh nhất vào các lĩnh vực đòi hỏi sự {getCategoryDescriptionTV(result.riasecCode[0]).split('.')[0].toLowerCase()}.
              </p>
            </div>

            {/* Right Chart */}
            <div className="p-8 lg:w-1/3 bg-rose-50/30 flex justify-center items-center w-full">
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="#f43f5e" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#881337', fontSize: 14, fontWeight: 800 }} />
                    <Radar 
                      name="Score" 
                      dataKey="A" 
                      stroke="#e11d48" 
                      strokeWidth={3}
                      fill="#fb7185" 
                      fillOpacity={0.6} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHI TIẾT CÁC NHÓM - CHIA CARD RÕ RÀNG */}
      <div className="mt-12 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Nhóm Tính Cách Chi Tiết */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><LayoutDashboard size={20}/></div>
            Phân tích chi tiết nhóm
          </h2>
          
          {result.riasecCode.split("").map((code, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:border-rose-200 transition-all flex gap-5 items-start">
              <div className="text-4xl bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                {STUDY_ORIENTATION[code].icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{getCategoryName(code)} ({code})</h3>
                <p className="text-slate-500 leading-relaxed italic">
                  "{getCategoryDescriptionTV(code)}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nghề Nghiệp Gợi Ý */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white"><Briefcase size={20}/></div>
            Thị trường nghề nghiệp
          </h2>
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl text-white h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Star size={80} fill="white"/></div>
             <div className="relative z-10 space-y-8">
                {result.riasecCode.split("").map(code => (
                  <div key={code}>
                    <div className="text-rose-400 font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                       <span className="w-2 h-2 bg-rose-400 rounded-full"></span> Nhóm {getCategoryName(code)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getCareerPaths(code).map((job, i) => (
                        <span key={i} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-sm font-medium border border-white/10 transition-colors">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 3. LỘ TRÌNH HỌC TẬP - ĐIỂM NHẤN CHÍNH */}
      <div className="mt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] border-2 border-indigo-600 p-8 md:p-14 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.2)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 text-indigo-600 font-black uppercase tracking-[0.2em] text-xs mb-3">
                 <GraduationCap /> Lộ trình học tập lớp 9-12
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">Chiến lược <span className="text-indigo-600">Chọn môn học</span></h2>
            </div>
            <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
              <span className="text-indigo-700 font-bold">Chương trình GDPT 2018</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {result.riasecCode.split("").slice(0, 2).map((code, idx) => (
              <div key={idx} className={`rounded-[2rem] p-8 ${idx === 0 ? 'bg-indigo-50 border-2 border-indigo-100' : 'bg-rose-50 border-2 border-rose-100'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">
                    {STUDY_ORIENTATION[code].icon}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-xl">{getCategoryName(code)}</div>
                    <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">{idx === 0 ? 'Mục tiêu chính' : 'Kỹ năng bổ trợ'}</div>
                  </div>
                </div>

                <div className="space-y-6">
                   <div>
                     <div className="text-xs font-black text-indigo-600 uppercase mb-2">Tổ hợp môn ưu tiên</div>
                     <div className="text-slate-800 font-bold text-lg leading-snug">
                       {STUDY_ORIENTATION[code].subjects.join(", ")} <br/>
                       <span className="text-rose-600 bg-rose-100 px-2 py-0.5 rounded text-sm">{STUDY_ORIENTATION[code].groups}</span>
                     </div>
                   </div>
                   
                   <div className="bg-white/60 p-5 rounded-2xl border border-white">
                      <div className="flex items-center gap-2 mb-2 text-slate-900 font-black text-sm">
                        <CheckCircle2 size={16} className="text-green-600" /> Hành động cụ thể:
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        {code === 'R' ? 'Tham gia ngay các CLB khoa học kỹ thuật hoặc thực hành tháo lắp máy móc tại nhà.' : 
                         code === 'I' ? 'Thử sức với các đề thi HSG hoặc nghiên cứu một đề tài khoa học nhỏ mà bạn thích.' :
                         code === 'A' ? 'Bắt đầu viết nhật ký sáng tạo hoặc tham gia các lớp học vẽ/nhạc chuyên nghiệp.' :
                         code === 'S' ? 'Đăng ký làm tình nguyện viên cho các tổ chức giáo dục hoặc các CLB thiện nguyện.' :
                         code === 'E' ? 'Tập lập kế hoạch kinh doanh nhỏ hoặc thuyết trình trước đám đông nhiều hơn.' :
                         'Học cách sử dụng các công cụ quản lý dữ liệu như Excel hoặc lập kế hoạch chi tiêu.'}
                      </p>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center gap-4">
             <div className="bg-amber-100 p-3 rounded-full text-amber-600"><Lightbulb /></div>
             <p className="text-slate-600 text-sm font-medium">
               <span className="font-black text-slate-900">Bí quyết chọn môn:</span> Đừng chỉ chọn môn mình thích, hãy chọn tổ hợp môn mà bạn có thể đạt điểm cao nhất để tối ưu cơ hội xét tuyển Đại học theo khối ngành đã gợi ý ở trên.
             </p>
          </div>
        </div>
      </div>

      {/* 4. ACTIONS */}
      <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6 px-4">
        <button onClick={() => navigate("/question")} className="flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black border-2 border-slate-200 hover:bg-slate-50 transition-all shadow-lg shadow-slate-100">
          <RefreshCw size={20} /> Làm lại bài test
        </button>
        <button onClick={() => navigate("/ai")} className="flex items-center justify-center gap-3 bg-rose-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-rose-700 transition-all shadow-xl shadow-rose-200">
          <Compass size={20} /> Khám phá thêm lộ trình <ArrowLeft size={20} className="rotate-180" />
        </button>
      </div>

    </div>
  );
};

const getCategoryDescriptionTV = (code) => ({
  R: "Thực tế và hành động. Bạn mạnh mẽ, khéo léo và thích làm việc trực tiếp với đồ vật, máy móc.",
  I: "Khám phá và phân tích. Bạn là nhà thông thái tương lai, thích giải mã những bí ẩn bằng tư duy logic.",
  A: "Nghệ thuật và tự do. Bạn trân trọng cái đẹp và không thích những quy tắc gò bó.",
  S: "Xã hội và kết nối. Bạn có trái tim ấm áp, giỏi lắng nghe và thích giúp đỡ mọi người.",
  E: "Quản lý và lãnh đạo. Bạn đầy năng lượng, sức thuyết phục và thích chinh phục những mục tiêu lớn.",
  C: "Nghiệp vụ và tỉ mỉ. Bạn là người đáng tin cậy với sự ngăn nắp và tôn trọng quy trình.",
}[code] || "");

const getCareerPaths = (code) => ({
  R: ['Kỹ sư cơ khí', 'Phi công', 'Kiến trúc sư', 'Công nghệ ô tô'],
  I: ['Nhà khoa học', 'Lập trình viên', 'Bác sĩ', 'Phân tích dữ liệu'],
  A: ['Họa sĩ', 'Nhà thiết kế', 'Truyền thông', 'Copywriter'],
  S: ['Giáo viên', 'Tâm lý học', 'Điều dưỡng', 'Quản trị nhân sự'],
  E: ['Giám đốc', 'Luật sư', 'Doanh nhân', 'Marketing'],
  C: ['Kế toán', 'Kiểm toán', 'Ngân hàng', 'Thư ký cao cấp'],
}[code] || []);

export default ResultPage;