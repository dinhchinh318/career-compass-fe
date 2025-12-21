import { Form, Input, Button, message, ConfigProvider } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react"; // Cần cài lucide-react
import { forgotPasswordAPI, verifyOTPAPI } from "../../services/api.user";

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const [sending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  // Xử lý gửi yêu cầu Reset Password
  const onFinish = async (values) => {
    const { email: inputEmail } = values;
    if (!inputEmail) return;

    try {
      const res = await forgotPasswordAPI(inputEmail);
      if (res.status === true) {
        message.success("Mã xác thực đã được gửi đến Email của bạn!");
        setEmail(inputEmail);
        setIsSending(true);
        setCountdown(60); // Bắt đầu đếm ngược 60s
      } else {
        message.error(res.message || "Không thể gửi mã. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      message.error("Lỗi kết nối hệ thống.");
    }
  };

  // Xử lý xác thực OTP - Giữ nguyên logic business cũ
  const handleFinishOTP = async (otp) => {
    if (otp.length < 6) return;
    
    let otpStr = "";
    for (let i = 0; i < otp.length; i++) {
      otpStr += otp[i];
    }

    if (!otpStr || !email) {
      message.error("Thiếu mã OTP hoặc Email");
      return;
    }

    const res = await verifyOTPAPI(email, otpStr);
    if (res) {
      if (res.status === true) {
        message.success("Xác thực thành công!");
        navigate("/reset-password", { state: { email: email } });
      } else {
        message.error(res.message || "Mã xác thực không chính xác.");
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f43f5e", // Rose 500
          borderRadius: 12,
        },
      }}
    >
      {/* 1. FIX BUG: Thêm pt-24 để tránh đè Header fixed */}
      <div className="min-h-screen bg-[#FFF8F9] pb-12 px-4 flex justify-center items-start md:items-center">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          
          {/* Nút quay lại login */}
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors mb-6 font-semibold w-fit"
          >
            <ArrowLeft size={18} />
            <span>Quay lại đăng nhập</span>
          </Link>

          {/* 2. CARD LAYOUT: Bo góc lớn, shadow mềm */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-rose-100/50 p-8 md:p-10 border border-white">
            
            {/* 3. TIÊU ĐỀ & TEXT: Rõ ràng, Slate-700 */}
            <div className="text-center mb-8">
              <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
                {sending ? (
                  <ShieldCheck className="text-rose-500" size={32} />
                ) : (
                  <Mail className="text-rose-500" size={32} />
                )}
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Quên mật khẩu?</h1>
              <p className="text-slate-500 font-medium px-4">
                {sending 
                  ? `Mã OTP đã được gửi tới: ${email}`
                  : "Nhập địa chỉ email của bạn để nhận mã xác thực khôi phục mật khẩu"}
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              requiredMark={false}
              className="space-y-4"
            >
              {/* 4. FORM INPUT: Rose focus ring */}
              <div className={sending ? "opacity-50 pointer-events-none" : ""}>
                <Form.Item
                  name="email"
                  label={<span className="font-bold text-slate-700 ml-1">Địa chỉ Email</span>}
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không đúng định dạng!" }
                  ]}
                >
                  <Input 
                    ref={inputRef}
                    placeholder="example@gmail.com" 
                    className="h-12 rounded-xl border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all shadow-sm"
                  />
                </Form.Item>

                {/* 5. BUTTON: Pink pastel theme */}
                <Button
                  disabled={countdown > 0}
                  type="primary"
                  htmlType="submit"
                  block
                  className={`h-12 rounded-xl font-bold text-base shadow-lg shadow-rose-200 transition-all ${
                    countdown > 0 ? "bg-slate-100 border-none text-slate-400" : "bg-rose-500 hover:bg-rose-600 border-none"
                  }`}
                >
                  {countdown > 0 ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw size={16} className="animate-spin" />
                      Gửi lại sau {countdown}s
                    </span>
                  ) : "Gửi mã xác thực"}
                </Button>
              </div>

              {/* 6. OTP SECTION: Hiển thị khi sending = true */}
              {sending && (
                <div className="mt-8 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-5 duration-700">
                  <div className="flex flex-col items-center">
                    <label className="font-bold text-slate-700 mb-4 self-start ml-1">
                      Mã xác thực OTP
                    </label>
                    <Form.Item name="otp" className="mb-2">
                      <Input.OTP 
                        length={6} 
                        onChange={handleFinishOTP}
                        className="otp-input-custom"
                        size="large"
                      />
                    </Form.Item>
                    <p className="text-xs text-slate-400 font-medium mt-4 text-center">
                      Vui lòng kiểm tra cả hòm thư rác (Spam) nếu không thấy mã.
                    </p>
                  </div>
                </div>
              )}
            </Form>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400 font-medium italic">
              Cần hỗ trợ? <a href="#" className="text-rose-400 hover:underline not-italic font-bold">Liên hệ kỹ thuật</a>
            </p>
          </div>
        </div>
      </div>

      {/* Tùy chỉnh CSS cho Input.OTP Ant Design */}
      <style dangerouslySetInnerHTML={{ __html: `
        .otp-input-custom .ant-input {
          width: 45px !important;
          height: 55px !important;
          border-radius: 12px !important;
          font-size: 20px !important;
          font-weight: bold !important;
          border: 2px solid #f1f5f9 !important;
          background: #f8fafc !important;
          transition: all 0.2s;
        }
        .otp-input-custom .ant-input:focus {
          border-color: #fb7185 !important;
          background: #fff !important;
          box-shadow: 0 0 0 4px #fff1f2 !important;
        }
      `}} />
    </ConfigProvider>
  );
};

export default ForgotPasswordPage;