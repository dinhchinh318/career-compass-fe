import React, { useEffect, useState } from "react";
import { Spin, message, Avatar, Tag, Button, Input, Empty, Tooltip, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  UserOutlined, MailOutlined, HistoryOutlined, ArrowRightOutlined, 
  RocketOutlined, EditOutlined, SaveOutlined, 
  CloseOutlined, BankOutlined, HomeOutlined, HeartFilled,
  LoadingOutlined // Thêm icon để tùy chỉnh Spin
} from "@ant-design/icons";
import { useCurrentApp } from "../../components/context/app.context";
import { getMyResultsAPI } from "../../services/api.result";
import { updateUserAPI } from "../../services/api.user";

const InfoPage = () => {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, appLoading } = useCurrentApp();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({ name: "", phone: "", address: "" });
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!appLoading && !isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user) {
      setEditData({ 
        name: user.name || "", 
        phone: user.phone || "", 
        address: user.address || "" 
      });
    }
    loadData();
  }, [isAuthenticated, appLoading, user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getMyResultsAPI();
      if (res?.data) {
        setResults(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) { 
      message.error("Không thể tải lịch sử đánh giá."); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleUpdate = async () => {
    if (!editData.name.trim()) {
        message.error("Họ và tên không được để trống");
        return;
    }
    setUpdateLoading(true);
    try {
        // Gửi cả _id để chắc chắn Backend nhận được
        const res = await updateUserAPI({ 
            _id: user._id, 
            ...editData 
        });

        // Lưu ý: MongoDB updateOne trả về { acknowledged: true, modifiedCount: 1 ... }
        // Bạn cần kiểm tra res dựa trên cấu trúc API của bạn trả về
        if (res) {
            message.success("Cập nhật thông tin thành công");
            setUser({ ...user, ...editData }); // Cập nhật lại Context/State toàn cục
            setIsEdit(false);
        }
    } catch (error) {
        console.error("Frontend Update Error:", error);
        message.error("Cập nhật thất bại, vui lòng thử lại");
    } finally {
        setUpdateLoading(false);
    }
  };

  // SỬA LỖI TẠI ĐÂY: Loại bỏ strokeColor và sử dụng indicator hoặc ConfigProvider
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5f7]">
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: 48, color: '#f43f5e' }} spin />} 
      />
      <p className="mt-4 text-rose-300 font-medium animate-pulse">Đang chuẩn bị hồ sơ...</p>
    </div>
  );

  return (
    <ConfigProvider theme={{ token: { primaryColor: '#f43f5e' } }}>
      <div className="min-h-screen bg-[#fff5f7] py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
        {/* Nền trang trí */}
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-rose-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-pink-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 bg-white/40 p-6 rounded-[2.5rem] backdrop-blur-sm border border-rose-100/50 shadow-sm">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight m-0">
                Quản lý <span className="text-rose-500">Cá nhân</span>
              </h1>
              <p className="text-slate-500 mt-1 font-medium italic">Chào mừng trở lại, {user?.name}!</p>
            </div>
            <Button 
              type="primary" 
              size="large"
              icon={<RocketOutlined />} 
              className="h-12 px-8 rounded-2xl bg-rose-500 hover:bg-rose-600 border-none shadow-lg shadow-rose-200 font-bold transition-all hover:-translate-y-0.5"
              onClick={() => navigate("/question")}
            >
              Làm bài Test mới
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: PROFILE CARD */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-rose-200/20 border border-rose-50 relative overflow-hidden group">
                
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-xs font-black tracking-wider uppercase italic">
                    <UserOutlined /> Hồ sơ cá nhân
                  </span>
                  {!isEdit ? (
                    <Tooltip title="Chỉnh sửa thông tin">
                      <Button 
                        icon={<EditOutlined />} 
                        onClick={() => setIsEdit(true)} 
                        type="text"
                        className="text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      />
                    </Tooltip>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        icon={<CloseOutlined />} 
                        onClick={() => setIsEdit(false)} 
                        className="rounded-lg border-rose-100 text-rose-400 hover:bg-rose-50 font-bold"
                      >
                        Hủy
                      </Button>
                      <Button 
                        icon={<SaveOutlined />} 
                        onClick={handleUpdate} 
                        loading={updateLoading} 
                        type="primary" 
                        className="rounded-lg bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-100 border-none font-bold"
                      >
                        Lưu
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center relative z-10">
                  <div className="relative mb-6">
                    <Avatar 
                      size={112} 
                      src={user?.avatar} 
                      icon={<UserOutlined />} 
                      className="border-4 border-rose-50 shadow-md bg-rose-50 text-rose-200" 
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                  </div>
                  
                  <div className="w-full space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và Tên</label>
                      {isEdit ? (
                        <Input 
                          value={editData.name} 
                          onChange={e => setEditData({...editData, name: e.target.value})} 
                          className="rounded-xl p-3 border-rose-100 focus:border-rose-400 focus:ring-rose-50 font-bold text-slate-700"
                          placeholder="Họ tên của bạn..."
                        />
                      ) : (
                        <div className="p-3.5 bg-rose-50/30 rounded-2xl font-bold text-slate-700 border border-transparent">
                          {user?.name}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Lớp</label>
                        {isEdit ? (
                          <Input 
                            prefix={<BankOutlined className="text-rose-300" />}
                            value={editData.phone} 
                            onChange={e => setEditData({...editData, phone: e.target.value})} 
                            className="rounded-xl p-3 border-rose-100 font-bold text-slate-700"
                          />
                        ) : (
                          <div className="p-3.5 bg-rose-50/30 rounded-2xl font-bold text-slate-700 border border-transparent flex items-center gap-2">
                            <BankOutlined className="text-rose-400" /> {user?.phone || "N/A"}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <div className="p-3.5 bg-slate-50 rounded-2xl font-bold text-slate-400 flex items-center gap-2 border border-dashed border-slate-200 truncate">
                          <MailOutlined className="shrink-0" /> {user?.email}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Trường học</label>
                      {isEdit ? (
                        <Input 
                          prefix={<HomeOutlined className="text-rose-300" />}
                          value={editData.address} 
                          onChange={e => setEditData({...editData, address: e.target.value})} 
                          className="rounded-xl p-3 border-rose-100 font-bold text-slate-700"
                        />
                      ) : (
                        <div className="p-3.5 bg-rose-50/30 rounded-2xl font-bold text-slate-700 border border-transparent flex items-center gap-2">
                          <HomeOutlined className="text-rose-400" /> {user?.address || "Chưa cập nhật"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-rose-500 rounded-[2rem] p-6 text-white shadow-lg shadow-rose-200 relative overflow-hidden">
                 <div className="relative z-10">
                   <h4 className="text-white text-lg font-bold mb-1 flex items-center gap-2">
                     <HeartFilled /> Mẹo nhỏ
                   </h4>
                   <p className="text-rose-100 text-sm opacity-90 leading-relaxed font-medium">Hãy thường xuyên làm bài test để theo dõi sự thay đổi trong định hướng nghề nghiệp của bản thân nhé!</p>
                 </div>
                 <RocketOutlined className="absolute -bottom-4 -right-4 text-white/10 text-8xl rotate-12" />
              </div>
            </div>

            {/* RIGHT COLUMN: EVALUATION HISTORY */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-rose-200/20 border border-rose-50 h-full flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 m-0 uppercase tracking-tight">
                    <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center shadow-sm">
                      <HistoryOutlined />
                    </div>
                    Lịch sử đánh giá
                  </h3>
                  <Tag className="rounded-lg px-4 border-none bg-rose-50 text-rose-500 font-black m-0">
                    {results.length} BÀI ĐÃ LÀM
                  </Tag>
                </div>

                {results.length > 0 ? (
                  <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar max-h-[600px] group/list">
                    {results.map((item, index) => (
                      <div 
                        key={item._id} 
                        onClick={() => navigate(`/result/${item._id}`)} 
                        className="group flex items-center justify-between p-5 border border-rose-50 rounded-[2rem] hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50 transition-all cursor-pointer bg-white"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center group-hover:bg-rose-500 transition-all duration-300 font-black text-rose-300 group-hover:text-white">
                            {results.length - index}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-slate-700 m-0 group-hover:text-rose-600 transition-colors uppercase text-sm tracking-tight">KẾT QUẢ RIASEC</h4>
                              <Tag color="magenta" className="m-0 border-none bg-rose-50 text-rose-600 font-black rounded-md py-0 text-[10px] italic">
                                MÃ: {item.riasecCode}
                              </Tag>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 font-bold flex items-center gap-1 uppercase tracking-widest">
                               {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-rose-200 group-hover:text-rose-500 font-bold text-xs uppercase tracking-widest transition-all">
                          Chi tiết <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                    <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none opacity-80"></div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 bg-rose-50/10 rounded-[2.5rem] border-2 border-dashed border-rose-100">
                    <Empty description={false} />
                    <p className="mt-4 font-black text-rose-300 uppercase tracking-widest text-xs">Chưa có bài đánh giá nào</p>
                    <Button 
                      type="link" 
                      className="text-rose-500 font-black mt-2"
                      onClick={() => navigate("/question")}
                    >
                      BẮT ĐẦU NGAY &rarr;
                    </Button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        <style jsx="true">{`
          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffe4e6; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fda4af; }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default InfoPage;