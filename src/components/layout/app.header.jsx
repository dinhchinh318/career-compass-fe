import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Menu as MenuIcon, LogOut, UserCog, Compass, ChevronDown, Sparkles, X, Info } from "lucide-react";
import { message, Dropdown, Drawer, Avatar } from "antd";
import { useCurrentApp } from "../context/app.context";
import { logoutAPI } from "../../services/api.user";

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsAuthenticated, isAuthenticated, user, setUser } = useCurrentApp();
  const navigate = useNavigate();
  const location = useLocation();
  const roleLabel = user?.role === "admin" ? "Giáo viên" : "Học viên";


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res?.error === 0) {
      message.success("Hẹn gặp lại bạn nhé!");
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Làm bài Test", path: "/question", isCTA: true },
    { name: "Về chúng tôi", path: "/about" },
  ];

  const accountMenuItems = [
    {
      key: "user-profile",
      label: (
        <div className="px-3 py-3 min-w-[200px]">
          <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-1">
            {roleLabel}
          </p>
          <p className="text-sm font-extrabold text-slate-800 truncate">
            {user?.name}
          </p>
          <p className="text-[12px] text-slate-500 truncate">
            {user?.email}
          </p>
        </div>
      ),
    },
    { type: "divider" },

    {
      key: "account",
      icon: <User size={16} className="text-slate-500" />,
      label: (
        <Link to="/info" className="font-medium text-slate-700">
          Hồ sơ cá nhân
        </Link>
      ),
    },

    user?.role === "admin" && {
      key: "admin",
      icon: <UserCog size={16} className="text-indigo-500" />,
      label: (
        <Link to="/admin" className="font-medium text-slate-700">
          Quản trị hệ thống
        </Link>
      ),
    },

    { type: "divider" },

    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: <span className="font-bold">Đăng xuất</span>,
      danger: true,
      onClick: handleLogout,
    },
  ].filter(Boolean);


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled 
            ? "py-2 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]" 
            : "py-5 bg-white border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between">
            
            {/* LOGO: Bo tròn & Thân thiện */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 bg-blue-600 rounded-[14px] shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
                <Compass size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[18px] font-black tracking-tight text-slate-800">
                  Career<span className="text-blue-600 font-black">Compass</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Định hướng tương lai</span>
              </div>
            </Link>

            {/* NAV: Minimal Pill Design (Desktop) */}
            <nav className="hidden md:flex items-center p-1 bg-slate-100/60 rounded-2xl border border-slate-100">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-6 py-2 rounded-[12px] text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    } ${link.isCTA && !isActive ? "flex items-center gap-2" : ""}`}
                  >
                    {link.isCTA && !isActive && <Sparkles size={14} className="text-amber-400 animate-pulse" />}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ACTION: Profile & Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Dropdown
                  menu={{ items: accountMenuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                  overlayClassName="pt-3 custom-dropdown-edtech"
                >
                  <button className="flex items-center gap-2 p-1 pr-3 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
                    <Avatar 
                      src={user?.avatar} 
                      className="bg-blue-600 shadow-inner"
                      size={34}
                    >
                      {user?.name?.[0].toUpperCase()}
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-[12px] font-extrabold text-slate-800 leading-none mb-0.5 truncate max-w-[120px]">
                        {user?.name?.split(" ").pop()}
                      </p>
                      <p
                        className={`text-[10px] font-semibold leading-none ${
                          user?.role === "admin" ? "text-indigo-600" : "text-blue-500"
                        }`}
                      >
                        {roleLabel}
                      </p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </button>
                </Dropdown>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="hidden sm:block px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600">
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-6 py-2.5 bg-blue-600 text-white text-[13px] font-extrabold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all"
                  >
                    Bắt đầu
                  </Link>
                </div>
              )}

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100"
              >
                <MenuIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <Drawer
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width="85%"
        closeIcon={null}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col h-full bg-white px-6 py-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Compass size={18} className="text-white" />
              </div>
              <span className="font-black text-slate-800 tracking-tight">CAREER COMPASS</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-4 rounded-2xl font-bold text-lg ${
                  location.pathname === link.path ? "bg-blue-50 text-blue-600" : "text-slate-600"
                }`}
              >
                {link.name}
                {link.isCTA && <Sparkles size={18} className="text-amber-400" />}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-50">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2">
                  <Avatar size={48} className="bg-blue-600" src={user?.avatar}>{user?.name?.[0]}</Avatar>
                  <div>
                    <p className="font-extrabold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full py-4 rounded-2xl bg-red-50 text-red-500 font-bold text-center">Đăng xuất</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-4 bg-blue-600 text-white text-center rounded-2xl font-black shadow-lg shadow-blue-100">Đăng nhập ngay</Link>
            )}
          </div>
        </div>
      </Drawer>

      <style jsx="true">{`
        .custom-dropdown-edtech .ant-dropdown-menu {
          padding: 8px;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }
        .custom-dropdown-edtech .ant-dropdown-menu-item {
          border-radius: 10px;
          padding: 8px 12px;
        }
      `}</style>
    </>
  );
};

export default AppHeader;