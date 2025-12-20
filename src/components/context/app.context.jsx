import { createContext, useContext, useEffect, useState } from "react";
import { fetchAccountAPI } from "../../services/api.user";
import { getMyResultsAPI } from "../../services/api.result"; // Sử dụng đúng API

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [latestResult, setLatestResult] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  const refreshLatestResult = async () => {
    try {
      const res = await getMyResultsAPI();
      // Backend trả về mảng kết quả, lấy cái đầu tiên (mới nhất) vì đã có .sort({createdAt: -1})
      if (res?.data?.length > 0) {
        setLatestResult(res.data[0]);
      }
    } catch (err) {
      console.error("Lỗi lấy kết quả RIASEC:", err);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        const res = await fetchAccountAPI();
        if (res.data) {
          setUser(res.data.user);
          setIsAuthenticated(true);
          
          // Gọi lấy kết quả ngay sau khi xác thực thành công
          const resResult = await getMyResultsAPI();
          if (resResult?.data?.length > 0) {
            setLatestResult(resResult.data[0]);
          }
        }
      } catch (err) {
        console.error("Fetch account failed:", err);
      } finally {
        setAppLoading(false);
      }
    };
    initApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated, setIsAuthenticated,
        user, setUser,
        latestResult, setLatestResult,
        refreshLatestResult, // Cung cấp hàm này để gọi sau khi làm test xong
        appLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCurrentApp = () => useContext(AppContext);