import axios from "../services/axios.customize";

const askGemini = async (prompt, riasec = null) => {
  const urlBackend = "/v1/api/ask";
  return axios.post(urlBackend, { prompt, riasec });
};

const getCareerAdvice = async (riasec) => {
  const urlBackend = "/v1/api/career-advice";
  return axios.post(urlBackend, { riasec });
};

export { askGemini, getCareerAdvice };