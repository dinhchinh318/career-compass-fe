import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, Trash2, Users, BookOpen, Download, Filter, 
  BarChart3, PieChart as PieIcon, Search, ChevronDown, 
  AlertCircle, CheckCircle2, X 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie, Legend 
} from "recharts";
import * as XLSX from 'xlsx';

import { createQuestionAPI, getQuestionsAPI, deleteQuestionAPI } from "../../services/api.question";
import { getAllUsersAPI } from "../../services/api.result";

// Palette màu Vivid Pastel - Rõ ràng, tương phản tốt hơn
const RIASEC_THEME = {
  R: { bg: "#FFE2E2", text: "#E11D48", border: "#FDA4AF", chart: "#FB7185" }, // Realistic
  I: { bg: "#E0F2FE", text: "#0369A1", border: "#7DD3FC", chart: "#38BDF8" }, // Investigative
  A: { bg: "#F0FDF4", text: "#15803D", border: "#86EFAC", chart: "#4ADE80" }, // Artistic
  S: { bg: "#FEFCE8", text: "#A16207", border: "#FDE047", chart: "#FACC15" }, // Social
  E: { bg: "#FFEDD5", text: "#C2410C", border: "#FDBA74", chart: "#FB923C" }, // Enterprising
  C: { bg: "#F5F3FF", text: "#6D28D9", border: "#C4B5FD", chart: "#818CF8" }, // Conventional
};

const ManagePage = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [riasecFilter, setRiasecFilter] = useState("All");

  const [newQuestion, setNewQuestion] = useState({ content: "", category: "R" });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [qRes, uRes] = await Promise.all([getQuestionsAPI(), getAllUsersAPI()]);
      setQuestions(Array.isArray(qRes) ? qRes : (qRes?.data || []));
      setUsers(Array.isArray(uRes) ? uRes : (uRes?.data || []));
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng kiểm tra kết nối.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    const stats = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    users.forEach(u => {
      const code = u.results?.[0]?.riasecCode?.[0];
      if (stats[code] !== undefined) stats[code]++;
    });
    return Object.keys(stats).map(key => ({
      name: key,
      value: stats[key],
      label: getCategoryName(key)
    }));
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = riasecFilter === "All" || u.results?.[0]?.riasecCode?.includes(riasecFilter);
      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, riasecFilter]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.content.trim()) return setError("Nội dung không được để trống");
    try {
      const created = await createQuestionAPI(newQuestion);
      if (created) {
        setQuestions(prev => [created.data || created, ...prev]);
        setNewQuestion({ content: "", category: "R" });
        setShowAddForm(false);
        setSuccess("Đã thêm câu hỏi mới!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) { setError(err.message); }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Xác nhận xóa câu hỏi này?")) return;
    try {
      await deleteQuestionAPI(id);
      setQuestions(prev => prev.filter(q => q._id !== id));
    } catch (err) { setError("Lỗi khi xóa câu hỏi."); }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers.map(u => ({
      "Học Tên": u.name, "Email": u.email, "Mã RIASEC": u.results?.[0]?.riasecCode || "N/A"
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "Career_Compass_Results.xlsx");
  };

  function getCategoryName(c) {
    return { R: "Realistic", I: "Investigative", A: "Artistic", S: "Social", E: "Enterprising", C: "Conventional" }[c] || c;
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-rose-600 font-bold tracking-tight">Cấu hình Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-slate-900 font-sans pb-12">
      {/* HEADER: High Contrast */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Career Compass <span className="text-rose-500">Admin</span></h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Management System v2.0</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white border-2 border-rose-100 px-4 py-2 rounded-2xl flex items-center shadow-sm">
              <BookOpen size={18} className="text-rose-500 mr-2" />
              <span className="text-slate-700 font-black">{questions.length}</span>
              <span className="ml-2 text-slate-400 text-[10px] font-bold uppercase">Câu hỏi</span>
            </div>
            <div className="bg-white border-2 border-blue-100 px-4 py-2 rounded-2xl flex items-center shadow-sm">
              <Users size={18} className="text-blue-500 mr-2" />
              <span className="text-slate-700 font-black">{users.length}</span>
              <span className="ml-2 text-slate-400 text-[10px] font-bold uppercase">Học sinh</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {/* ALERTS */}
        {error && <div className="mb-6 p-4 bg-rose-600 text-white rounded-2xl flex items-center shadow-lg shadow-rose-200 animate-bounce"><AlertCircle className="mr-2" /> {error}</div>}
        {success && <div className="mb-6 p-4 bg-emerald-500 text-white rounded-2xl flex items-center shadow-lg shadow-emerald-100"><CheckCircle2 className="mr-2" /> {success}</div>}

        {/* ANALYTICS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,192,203,0.15)] border border-white">
            <h3 className="text-lg font-black mb-6 flex items-center uppercase tracking-tight text-slate-700">
              <BarChart3 size={20} className="mr-2 text-rose-500" /> Thống kê nhóm RIASEC
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                  <Tooltip cursor={{fill: '#FFF5F7'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={45}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={RIASEC_THEME[entry.name].chart} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,192,203,0.15)] border border-white flex flex-col items-center">
            <h3 className="text-lg font-black mb-6 self-start uppercase tracking-tight text-slate-700">
              <PieIcon size={20} className="mr-2 text-rose-500 inline" /> Tỷ lệ %
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={RIASEC_THEME[entry.name].chart} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 w-full">
              {Object.keys(RIASEC_THEME).map(key => (
                <div key={key} className="flex items-center flex-col p-2 rounded-xl border border-slate-50">
                  <span className="text-xs font-black" style={{color: RIASEC_THEME[key].text}}>{key}</span>
                  <div className="w-full h-1 rounded-full mt-1" style={{backgroundColor: RIASEC_THEME[key].chart}}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* QUESTIONS MANAGEMENT */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-rose-100/20 border border-white">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-800">Kho câu hỏi</h2>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className={`p-3 rounded-2xl transition-all shadow-md ${showAddForm ? 'bg-slate-800 text-white' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
              >
                {showAddForm ? <X size={20}/> : <Plus size={20} />}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddQuestion} className="mb-8 p-6 bg-rose-50 rounded-[2rem] border-2 border-rose-100 animate-in fade-in zoom-in-95 duration-300">
                <label className="text-[10px] font-black uppercase text-rose-400 tracking-widest block mb-2 ml-1">Nội dung câu hỏi mới</label>
                <textarea
                  className="w-full p-4 bg-white border-2 border-rose-100 rounded-2xl focus:ring-4 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all text-sm font-medium"
                  rows={3} value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  placeholder="Ví dụ: Bạn có thích sửa chữa các đồ vật trong nhà không?"
                />
                <div className="mt-4">
                  <label className="text-[10px] font-black uppercase text-rose-400 tracking-widest block mb-2 ml-1">Phân loại RIASEC</label>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.keys(RIASEC_THEME).map((c) => (
                      <button
                        key={c} type="button"
                        onClick={() => setNewQuestion({ ...newQuestion, category: c })}
                        className={`py-2 rounded-xl font-black text-sm transition-all border-2 ${newQuestion.category === c ? 'scale-110 shadow-md' : 'opacity-40 hover:opacity-100'}`}
                        style={{ backgroundColor: RIASEC_THEME[c].bg, color: RIASEC_THEME[c].text, borderColor: newQuestion.category === c ? RIASEC_THEME[c].text : 'transparent' }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-900 shadow-lg transition-all">
                  XÁC NHẬN LƯU
                </button>
              </form>
            )}

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q) => (
                <div key={q._id} className="group p-5 bg-white border-2 border-slate-50 rounded-3xl hover:border-rose-200 transition-all hover:shadow-xl hover:shadow-rose-100/40 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border" 
                      style={{ backgroundColor: RIASEC_THEME[q.category].bg, color: RIASEC_THEME[q.category].text, borderColor: RIASEC_THEME[q.category].border }}>
                      {getCategoryName(q.category)}
                    </span>
                    <button onClick={() => handleDeleteQuestion(q._id)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-700 leading-snug relative z-10">{q.content}</p>
                  <div className="absolute right-0 bottom-0 opacity-[0.03] rotate-12 translate-x-4 translate-y-4">
                    <BookOpen size={80} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESULTS MANAGEMENT */}
          <div className="lg:col-span-7 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-rose-100/20 border border-white flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-xl font-black text-slate-800">Kết quả học sinh</h2>
              <button onClick={exportToExcel} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                <Download size={16} /> XUẤT EXCEL
              </button>
            </div>

            {/* SEARCH & FILTER BAR: Bold UI */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" placeholder="Tìm tên hoặc email..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-400 outline-none text-sm font-bold transition-all"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-3 rounded-2xl shadow-lg">
                <Filter size={16} className="text-rose-400" />
                <select 
                  className="bg-transparent border-none outline-none text-xs font-black text-white cursor-pointer pr-4"
                  value={riasecFilter} onChange={(e) => setRiasecFilter(e.target.value)}
                >
                  <option value="All" className="text-slate-900">TẤT CẢ MÃ</option>
                  {["R", "I", "A", "S", "E", "C"].map(c => <option key={c} value={c} className="text-slate-900">NHÓM {c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredUsers.length === 0 ? (
                <div className="col-span-2 py-20 text-center">
                  <Users size={60} className="mx-auto mb-4 text-slate-100" />
                  <p className="font-black text-slate-300 uppercase tracking-widest">Không có dữ liệu</p>
                </div>
              ) : (
                filteredUsers.map((u, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] hover:bg-white hover:border-rose-200 hover:shadow-xl transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-rose-50 flex items-center justify-center text-rose-500 text-lg font-black">
                        {u.name?.charAt(0) || "?"}
                      </div>
                      <div className="px-4 py-1.5 rounded-xl shadow-inner text-[11px] font-black border-2" 
                        style={{ backgroundColor: RIASEC_THEME[u.results?.[0]?.riasecCode?.[0]]?.bg || '#fff', 
                                 color: RIASEC_THEME[u.results?.[0]?.riasecCode?.[0]]?.text || '#000',
                                 borderColor: RIASEC_THEME[u.results?.[0]?.riasecCode?.[0]]?.border || '#eee' }}>
                        {u.results?.[0]?.riasecCode || "N/A"}
                      </div>
                    </div>
                    <h3 className="font-black text-slate-800 truncate leading-none mb-1">{u.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 truncate mb-4 uppercase tracking-tighter">{u.email}</p>
                    
                    {u.results?.[0]?.details && (
                      <div className="grid grid-cols-3 gap-1 mt-auto pt-4 border-t border-slate-200/50">
                        {Object.entries(u.results[0].details).slice(0, 6).map(([k, v]) => (
                          <div key={k} className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-300 uppercase">{k}</span>
                            <span className="text-xs font-black text-slate-600">{v}đ</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FDA4AF; border-radius: 10px; border: 2px solid white; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.4s ease-out forwards; }
      `}} />
    </div>
  );
};

export default ManagePage;