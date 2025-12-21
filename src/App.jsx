import { Outlet } from "react-router-dom";
import AppFooter from "./components/layout/app.footer";
import AppHeader from "./components/layout/app.header";

function App() {
  return (
    <div id="main-blur-area" className="flex flex-col min-h-screen">
      {/* Header cố định ở trên cùng */}
      <AppHeader />
      
      {/* Thẻ main bao quanh Outlet:
        - flex-grow: Tự động lấp đầy khoảng trống để đẩy Footer xuống đáy.
        - pt-20 (Padding Top): Tạo khoảng trống bằng chiều cao của Header (khoảng 80-96px).
      */}
      <main className="flex-grow pt-20 md:pt-24 bg-[#f8fafc]">
        <Outlet />
      </main>

      {/* Footer ở cuối trang */}
      <AppFooter />
    </div>
  );
}

export default App;