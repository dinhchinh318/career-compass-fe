import axios from "../services/axios.customize";

export const askOpenAI = async (prompt, riasecResult = null, options = {}) => {
  const payload = { prompt, riasecResult };

  const res = await axios.post(
    "/v1/api/ai/ask",
    payload,
    { rawResponse: options.rawResponse }
  );

  return res; // ✅ interceptor đã return data rồi
};


