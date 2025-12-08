import React from "react";
import { Button, Card, Tag, Avatar, Timeline } from "antd";
import {
  FaLightbulb,
  FaGraduationCap,
  FaUsers,
  FaCode,
  FaBrain,
  FaRocket,
  FaStar,
  FaChalkboardTeacher,
  FaAward,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const STATS = [
  { label: "Thành viên", value: "4", icon: FaUsers },
  { label: "Ngày phát triển", value: "30+", icon: FaRocket },
  { label: "Tính năng", value: "10+", icon: FaStar },
  { label: "Dòng code", value: "10K+", icon: FaCode },
];

const VALUES = [
  {
    icon: FaBrain,
    title: "Đổi mới sáng tạo",
    desc: "Áp dụng công nghệ AI và ML vào định hướng nghề nghiệp cho học sinh.",
  },
  {
    icon: FaHeart,
    title: "Tâm huyết",
    desc: "Mong muốn giúp các bạn học sinh tìm được con đường phù hợp với bản thân.",
  },
  {
    icon: FaGraduationCap,
    title: "Học hỏi không ngừng",
    desc: "Không ngừng nghiên cứu và cải thiện hệ thống qua từng phiên bản.",
  },
  {
    icon: FaAward,
    title: "Chất lượng",
    desc: "Đảm bảo độ chính xác và khoa học trong từng đánh giá nghề nghiệp.",
  },
];

const TEAM = [
  {
    name: "Thầy Nguyễn Duy Thư",
    role: "Giáo viên hướng dẫn",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    desc: "Giáo viên Tin học, hướng dẫn và định hướng dự án"
  },
  {
    name: "Học sinh 1",
    role: "Team Leader & Backend",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    desc: "Phát triển hệ thống backend và API"
  },
  {
    name: "Học sinh 2",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    desc: "Thiết kế giao diện và trải nghiệm người dùng"
  },
  {
    name: "Học sinh 3",
    role: "AI/ML Specialist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    desc: "Nghiên cứu thuật toán RIASEC và tối ưu"
  },
];

const MILESTONES = [
  {
    year: "Tháng 9/2024",
    title: "Khởi động dự án",
    text: "Lập team, nghiên cứu lý thuyết RIASEC và lên kế hoạch phát triển.",
  },
  {
    year: "Tháng 10/2024",
    title: "Phát triển MVP",
    text: "Xây dựng phiên bản đầu tiên với 48 câu hỏi cơ bản.",
  },
  {
    year: "Tháng 11/2024",
    title: "Thử nghiệm",
    text: "Cho 100+ học sinh thử nghiệm và thu thập phản hồi.",
  },
  {
    year: "Tháng 12/2024",
    title: "Hoàn thiện",
    text: "Cải thiện thuật toán, giao diện và chuẩn bị cho hội thi.",
  },
];

const FEATURES = [
  "Bài test RIASEC 48 câu hỏi chuẩn quốc tế",
  "Phân tích tính cách đa chiều với 6 loại RIASEC",
  "Gợi ý nghề nghiệp phù hợp dựa trên kết quả",
  "Giao diện thân thiện, dễ sử dụng trên mọi thiết bị",
  "Lưu trữ lịch sử kết quả để theo dõi",
  "Báo cáo chi tiết về điểm mạnh và hướng phát triển",
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-semibold border border-indigo-100">
            <FaLightbulb className="w-3 h-3" />
            Dự án Khoa học Kỹ thuật
          </span>
          
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 px-4">
            Hệ thống Định hướng Nghề nghiệp{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              RIASEC
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 px-4">
            Một dự án nghiên cứu khoa học nhằm ứng dụng mô hình RIASEC vào việc 
            định hướng nghề nghiệp cho học sinh trung học phổ thông.
          </p>

          {/* Quick badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm px-4">
            <Tag color="blue" className="px-3 py-1 rounded-full">
              <FaGraduationCap className="inline mr-1" /> Dự án trường học
            </Tag>
            <Tag color="purple" className="px-3 py-1 rounded-full">
              <FaBrain className="inline mr-1" /> AI/ML
            </Tag>
            <Tag color="green" className="px-3 py-1 rounded-full">
              <FaCode className="inline mr-1" /> Open Source
            </Tag>
          </div>

          {/* Stats */}
          <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4">
            {STATS.map((s, i) => (
              <Card
                key={i}
                className="rounded-xl md:rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-2 sm:mb-3">
                  <s.icon className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                  {s.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PROJECT */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <Card className="rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <FaLightbulb className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Giới thiệu dự án
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Đây là dự án nghiên cứu khoa học kỹ thuật của trường THPT, 
                được phát triển bởi 3 học sinh dưới sự hướng dẫn của thầy Nguyễn Duy Thư. 
                Dự án áp dụng mô hình RIASEC - một công cụ đánh giá nghề nghiệp 
                được công nhận trên toàn thế giới.
              </p>
            </Card>
            
            <Card className="rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FaRocket className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Mục tiêu
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Giúp học sinh THPT hiểu rõ hơn về bản thân, khám phá xu hướng nghề nghiệp 
                phù hợp và đưa ra quyết định sáng suốt về tương lai học tập và nghề nghiệp. 
                Từ đó giảm thiểu tình trạng chọn sai ngành nghề.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Tính năng chính
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {FEATURES.map((feature, i) => (
              <Card
                key={i}
                className="rounded-xl md:rounded-2xl shadow-sm border border-white/50 bg-white/80 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 font-bold text-xs">{i + 1}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {feature}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Giá trị cốt lõi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {VALUES.map((v, i) => (
              <Card
                key={i}
                className="rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-3">
                  <v.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">{v.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Đội ngũ thực hiện
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Giáo viên hướng dẫn và 3 học sinh đầy nhiệt huyết
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEAM.map((m, i) => (
              <Card
                key={i}
                className="rounded-xl md:rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${i === 0 ? 'bg-gradient-to-br from-indigo-50 to-purple-50' : ''} -mx-6 -mt-6 mb-4 pt-6 pb-4 rounded-t-xl md:rounded-t-2xl`}>
                  <Avatar src={m.avatar} size={80} className="mx-auto ring-4 ring-white shadow-lg" />
                  {i === 0 && (
                    <div className="mt-2">
                      <FaChalkboardTeacher className="inline text-indigo-600 text-xl" />
                    </div>
                  )}
                </div>
                <div className="px-2">
                  <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">{m.name}</div>
                  <div className="text-xs sm:text-sm text-indigo-600 font-semibold mb-2">{m.role}</div>
                  <div className="text-xs text-gray-500">{m.desc}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Lộ trình phát triển
          </h2>
          <Card className="rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <Timeline
              items={MILESTONES.map((m) => ({
                color: "blue",
                children: (
                  <div className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                      <Tag color="blue" className="self-start sm:mt-0.5 text-xs sm:text-sm px-3 py-1">
                        {m.year}
                      </Tag>
                      <div className="flex-1">
                        <div className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                          {m.title}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">{m.text}</div>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <FaRocket className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
            Sẵn sàng khám phá bản thân?
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Bắt đầu bài test RIASEC ngay hôm nay để tìm ra con đường nghề nghiệp 
            phù hợp nhất với tính cách và sở thích của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Button 
              onClick={() => navigate("/question")}
              type="primary" 
              size="large" 
              className="!rounded-full !h-12 sm:!h-14 !px-8 sm:!px-10 !bg-white !text-indigo-600 hover:!bg-gray-100 !font-semibold !text-sm sm:!text-base w-full sm:w-auto"
            >
              Làm bài test ngay
            </Button>
            <Button 
              onClick={() => navigate("/about")}
              size="large" 
              className="!rounded-full !h-12 sm:!h-14 !px-8 sm:!px-10 !bg-white/10 !text-white hover:!bg-white/20 !border-white/30 !font-semibold !text-sm sm:!text-base w-full sm:w-auto"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}