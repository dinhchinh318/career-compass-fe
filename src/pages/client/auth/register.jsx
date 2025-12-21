import { Link, useNavigate } from "react-router";
import { Button, Form, Input, message, ConfigProvider, Progress } from "antd";
import { registerAPI } from "../../../services/api.user";
import { useEffect, useRef, useState } from "react";
import { User, Mail, Lock, ArrowRight, Compass, ShieldCheck, GraduationCap, School } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length > 6) score += 40;
    if (/[A-Z]/.test(password)) score += 30;
    if (/[0-9]/.test(password)) score += 30;
    return score;
  };

  const onFinish = async (values) => {
    setLoading(true);
    // Destructure thêm phone và address từ form values
    const { name, email, password, phone, address } = values;
    
    // Gọi API với các tham số mới
    const res = await registerAPI(name, email, password, phone, address);
    
    if (res?.data) {
      message.success("Chào mừng bạn đến với Career Compass!");
      navigate("/login");
    } else {
      message.error(res?.message || "Đăng ký không thành công.");
    }
    setLoading(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f43f5e",
          borderRadius: 12,
          controlHeight: 40, // Giảm nhẹ chiều cao để vừa màn hình
        },
      }}
    >
      <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] overflow-y-auto py-10 px-4 relative font-sans">
        
        {/* Ambient Background Lights */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[120px] fixed" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] fixed" />

        <div className="w-full max-w-[500px] relative z-10 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 p-6 md:p-8">
            
            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex p-2.5 bg-rose-50 rounded-2xl mb-2">
                <Compass className="text-rose-600 animate-spin-slow" size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Bắt đầu hành trình mới
              </h2>
              <p className="text-slate-500 text-xs font-medium mt-1">
                Gia nhập cộng đồng Career Compass
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="middle"
            >
              {/* Họ tên & Lớp (Phone) - Chia 2 cột */}
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label={<span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Họ và Tên</span>}
                  name="name"
                  className="mb-3"
                  rules={[{ required: true, message: "Nhập tên!" }]}
                >
                  <Input 
                    ref={inputRef}
                    prefix={<User size={14} className="text-slate-400 mr-1" />}
                    placeholder="Tên bạn..."
                    className="compact-input"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Lớp</span>}
                  name="phone" // Map vào field phone
                  className="mb-3"
                  rules={[{ required: true, message: "Nhập lớp!" }]}
                >
                  <Input 
                    prefix={<GraduationCap size={14} className="text-slate-400 mr-1" />}
                    placeholder="VD: 12A1"
                    className="compact-input"
                  />
                </Form.Item>
              </div>

              {/* Trường học (Address) */}
              <Form.Item
                label={<span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Trường học</span>}
                name="address" // Map vào field address
                className="mb-3"
                rules={[{ required: true, message: "Vui lòng nhập trường!" }]}
              >
                <Input 
                  prefix={<School size={14} className="text-slate-400 mr-1" />}
                  placeholder="Tên trường THPT/Đại học của bạn..."
                  className="compact-input"
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label={<span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Email định hướng</span>}
                name="email"
                className="mb-3"
                rules={[{ required: true, message: "Email là bắt buộc!" }, { type: 'email', message: "Email không hợp lệ!" }]}
              >
                <Input 
                  prefix={<Mail size={14} className="text-slate-400 mr-1" />}
                  placeholder="email@career.com"
                  className="compact-input"
                />
              </Form.Item>

              {/* Password Group */}
              <div className="grid grid-cols-2 gap-3 mb-1">
                <Form.Item
                  label={<span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mật khẩu</span>}
                  name="password"
                  className="mb-0"
                  rules={[{ required: true, message: "Nhập mật khẩu!" }, { min: 6, message: "Tối thiểu 6 ký tự!" }]}
                >
                  <Input.Password 
                    prefix={<Lock size={14} className="text-slate-400 mr-1" />}
                    placeholder="••••••••"
                    className="compact-input"
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Xác nhận</span>}
                  name="confirm"
                  className="mb-0"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: "Nhập lại!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) return Promise.resolve();
                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                    prefix={<Lock size={14} className="text-slate-400 mr-1" />}
                    placeholder="••••••••"
                    className="compact-input"
                  />
                </Form.Item>
              </div>

              {/* Password Strength */}
              {passwordValue && (
                <div className="mb-4 px-1">
                  <Progress 
                    percent={getPasswordStrength(passwordValue)} 
                    showInfo={false} 
                    strokeColor="#f43f5e"
                    size={[300, 3]}
                    className="m-0"
                  />
                </div>
              )}

              {/* Action Button */}
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                block
                className="compact-button mt-2"
              >
                <span className="flex items-center justify-center gap-2 font-bold">
                  Khởi tạo sự nghiệp <ArrowRight size={18} />
                </span>
              </Button>

              <div className="text-center mt-5">
                <p className="text-slate-500 text-xs font-medium">
                  Đã là thành viên?{" "}
                  <Link to="/login" className="text-rose-600 font-bold hover:underline">
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </Form>
          </div>

          <div className="mt-6 flex justify-center items-center gap-2 text-slate-500 opacity-50">
            <ShieldCheck size={14} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure Data Compass</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .compact-input {
          height: 40px !important;
          border-radius: 10px !important;
          border: 1.5px solid #eef2f6 !important;
          background: #f8fafc !important;
          transition: all 0.2s ease !important;
          font-size: 13px !important;
        }
        .compact-input:hover { border-color: #cbd5e1 !important; }
        .compact-input:focus, .ant-input-affix-wrapper-focused {
          border-color: #f43f5e !important;
          background: white !important;
          box-shadow: 0 4px 12px rgba(244, 63, 94, 0.1) !important;
        }

        .compact-button {
          height: 48px !important;
          border-radius: 12px !important;
          background: #f43f5e !important;
          border: none !important;
          box-shadow: 0 8px 16px -4px rgba(244, 63, 94, 0.4) !important;
          font-size: 15px !important;
        }
        .compact-button:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

        .ant-form-item-label {
          padding-bottom: 4px !important;
        }
      `}} />
    </ConfigProvider>
  );
};

export default Register;