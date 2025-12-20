import React from "react";
import {
  BookOpen,
  Settings,
  Search,
  Palette,
  Users,
  TrendingUp,
  FileText,
  ShieldCheck,
  Info
} from "lucide-react";

const HomePage = () => {
  // 6 nhóm RIASEC được chuẩn hóa nội dung khoa học
  const riasecTypes = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Realistic",
      sub: "Nhóm Kỹ thuật (Thực tế)",
      desc: "Người thuộc nhóm này thường có khả năng về máy móc, dụng cụ, cây cối hoặc con vật. Họ thích các hoạt động ngoài trời và làm việc trực tiếp với đồ vật hơn là con người hay ý tưởng trừu tượng.",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Investigative",
      sub: "Nhóm Nghiên cứu",
      desc: "Đặc trưng bởi sự ham học hỏi, thích quan sát, tìm tòi và phân tích dữ liệu. Họ thường ưu tiên việc giải quyết các vấn đề phức tạp thông qua tư duy logic và phương pháp khoa học.",
      bgColor: "bg-rose-100/50",
      textColor: "text-rose-800",
      borderColor: "border-rose-200"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Artistic",
      sub: "Nhóm Nghệ thuật",
      desc: "Có khả năng sáng tạo phong phú, trực giác mạnh mẽ và tinh thần tự do. Họ thích làm việc trong các môi trường không gò bó, nơi có thể thể hiện bản thân qua âm nhạc, hội họa hoặc ngôn ngữ.",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social",
      sub: "Nhóm Xã hội",
      desc: "Thích làm việc với con người thông qua việc giúp đỡ, huấn luyện hoặc chữa trị. Họ có kỹ năng giao tiếp tốt, giàu lòng trắc ẩn và luôn hướng đến lợi ích cộng đồng.",
      bgColor: "bg-[#fff1f2]", // Rose 50
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Enterprising",
      sub: "Nhóm Quản lý (Nghiệp chủ)",
      desc: "Thường có tố chất lãnh đạo, khả năng thuyết phục và quyết đoán. Họ thích các môi trường cạnh tranh, nơi có thể quản lý dự án, tổ chức con người và đạt được mục tiêu kinh tế.",
      bgColor: "bg-rose-100/50",
      textColor: "text-rose-800",
      borderColor: "border-rose-200"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Conventional",
      sub: "Nhóm Nghiệp vụ (Công chức)",
      desc: "Thích làm việc với dữ liệu, con số và quy trình rõ ràng. Họ là những người có tổ chức, tỉ mỉ, đáng tin cậy và có khả năng thực hiện các công việc đòi hỏi sự chính xác cao.",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fffafa] text-slate-800 font-sans">
      
      {/* SECTION 1: ACADEMIC HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-rose-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/40 skew-x-12 -z-10"></div>
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Dự án Nghiên cứu Khoa học Kỹ thuật
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Mô hình tính cách nghề nghiệp <br/>
            <span className="text-rose-600">RIASEC</span>
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed italic">
              "Sự lựa chọn nghề nghiệp là sự thể hiện của cá tính con người."
            </p>
            <div className="h-1 w-20 bg-rose-300 mx-auto rounded-full"></div>
            <p className="text-slate-500 leading-relaxed text-justify md:text-center">
              Dựa trên học thuyết của Tiến sĩ Tâm lý học người Mỹ - John Holland, mô hình RIASEC phân loại tính cách con người thành 6 nhóm đặc trưng. Việc thấu hiểu các nhóm này là cơ sở khoa học quan trọng giúp học sinh THPT xác định môi trường học tập và làm việc phù hợp nhất với bản thân.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: RIASEC GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[2px] bg-rose-400"></div>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">
            Hệ thống 6 nhóm đặc trưng
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {riasecTypes.map((type, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-3xl border ${type.borderColor} ${type.bgColor} transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 group`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`p-3 rounded-2xl bg-white shadow-sm ${type.textColor}`}>
                  {type.icon}
                </div>
                <span className="text-rose-200 text-3xl font-black italic select-none">
                  0{i + 1}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-[13px] font-bold text-rose-400 uppercase tracking-widest">
                    {type.title}
                  </h3>
                  <h4 className="text-xl font-bold text-slate-800">
                    {type.sub}
                  </h4>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed border-t border-rose-200/50 pt-4">
                  {type.desc}
                </p>
                
                <div className="pt-2 flex items-center gap-2 text-rose-500 font-bold text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                   <Info size={14} /> TÌM HIỂU CHI TIẾT
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ACADEMIC FOOTER NOTE */}
      <section className="pb-24 max-w-4xl mx-auto px-6">
        <div className="bg-white border border-rose-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center shrink-0">
            <BookOpen className="text-rose-500" size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-800 italic">Mục tiêu của nghiên cứu</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Thông qua việc số hóa mô hình RIASEC, dự án mong muốn cung cấp một công cụ hỗ trợ tư vấn hướng nghiệp khách quan, giúp học sinh THPT giảm thiểu rủi ro chọn sai ngành nghề và định hướng môn học phù hợp theo chương trình giáo dục phổ thông mới.
            </p>
          </div>
        </div>
      </section>

      {/* Hiệu ứng trang trí nhẹ */}
      <div className="fixed bottom-10 right-10 w-64 h-64 bg-rose-200/20 blur-[100px] -z-10 rounded-full"></div>
      <div className="fixed top-20 left-10 w-48 h-48 bg-rose-100/30 blur-[80px] -z-10 rounded-full"></div>

    </div>
  );
};

export default HomePage;