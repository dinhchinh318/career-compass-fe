import React, { useEffect, useState } from "react";
import { Spin, message, Avatar, Tag, Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  UserOutlined, MailOutlined, HistoryOutlined, 
  ArrowRightOutlined, CalendarOutlined, SolutionOutlined,
  ClockCircleOutlined, RocketOutlined 
} from "@ant-design/icons";
import { useCurrentApp } from "../../components/context/app.context";
import { getMyResultsAPI } from "../../services/api.result";

const InfoPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, appLoading } = useCurrentApp();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appLoading) return;

    if (!isAuthenticated) {
      message.warning("Bạn cần đăng nhập để xem thông tin!");
      navigate("/login");
      return;
    }
    loadData();
  }, [isAuthenticated, appLoading]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getMyResultsAPI();
      if (res.error === 0) {
        setResults((res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      message.error("Lỗi mạng! Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5f7]">
      <Spin size="large" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fff5f7] relative overflow-hidden pt-28 pb-12 px-4 md:px-8">
      {/* Background Decor - Chuyển sang tông hồng và tím nhạt */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-pink-100 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-rose-100 rounded-full blur-[100px] opacity-40"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER DESIGN: Tông hồng chủ đạo */}
        <div className="bg-white/60 backdrop-blur-md border border-rose-100 rounded-[2rem] p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
              <SolutionOutlined className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 m-0 p-0 leading-tight">
                Quản lý <span className="text-rose-500">cá nhân</span>
              </h1>
              <p className="text-slate-500 text-sm m-0">Chào mừng trở lại, {user?.name}!</p>
            </div>
          </div>
          <Button 
            type="primary" 
            size="large" 
            icon={<RocketOutlined />}
            className="rounded-xl h-12 px-6 bg-rose-600 hover:bg-rose-700 border-none font-bold shadow-md shadow-rose-200"
            onClick={() => navigate("/question")}
          >
            Làm bài Test mới
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: MINI PROFILE */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-rose-200/30 border border-rose-50 flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar size={100} icon={<UserOutlined />} src={user?.avatar} className="border-4 border-rose-50 shadow-md bg-rose-50 text-rose-300" />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">{user?.name}</h2>
              <Tag color="error" className="rounded-full px-4 border-none bg-rose-50 text-rose-600 font-bold mb-6 italic">
                {user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
              </Tag>
              
              <div className="w-full space-y-2">
                <div className="flex items-center gap-3 p-3 bg-rose-50/30 rounded-2xl">
                  <MailOutlined className="text-rose-400" />
                  <span className="text-sm font-medium text-slate-600 truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-rose-50/30 rounded-2xl">
                  <CalendarOutlined className="text-rose-400" />
                  <span className="text-sm font-medium text-slate-600">Tham gia: 12/2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLABLE HISTORY */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-rose-200/30 border border-rose-50 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 m-0">
                  <HistoryOutlined className="text-rose-500" /> Lịch sử đánh giá
                </h3>
                <Tag className="m-0 rounded-lg font-bold border-none bg-rose-50 text-rose-500">{results.length} bài đã làm</Tag>
              </div>

              {/* Box chứa list có scroll mượt */}
              <div className="relative group">
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '300px' }}>
                  {results.length > 0 ? results.map((item, index) => (
                    <div 
                      key={item._id}
                      onClick={() => navigate(`/result/${item._id}`)}
                      className="group/item flex items-center justify-between p-5 bg-white border border-rose-50 rounded-3xl hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center font-black text-rose-200 group-hover/item:bg-rose-500 group-hover/item:text-white transition-all text-lg">
                          {results.length - index}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 m-0 group-hover/item:text-rose-600 transition-colors uppercase text-sm tracking-tight">
                            {item.resultName || "KẾT QUẢ TRẮC NGHIỆM RIASEC"}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-[12px] text-slate-400 font-bold">
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                            <Tag color="magenta" className="m-0 border-none bg-rose-50 text-rose-600 text-[10px] font-black italic">MÃ: {item.riasecCode}</Tag>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-rose-200 group-hover/item:text-rose-500 font-bold text-xs uppercase tracking-widest transition-all">
                        Chi tiết <ArrowRightOutlined />
                      </div>
                    </div>
                  )) : (
                    <Empty description="Chưa có bài test nào" className="py-10" />
                  )}
                </div>
                
                {/* Hiệu ứng mờ ở đáy */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none opacity-80"></div>
              </div>
              
              {results.length > 3 && (
                <p className="text-center text-rose-300 text-[11px] font-bold mt-4 animate-pulse uppercase tracking-widest">
                  Cuộn xuống để xem thêm kết quả cũ hơn
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffe4e6; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fda4af; }
      `}</style>
    </div>
  );
};

export default InfoPage;