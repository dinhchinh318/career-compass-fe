import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Menu as MenuIcon, LogOut, UserCog } from "lucide-react";
import { useState } from "react";
import { message, Menu, Dropdown, Drawer } from "antd";
import { useCurrentApp } from "../context/app.context";
import { fetchAccountAPI, logoutAPI } from "../../services/api.user";

const navLinks = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "about", label: <Link to="/about">About</Link> },
  { key: "question", label: <Link to="/question">Test</Link> },
];

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsAuthenticated, isAuthenticated, user, setUser } = useCurrentApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Map URL → selected menu key
  const currentKey = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/about")) return "about";
    if (location.pathname.startsWith("/question")) return "question";
    return "";
  };

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.error === 0) {
      message.success("Log out successfully!");
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const accountMenuItems = [
    !isAuthenticated && { key: "signup", label: <Link to="/register">Sign up</Link> },
    !isAuthenticated && { key: "signin", label: <Link to="/login">Sign in</Link> },
    isAuthenticated && { key: "account", icon: <User size={20} />, label: <Link to="/info">Account</Link> },
    isAuthenticated && user?.role === "admin" && { key: "manage", icon: <UserCog size={20} />, label: <Link to="/admin">Manage</Link> },
    isAuthenticated && { key: "logout", icon: <LogOut size={20} />, label: "Log out", onClick: handleLogout },
  ].filter(Boolean);

  return (
    <header className="sticky top-0 z-[1000] bg-white border-b border-gray-200 shadow-sm p-2">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-gray-900">
          Career Compass
        </Link>

        <div className="hidden sm:flex flex-1 ml-8">
          <Menu
            mode="horizontal"
            selectedKeys={[currentKey()]}
            items={navLinks}
            className="border-0 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <span
              className="hidden lg:block font-medium text-gray-900 capitalize truncate max-w-[200px]"
              title={user?.name}
            >
              {user?.name}
            </span>
          )}

          <Dropdown menu={{ items: accountMenuItems }} placement="bottomRight" trigger={["click"]}>
            <User size={22} className="cursor-pointer text-gray-800 hover:text-blue-600" />
          </Dropdown>

          <button
            className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100"
            aria-label="Open mobile menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className="text-2xl text-black" />
          </button>
        </div>

        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
        >
          <Menu
            mode="inline"
            selectedKeys={[currentKey()]}
            items={navLinks}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mt-6">
            <Menu
              mode="inline"
              items={accountMenuItems}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default AppHeader;
