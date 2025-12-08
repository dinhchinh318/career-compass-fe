import axios from "../services/axios.customize";

export const askOpenAI = async (prompt, riasecResult = null, options = {}) => {
  try {
    const payload = { prompt, riasecResult };
    const res = await axios.post("v1/api/ai/ask", payload);

    if (options.rawResponse) {
      return res; // trả nguyên object Axios
    }

    return res.data; // mặc định trả về data
  } catch (error) {
    throw error;
  }
};

