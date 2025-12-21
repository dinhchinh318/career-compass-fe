import { Link, useNavigate } from "react-router";
import { Button, Form, Input, message, ConfigProvider } from "antd";
import { fetchAccountAPI, loginAPI } from "../../../services/api.user";
import { useCurrentApp } from "../../../components/context/app.context";
import { useEffect, useRef, useState } from "react";
import { LogIn, Mail, Lock, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { setIsAuthenticated, setUser } = useCurrentApp();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const res = await loginAPI(email, password);

    if (res?.data) {
      setIsAuthenticated(true);
      setUser(res.data);
      localStorage.setItem("accessToken", res.accessToken);
      navigate("/");
      await fetchAccountAPI();
      message.success("Đăng nhập thành công. Chào mừng bạn trở lại!");
    } else {
      message.error("Thông tin đăng nhập không chính xác. Vui lòng thử lại.");
      form.setFieldsValue({ password: "" });
    }
    setLoading(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f43f5e",
          borderRadius: 14,
          controlHeight: 48,
        },
      }}
    >
      <div className="min-h-screen flex bg-white font-sans selection:bg-rose-100 selection:text-rose-600">
        
        {/* --- BÊN TRÁI: HERO SECTION (BRANDING) --- */}
        <div className="hidden lg:flex lg:w-[55%] relative bg-[#020617] items-center justify-center p-12 overflow-hidden">
          {/* Ambient Lighting Background */}
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-rose-600/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[120px] animate-bounce-slow" />
          
          <div className="relative z-10 w-full max-w-lg">
             <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-[3.5rem] border border-white/10 p-12 text-center shadow-2xl">
                <div className="mb-8 inline-flex p-5 bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 rounded-3xl shadow-xl shadow-rose-900/40 animate-float">
                   <LogIn size={40} className="text-white" />
                </div>
                
                <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">
                  Career<span className="text-rose-500">.</span>Compass
                </h1>
                
                <p className="text-lg text-slate-400 font-light leading-relaxed mb-10 px-6">
                  Nền tảng quản trị và định hướng sự nghiệp toàn diện dành cho chuyên gia tài năng.
                </p>

                <div className="flex justify-center gap-2">
                   <div className="w-12 h-1 rounded-full bg-rose-500" />
                   <div className="w-2 h-1 rounded-full bg-white/10" />
                   <div className="w-2 h-1 rounded-full bg-white/10" />
                </div>
             </div>
          </div>
          
          {/* Minimalist Floating Icons */}
          <div className="absolute top-1/4 right-20 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 animate-float-delayed">
             <Sparkles className="text-amber-400/60" size={20} />
          </div>
          <div className="absolute bottom-1/4 left-20 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 animate-float">
             <ShieldCheck className="text-rose-400/60" size={20} />
          </div>
        </div>

        {/* --- BÊN PHẢI: FORM SECTION --- */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-center bg-slate-50/30 px-8 py-12">
          <div className="w-full max-w-[400px]">
            
            <div className="mb-10 animate-slide-down">
              <span className="text-rose-600 font-bold tracking-[0.15em] text-[10px] uppercase mb-3 block">Hệ thống xác thực</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Đăng nhập tài khoản
              </h2>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              className="animate-fade-up"
            >
              {/* Email Field */}
              <Form.Item
                label={<span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Địa chỉ Email</span>}
                name="email"
                className="mb-5"
                rules={[{ required: true, message: "Vui lòng nhập Email!" }, { type: "email", message: "Định dạng Email không hợp lệ!" }]}
              >
                <Input
                  ref={inputRef}
                  prefix={<Mail size={18} className="text-slate-400 mr-2" />}
                  placeholder="email@example.com"
                  className="premium-input"
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                label={<span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Mật khẩu</span>}
                name="password"
                className="mb-2"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<Lock size={18} className="text-slate-400 mr-2" />}
                  placeholder="••••••••"
                  className="premium-input"
                />
              </Form.Item>

              {/* Forgot Password Link - Simplified */}
              <div className="flex justify-end mb-8">
                <Link to="/forgotPassword" 
                  className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  block
                  className="premium-button group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Tiếp tục <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Form.Item>

              <div className="text-center mt-12">
                <div className="relative flex items-center py-4 mb-4">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Hoặc đăng ký mới</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <p className="text-slate-500 text-sm">
                  Chưa có tài khoản thành viên?{" "}
                  <Link to="/register" className="text-rose-600 font-bold hover:text-rose-700 transition-colors underline underline-offset-4 decoration-rose-200">
                    Đăng ký tài khoản
                  </Link>
                </p>
              </div>
            </Form>

            <p className="mt-16 text-center text-[10px] text-slate-400 font-medium tracking-[0.2em]">
              © 2025 CAREER COMPASS • ENTERPRISE EDITION
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .premium-input {
          height: 54px !important;
          border-radius: 12px !important;
          border: 1.5px solid #e2e8f0 !important;
          background: white !important;
          transition: all 0.2s ease !important;
        }
        .premium-input:hover { border-color: #cbd5e1 !important; }
        .premium-input:focus, .ant-input-affix-wrapper-focused {
          border-color: #f60c33ff !important;
          box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.08) !important;
        }

        .premium-button {
          height: 56px !important;
          border-radius: 12px !important;
          font-weight: 700 !important;
          font-size: 1rem !important;
          background: #f52b4dff !important;
          border: none !important;
          box-shadow: 0 10px 20px -5px rgba(244, 63, 94, 0.3) !important;
        }
        .premium-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px -5px rgba(244, 63, 94, 0.4) !important;
          filter: brightness(1.05);
        }

        @keyframes bounce-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.15); opacity: 0.15; }
        }
        .animate-bounce-slow { animation: bounce-slow 12s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-slide-down { animation: slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </ConfigProvider>
  );
};

export default Login;