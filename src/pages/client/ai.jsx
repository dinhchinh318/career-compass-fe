import React, { useState, useEffect, useRef } from 'react';
import {
  Layout, Input, Button, Avatar, Spin, message as antMessage,
  Popconfirm, Typography, Badge, Space, Tooltip, Drawer, Card
} from 'antd';
import {
  SendOutlined, PlusOutlined, DeleteOutlined, MessageOutlined,
  RobotOutlined, UserOutlined, ThunderboltOutlined, CoffeeOutlined,
  CompassOutlined, RocketOutlined, MenuOutlined, DoubleLeftOutlined, 
  DoubleRightOutlined, HistoryOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// GIỮ NGUYÊN API VÀ LOGIC NGHIỆP VỤ
import {
  getChatSessionsAPI, createChatSessionAPI, getChatMessagesAPI,
  saveChatMessageAPI, deleteChatSessionAPI
} from '../../services/api.chat';
import { askOpenAI } from '../../services/openai.service';
import { useCurrentApp } from '../../components/context/app.context';

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Text, Title } = Typography;

const AIChatPage = () => {
  const { user, latestResult } = useCurrentApp();
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  
  // UI State
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileVisible, setMobileVisible] = useState(false);

  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  const quickPrompts = [
    { icon: <CompassOutlined />, text: "Định hướng nghề nghiệp phù hợp", color: "#f472b6" },
    { icon: <RocketOutlined />, text: "Lộ trình học tập SRE", color: "#fb7185" },
    { icon: <CoffeeOutlined />, text: "Cải thiện kỹ năng mềm", color: "#db2777" }
  ];

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { loadSessions(); }, []);

  const loadSessions = async () => {
    try {
      setLoadingSessions(true);
      const data = await getChatSessionsAPI();
      setSessions(data?.result || data?.data || data || []);
    } catch (error) {
      antMessage.error('Không thể tải danh sách hội thoại');
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadMessages = async (sessionId) => {
    if (activeSessionId === sessionId) return;
    try {
      setActiveSessionId(sessionId);
      setMobileVisible(false); // Đóng drawer sau khi chọn trên mobile
      const data = await getChatMessagesAPI(sessionId);
      setMessages(data?.result || data?.data || data || []);
    } catch (error) {
      antMessage.error('Lỗi khi tải tin nhắn');
    }
  };

  const handleNewChat = async () => {
    try {
      const data = await createChatSessionAPI();
      const newSession = data?.session || data;
      setSessions([newSession, ...sessions]);
      setActiveSessionId(newSession._id);
      setMessages([]);
      setMobileVisible(false);
    } catch (error) {
      antMessage.error('Không thể tạo hội thoại mới');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;
    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);
    try {
      const userRes = await saveChatMessageAPI({ sessionId: activeSessionId, role: 'user', content: userMessage });
      if (userRes) setMessages(prev => [...prev, (userRes?.message || userRes)]);
      const contextPrompt = latestResult?.riasecCode 
        ? `[USER_RIASEC: ${latestResult.riasecCode}]. Trả lời câu hỏi này theo phong cách chuyên gia tư vấn hướng nghiệp: ${userMessage}` 
        : userMessage;
      const aiResponse = await askOpenAI(contextPrompt, latestResult?.riasecCode);
      console.log('ket qua', latestResult?.riasecCode);
      const aiContent = typeof aiResponse === 'string' ? aiResponse : (aiResponse?.answer || 'Lỗi kết nối');
      const aiRes = await saveChatMessageAPI({ sessionId: activeSessionId, role: 'assistant', content: aiContent });
      if (aiRes) setMessages(prev => [...prev, (aiRes?.message || aiRes)]);
    } catch (error) {
      antMessage.error('Lỗi gửi tin nhắn');
    } finally {
      setLoading(false);
    }
  };

  const SidebarContent = () => (
    <div className="modern-sidebar">
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="logo-box"><ThunderboltOutlined /></div>
          <div className="logo-info">
            <Text strong style={{ color: '#be123c', fontSize: '16px', display: 'block' }}>Lịch sử Chat</Text>
            <Text style={{ fontSize: '10px', color: '#fb7185' }}>{sessions.length} hội thoại</Text>
          </div>
        </div>
        <Button block type="primary" icon={<PlusOutlined />} onClick={handleNewChat} className="btn-new-chat-gradient">
          Hội thoại mới
        </Button>
      </div>

      <div className="sidebar-list custom-scrollbar">
        {loadingSessions ? <div className="p-20 text-center"><Spin /></div> : (
          sessions.map(s => (
            <div key={s._id} className={`chat-item-card ${s._id === activeSessionId ? 'active' : ''}`} onClick={() => loadMessages(s._id)}>
              <MessageOutlined className="item-icon" />
              <Text ellipsis className="item-title">{s.title || 'Hội thoại mới'}</Text>
              <Popconfirm title="Xóa?" onConfirm={(e) => { e.stopPropagation(); deleteChatSessionAPI(s._id); loadSessions(); }}>
                <DeleteOutlined onClick={e => e.stopPropagation()} className="icon-delete" />
              </Popconfirm>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <Layout className="premium-pink-layout pt-24">
      {/* Nút Toggle Sidebar cho Desktop */}
      <div className={`desktop-toggle-trigger ${!showSidebar ? 'is-hidden' : ''}`} onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </div>

      {/* Sidebar Desktop */}
      <Sider width={showSidebar ? 280 : 0} className="main-desktop-sider" trigger={null} collapsible collapsed={!showSidebar} collapsedWidth={0}>
        <SidebarContent />
      </Sider>

      {/* Drawer Mobile (Sẽ mở khi bấm nút History) */}
      <Drawer placement="left" onClose={() => setMobileVisible(false)} open={mobileVisible} width={280} styles={{ body: { padding: 0 } }} closable={true}>
        <SidebarContent />
      </Drawer>

      <Layout className="chat-main-viewport">
        <header className="glass-header">
          <div className="header-left-group">
            {/* Nút mở Lịch sử chuyên dụng cho Mobile */}
            <Button 
              type="primary" 
              icon={<HistoryOutlined />} 
              className="mobile-history-btn" 
              onClick={() => setMobileVisible(true)}
            />
            <div className="header-status">
              <Avatar size="small" icon={<RobotOutlined />} style={{ backgroundColor: '#fb7185' }} />
              <div className="status-text">
                <Text strong>AI Career Coach</Text>
              </div>
            </div>
          </div>
        </header>

        <Content className="chat-body custom-scrollbar">
          <div className="chat-max-width">
            {!activeSessionId ? (
              <div className="welcome-hero">
                <div className="hero-badge">Career Compass AI ✨</div>
                <Title level={2} className="hero-title">Chào {user?.fullName || 'bạn'}, hôm nay tôi có thể giúp gì?</Title>
                <div className="quick-grid">
                  {quickPrompts.map((p, i) => (
                    <Card key={i} hoverable className="quick-card" onClick={() => { if(!activeSessionId) handleNewChat(); setInputValue(p.text); }}>
                      <div style={{color: p.color, fontSize: '24px', marginBottom: '8px'}}>{p.icon}</div>
                      <Text strong>{p.text}</Text>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="message-container">
                {messages.map((msg, i) => (
                  <div key={msg._id || i} className={`message-row ${msg.role}`}>
                    <div className="message-box">
                      <Avatar icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />} style={msg.role === 'assistant' ? {backgroundColor: '#fb7185'} : {}} />
                      <div className="bubble">
                        <div className="markdown-render">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="message-row assistant">
                    <div className="message-box">
                      <Avatar icon={<RobotOutlined />} style={{backgroundColor: '#fb7185'}} />
                      <div className="typing-loader"><span></span><span></span><span></span></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </Content>

        {activeSessionId && (
          <footer className="glass-footer">
            <div className="footer-container">
              <div className="input-wrapper">
                <TextArea
                  ref={textAreaRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                  placeholder="Hỏi về nghề nghiệp, kỹ năng..."
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  className="main-input"
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} className="send-btn" disabled={!inputValue.trim() || loading} />
              </div>
            </div>
          </footer>
        )}
      </Layout>

      <style dangerouslySetInnerHTML={{ __html: `
        .premium-pink-layout { height: 100vh; background: #fff; position: relative; overflow: hidden; }
        
        /* SIDEBAR DESKTOP */
        .main-desktop-sider { background: #fdf2f8 !important; border-right: 1px solid #fbcfe8; transition: all 0.3s ease !important; z-index: 50; }
        .desktop-toggle-trigger { position: absolute; left: 280px; top: 50%; transform: translateY(-50%); width: 20px; height: 40px; background: #fff; border: 1px solid #fbcfe8; border-radius: 0 8px 8px 0; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1001; color: #fb7185; transition: 0.3s; }
        .desktop-toggle-trigger.is-hidden { left: 0; }

        /* SIDEBAR CONTENT */
        .modern-sidebar { display: flex; flex-direction: column; height: 100%; }
        .sidebar-header { padding: 20px 16px; border-bottom: 1px solid #fce7f3; }
        .logo-section { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .logo-box { background: #fb7185; color: #fff; width: 32px; height: 32px; border-radius: 8px; display: grid; place-items: center; }
        .btn-new-chat-gradient { background: linear-gradient(135deg, #fb7185, #db2777) !important; border: none; border-radius: 8px; font-weight: 600; }
        .sidebar-list { flex: 1; overflow-y: auto; padding: 12px; }
        .chat-item-card { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; cursor: pointer; margin-bottom: 4px; transition: 0.2s; }
        .chat-item-card:hover { background: #fce7f3; }
        .chat-item-card.active { background: #fff; color: #be123c; font-weight: 600; border: 1px solid #fbcfe8; }
        .item-title { flex: 1; font-size: 13px; }
        .icon-delete { font-size: 12px; opacity: 0.4; }
        .icon-delete:hover { color: #ff4d4f; opacity: 1; }

        /* VIEWPORT */
        .glass-header { height: 60px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; padding: 0 16px; z-index: 10; justify-content: space-between; }
        .header-left-group { display: flex; align-items: center; gap: 12px; }
        .header-status { display: flex; align-items: center; gap: 8px; }

        /* NÚT MOBILE HISTORY - QUAN TRỌNG */
        .mobile-history-btn { display: none; background: #fb7185 !important; border: none; border-radius: 8px; }

        .chat-body { flex: 1; overflow-y: auto; padding: 20px 0; }
        .chat-max-width { max-width: 800px; margin: 0 auto; width: 100%; }
        .welcome-hero { text-align: center; padding: 40px 16px; }
        .hero-badge { background: #fff1f2; color: #be123c; padding: 4px 12px; border-radius: 20px; font-size: 11px; margin-bottom: 16px; display: inline-block; }
        .quick-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 30px; }
        .quick-card { border-radius: 12px; border: 1px solid #f1f5f9; }

        .message-row { margin-bottom: 20px; padding: 0 16px; }
        .message-box { display: flex; gap: 12px; max-width: 85%; }
        .message-row.user { justify-content: flex-end; }
        .message-row.user .message-box { flex-direction: row-reverse; }
        .bubble { padding: 10px 16px; background: #f8fafc; border-radius: 16px; font-size: 14px; }
        .user .bubble { background: #fff1f2; color: #881337; }

        .glass-footer { padding: 12px 16px 24px; background: #fff; border-top: 1px solid #f1f5f9; }
        .footer-container { max-width: 800px; margin: 0 auto; }
        .input-wrapper { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 6px 10px; display: flex; align-items: flex-end; gap: 8px; }
        .main-input { border: none !important; box-shadow: none !important; }
        .send-btn { background: #fb7185 !important; border: none; border-radius: 8px; height: 36px; width: 36px; }

        @media (max-width: 768px) {
          .main-desktop-sider, .desktop-toggle-trigger { display: none; }
          .mobile-history-btn { display: flex; align-items: center; justify-content: center; }
          .quick-grid { grid-template-columns: 1fr; }
          .message-box { max-width: 95%; }
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
        .typing-loader { display: flex; gap: 4px; padding: 10px; background: #f1f5f9; border-radius: 10px; width: fit-content; }
        .typing-loader span { width: 6px; height: 6px; background: #cbd5e1; border-radius: 50%; animation: bounce 1.4s infinite; }
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
      `}} />
    </Layout>
  );
};

export default AIChatPage;