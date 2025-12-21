import { Button, Form, Input, message, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, CheckCircle2 } from "lucide-react"; // Sử dụng icon để tăng tính hiện đại
import { resetPasswordAPI } from "../../services/api.user";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { email } = location.state || {};
    const [form] = Form.useForm();

    useEffect(() => {
        if (!email) {
            message.warning("Vui lòng thực hiện yêu cầu quên mật khẩu trước.");
            navigate("/forgotPassword", { replace: true });
        }
    }, [email, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        const { newPassword, email } = values;
        const res = await resetPasswordAPI(email, newPassword);
        if (res) {
          if (res.status === true) {
            message.success("Mật khẩu đã được thay đổi thành công!");
            navigate("/login");
          } else {
            message.error(res.message || "Đã có lỗi xảy ra");
          }
        }
        setLoading(false);
    };

    if (!email) return null;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#f43f5e", // Rose 500 (Hồng pastel đậm cho các thành phần chính)
                    borderRadius: 12,
                    colorBgContainer: "#ffffff",
                },
            }}
        >
            {/* 1. FIX BUG HEADER: pt-24 đảm bảo nội dung nằm dưới Header fixed */}
            <div className="min-h-screen bg-[#FFF8F9] pt-8 pb-12 px-4 flex justify-center items-center">
                <div className="w-full max-w-[450px]">
                    
                    {/* 2. CARD RESET PASSWORD */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-rose-100/50 p-8 md:p-10 border border-white relative overflow-hidden">
                        
                        {/* Decor mờ nhẹ cho Card */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full -mr-12 -mt-12 opacity-50" />

                        {/* 3. HEADER TRONG CARD */}
                        <div className="text-center mb-8 relative z-10">
                            <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
                                <LockKeyhole className="text-rose-500" size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800 mb-2 italic">Reset Password</h1>
                            <p className="text-slate-500 font-medium">
                                Create a new password for your account
                            </p>
                        </div>

                        <Form
                            form={form}
                            layout="vertical" // Đổi sang dọc để tối ưu trên Mobile
                            onFinish={onFinish}
                            autoComplete="off"
                            requiredMark={false}
                            className="relative z-10"
                        >
                            {/* 4. EMAIL INPUT (DISABLED) */}
                            <Form.Item
                                label={<span className="font-bold text-slate-700">Email Address</span>}
                                name="email"
                                initialValue={email}
                            >
                                <Input 
                                    prefix={<Mail size={18} className="text-slate-400 mr-2" />}
                                    className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed" 
                                    disabled 
                                />
                            </Form.Item>

                            {/* 5. NEW PASSWORD */}
                            <Form.Item
                                name="newPassword"
                                label={<span className="font-bold text-slate-700">New Password</span>}
                                rules={[{ required: true, message: 'Please enter your new password!' }]}
                            >
                                <Input.Password 
                                    placeholder="Enter new password"
                                    className="h-12 rounded-xl border-slate-200 focus:border-rose-400 focus:ring-rose-200"
                                />
                            </Form.Item>

                            {/* 6. CONFIRM PASSWORD */}
                            <Form.Item
                                name="confirmPass"
                                label={<span className="font-bold text-slate-700">Confirm Password</span>}
                                dependencies={['newPassword']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password 
                                    placeholder="Repeat new password"
                                    className="h-12 rounded-xl border-slate-200 focus:border-rose-400 focus:ring-rose-200"
                                />
                            </Form.Item>

                            {/* 7. RESET BUTTON */}
                            <Form.Item className="mb-0 mt-8">
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading} 
                                    block
                                    className="h-12 rounded-xl font-bold text-lg shadow-lg shadow-rose-200 hover:scale-[1.02] transition-transform"
                                >
                                    Reset Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* Footer hỗ trợ */}
                    <div className="text-center mt-8">
                        <p className="text-slate-400 font-medium">
                            Need help? <a href="#" className="text-rose-400 hover:text-rose-500 font-bold transition-colors">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom CSS cho Ant Design Inputs */}
            <style dangerouslySetInnerHTML={{ __html: `
                .ant-input-affix-wrapper {
                    padding: 4px 11px;
                }
                .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
                    border-color: #fb7185 !important;
                    box-shadow: 0 0 0 2px rgba(251, 113, 133, 0.1) !important;
                }
                .ant-form-item-explain-error {
                    font-size: 13px;
                    font-weight: 500;
                    margin-top: 4px;
                }
            `}} />
        </ConfigProvider>
    );
};

export default ResetPasswordPage;