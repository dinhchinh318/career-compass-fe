import axios from "../services/axios.customize";

const getChatSessionsAPI = () => {
    return axios.get("/v1/api/chat/sessions");
};

const createChatSessionAPI = () => {
    return axios.post("/v1/api/chat/sessions");
};

const getChatMessagesAPI = (sessionId) => {
    return axios.get(`/v1/api/chat/messages/${sessionId}`);
};

const saveChatMessageAPI = (data) => {
    return axios.post("/v1/api/chat/messages", data);
};

const deleteChatSessionAPI = (sessionId) => {
    return axios.delete(`/v1/api/chat/sessions/${sessionId}`);
};

export { 
    getChatSessionsAPI, 
    createChatSessionAPI, 
    getChatMessagesAPI, 
    saveChatMessageAPI, 
    deleteChatSessionAPI 
};