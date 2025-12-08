import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Sparkles,
  Users,
  Award,
  Clock,
} from "lucide-react";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Định Hướng Nghề Nghiệp Chính Xác & Hiệu Quả
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Career Compass giúp bạn khám phá điểm mạnh, phân tích tính cách, và
            lựa chọn nghề nghiệp phù hợp nhất với bản thân.
          </p>

          <button className="mt-8 px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition">
            Bắt đầu ngay
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-8">

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <Sparkles className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Gợi ý nghề nghiệp</h3>
            <p className="text-gray-600">
              Dựa trên tính cách, sở thích và điểm mạnh của bạn.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <Users className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Phân tích tính cách</h3>
            <p className="text-gray-600">
              Các bài test MBTI, DISC, RIASEC chính xác & khoa học.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <Award className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lộ trình học tập</h3>
            <p className="text-gray-600">
              Đề xuất các kỹ năng & khóa học cần thiết cho nghề bạn chọn.
            </p>
          </div>

        </div>
      </section>

      {/* CAROUSEL */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-8">
          <Slider {...settings}>
            <div className="p-10 bg-blue-50 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Khám phá bản thân</h3>
              <p>Dùng bài test tính cách để hiểu bạn mạnh ở đâu – và nên đi hướng nào.</p>
            </div>

            <div className="p-10 bg-purple-50 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Xem nghề phù hợp</h3>
              <p>Hệ thống AI gợi ý nghề phù hợp nhất dựa trên dữ liệu phân tích.</p>
            </div>

            <div className="p-10 bg-green-50 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Lộ trình phát triển</h3>
              <p>Từng bước rõ ràng cho bạn để đạt được nghề nghiệp mong muốn.</p>
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
