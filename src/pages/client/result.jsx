import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { useCurrentApp } from "../../components/context/app.context";
import { getResultByIdAPI } from "../../services/api.result";

const ResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useCurrentApp();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      message.warning("Please login to view results!");
      navigate("/login");
      return;
    }

    if (!id) {
      setError("Result ID is missing");
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await getResultByIdAPI(id);
        if (res.error === 0 && res.data) {
          setResult(res.data);
        } else {
          setError(res.message || "Result not found");
        }
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("Failed to load result");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, isAuthenticated, navigate]);

  const getCategoryName = (code) =>
    ({
      R: "Realistic",
      I: "Investigative",
      A: "Artistic",
      S: "Social",
      E: "Enterprising",
      C: "Conventional",
    }[code] || code);

  const getCategoryDescriptionTV = (code) =>
    ({
      R: '- Thực tế, hành động, thích "làm" hơn "nói".\n- Tư duy cụ thể, quan sát tốt, phản ứng nhanh với tình huống thực tiễn.\n- Thích dùng công cụ, máy móc, thao tác bằng tay chân.\n- Kiên nhẫn, bền bỉ, có tính kỷ luật và trật tự.\n- Thường ít nói, khiêm tốn, nhưng đáng tin cậy. Không thích công việc trừu tượng, lý thuyết hay giao tiếp quá nhiều.',
      I: '- Tò mò, ham học hỏi, thích đặt câu hỏi "Tại sao?", "Như thế nào?".\n- Hướng nội, thích làm việc độc lập.\n- Tư duy logic, phân tích, có khả năng suy luận và phản biện tốt.\n- Thích khám phá, phân tích dữ liệu, đọc – viết – nghiên cứu. Có xu hướng cầu toàn và yêu thích tri thức.\n- Thường dè dặt, ít thể hiện cảm xúc, nhưng sâu sắc.',
      A: '- Giàu cảm xúc, tưởng tượng phong phú, thích tự do.\n- Trực giác mạnh, nhạy cảm với cái đẹp, âm thanh, ngôn ngữ.\n- Không thích quy tắc gò bó; dễ "bay bổng" trong ý tưởng.\n- Dễ xúc động, đôi khi thay đổi cảm xúc nhanh.\n- Thích thể hiện bản thân và khác biệt.',
      S: '- Hướng ngoại, ấm áp, dễ đồng cảm và thấu hiểu người khác.\n- Thích giúp đỡ, giảng dạy, chia sẻ kinh nghiệm.\n- Giao tiếp tốt, dễ tạo sự tin tưởng.\n- Thích làm việc nhóm, không thích cạnh tranh gay gắt.\n- Nhạy bén với cảm xúc người khác, có khả năng "đọc" tâm lý tốt.',
      E: '- Tự tin, năng động, thích ảnh hưởng và thuyết phục người khác.\n- Hướng ngoại, nhiệt huyết, thích cạnh tranh và thành tích.\n- Quyết đoán, mạo hiểm, không ngại thử thách.\n- Có khả năng tổ chức, lãnh đạo, đưa ra tầm nhìn.\n- Thường hướng tới quyền lực, vị thế, và thành công vật chất.',
      C: '- Tỉ mỉ, cẩn thận, trung thực và đáng tin cậy.\n- Thích quy tắc, trình tự, làm việc có kế hoạch rõ ràng.\n- Không thích rủi ro hay mơ hồ; thích sự ổn định.\n- Giỏi quản lý thông tin, dữ liệu, hồ sơ.\n- Tôn trọng quyền hạn và quy trình.'
    }[code] || "");

  const getWorkEnvironment = (code) =>
    ({
      R: 'Làm việc thực hành với công cụ, máy móc hoặc môi trường ngoài trời. Coi trọng kết quả thực tế và hoạt động thể chất.',
      I: 'Phòng thí nghiệm, môi trường học thuật hoặc vai trò phân tích. Ưa thích làm việc độc lập và thách thức trí tuệ.',
      A: 'Studio sáng tạo, nhà hát, công ty thiết kế. Coi trọng sự tự do thể hiện và tư duy đổi mới.',
      S: 'Chăm sóc sức khỏe, giáo dục, trung tâm tư vấn. Thích môi trường hợp tác tập trung vào giúp đỡ người khác.',
      E: 'Văn phòng kinh doanh, sàn bán hàng, vị trí lãnh đạo. Phát triển trong môi trường cạnh tranh, hướng đến mục tiêu.',
      C: 'Văn phòng với nhiệm vụ có cấu trúc, quản lý dữ liệu, vai trò hành chính. Đánh giá cao quy trình rõ ràng và tổ chức.'
    }[code] || 'Môi trường làm việc đa dạng tùy thuộc vào vai trò cụ thể.');

  const getCareerPaths = (code) =>
    ({
      R: ['Kỹ sư', 'Thợ cơ khí', 'Thợ điện', 'Thợ mộc', 'Phi công', 'Nông dân', 'Đầu bếp'],
      I: ['Nhà khoa học', 'Nhà nghiên cứu', 'Chuyên viên phân tích', 'Nhà toán học', 'Lập trình viên', 'Dược sĩ', 'Kiến trúc sư'],
      A: ['Nghệ sĩ', 'Nhà thiết kế', 'Nhà văn', 'Nhạc sĩ', 'Diễn viên', 'Nhiếp ảnh gia', 'Giám đốc nghệ thuật'],
      S: ['Giáo viên', 'Y tá', 'Cố vấn', 'Nhân viên xã hội', 'Nhà trị liệu', 'Quản lý nhân sự', 'Huấn luyện viên'],
      E: ['Quản lý', 'Nhân viên bán hàng', 'Doanh nhân', 'Luật sư', 'Giám đốc Marketing', 'Chính trị gia'],
      C: ['Kế toán', 'Kiểm toán viên', 'Thư ký', 'Chuyên viên phân tích dữ liệu', 'Thủ thư', 'Giao dịch viên ngân hàng', 'Thanh tra']
    }[code] || []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="text-red-500 text-xl mb-6 text-center">{error}</div>
        <button
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/question")}
        >
          Làm lại bài test
        </button>
      </div>
    );
  }

  if (!result) {
    return <div className="min-h-screen flex justify-center items-center">No result found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* HEADER */}
      <div className="text-center mb-8 sm:mb-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8 sm:py-12 px-4 sm:px-6 rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
          Kết quả đánh giá nghề nghiệp của bạn
        </h1>
        <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 px-2">
          Dựa trên bài test, loại tính cách nổi bật của bạn là:
        </p>
        <div className="bg-white inline-block px-8 sm:px-12 py-4 sm:py-6 rounded-full shadow-xl">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest text-indigo-600">
            {result.riasecCode || "N/A"}
          </p>
        </div>
      </div>

      {/* RIASEC PROFILE */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl mb-8 sm:mb-10">
        <div className="flex items-center border-b-2 border-gray-200 pb-3 sm:pb-4 mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl lg:text-4xl mr-2 sm:mr-3">📊</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Hồ sơ RIASEC của bạn
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {Object.entries(result.details)
            .sort(([, a], [, b]) => b - a)
            .map(([code, score], index) => (
              <div
                key={code}
                className={`
                  rounded-xl transition-all duration-300 overflow-hidden
                  ${index === 0
                    ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-indigo-300 shadow-lg hover:shadow-xl"
                    : "bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-md"}
                `}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      {index === 0 && (
                        <span className="text-xl sm:text-2xl flex-shrink-0">⭐</span>
                      )}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                          {getCategoryName(code)}
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                          index === 0 
                            ? "bg-indigo-100 text-indigo-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {code}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className={`text-3xl sm:text-4xl font-bold ${
                        index === 0 ? "text-indigo-600" : "text-gray-700"
                      }`}>
                        {score}%
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-700 ease-out ${
                        index === 0
                          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                          : "bg-gradient-to-r from-gray-400 to-gray-500"
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>

                  <div className={`text-sm sm:text-base leading-relaxed ${
                    index === 0 ? "text-gray-700" : "text-gray-600"
                  }`}>
                    {getCategoryDescriptionTV(code).split('\n').map((line, i) => (
                      <div key={i} className="mb-1">{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CAREER GUIDANCE */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 drop-shadow-lg px-2">
          Hướng dẫn nghề nghiệp cho kết quả của bạn
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {result.riasecCode.split("").map((code, index) => (
            <div
              key={index}
              className={`bg-white text-gray-800 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-300 ${
                index === 0 ? "ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent" : ""
              }`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-bl-2xl text-xs sm:text-sm font-bold shadow-lg z-10">
                  ⭐ Kết quả chính
                </div>
              )}

              {/* Header Section */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-bold text-white shadow-lg flex-shrink-0 border-2 border-white/30">
                    {code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 break-words">
                      {getCategoryName(code)}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm">Loại tính cách {code}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
                {/* Personality Traits */}
                <div className="border-l-4 border-indigo-500 pl-4 sm:pl-5 pr-2 sm:pr-3 py-3 bg-indigo-50/50 rounded-r-xl">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0">👤</span>
                    <strong className="text-base sm:text-lg lg:text-xl text-gray-800 font-bold">
                      Đặc điểm tính cách
                    </strong>
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-1 pl-0 sm:pl-8">
                    {getCategoryDescriptionTV(code).split('\n').map((line, i) => (
                      <div key={i} className="break-words">{line}</div>
                    ))}
                  </div>
                </div>

                {/* Work Environment */}
                <div className="border-l-4 border-purple-500 pl-4 sm:pl-5 pr-2 sm:pr-3 py-3 bg-purple-50/50 rounded-r-xl">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0">🏢</span>
                    <strong className="text-base sm:text-lg lg:text-xl text-gray-800 font-bold">
                      Môi trường làm việc lý tưởng
                    </strong>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-0 sm:pl-8 break-words">
                    {getWorkEnvironment(code)}
                  </p>
                </div>

                {/* Career Paths */}
                <div className="border-l-4 border-pink-500 pl-4 sm:pl-5 pr-2 sm:pr-3 py-3 bg-pink-50/50 rounded-r-xl">
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl flex-shrink-0">💼</span>
                    <strong className="text-base sm:text-lg lg:text-xl text-gray-800 font-bold">
                      Con đường sự nghiệp điển hình
                    </strong>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 pl-0 sm:pl-8">
                    {getCareerPaths(code).map((career, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 mb-10 sm:mb-14 px-4">
        <button
          onClick={() => navigate("/question")}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gray-600 text-white text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Làm lại bài test
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default ResultPage;