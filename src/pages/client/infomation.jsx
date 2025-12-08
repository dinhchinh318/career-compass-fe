import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCurrentApp } from "../../components/context/app.context";
import { getMyResultsAPI } from "../../services/api.result";

const InfoPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useCurrentApp();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      message.warning("Bạn cần đăng nhập để xem thông tin!");
      navigate("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getMyResultsAPI();

      if (res.error !== 0) {
        message.error(res.message || "Không thể tải kết quả!");
        return;
      }

      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      message.error("Lỗi mạng! Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân & lịch sử làm bài</h1>

      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <p><b>Họ tên:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">📘 Lịch sử bài test đã làm</h2>

      {results.length === 0 && (
        <p className="text-gray-500">Bạn chưa làm bài test nào.</p>
      )}

      {results.map((item, index) => (
        <div
            key={item._id}
            className="p-4 mb-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/result/${item._id}`)}
        >
            <p><b>Lần {index + 1}:</b> {item.resultName}</p>
            <p><b>Ngày làm:</b> {new Date(item.createdAt).toLocaleString()}</p>

            {/* Thêm dòng này */}
            <p><b>RIASEC:</b> {item.riasecCode}</p>

            {/* Hoặc nếu muốn tự tính */}
            {/* <p><b>RIASEC:</b> {buildRiasecCode(item.details)}</p> */}
        </div>
        ))}

    </div>
  );
};

export default InfoPage;
