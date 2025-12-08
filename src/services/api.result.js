import axios from "../services/axios.customize";

// SUBMIT TEST RESULT
export const submitTestAPI = (data) => {
  return axios.post("/v1/api/submit", data);
};

// GET RESULT BY ID
export const getResultByIdAPI = (id) => {
  return axios.get(`/v1/api/${id}`);
};

// DEBUG APIs
export const checkDataAPI = () => {
  return axios.get("/v1/api/debug/check");
};

export const getAllResultsAPI = () => {
  return axios.get("/v1/api/debug/all");
};

export const getAllUsersAPI = () => {
  return axios.get("/v1/api/debug/all-users");
};

export const getAllUsersV2API = () => {
  return axios.get("/v1/api/debug/all-users-v2");
};

export const rawCheckAPI = () => {
  return axios.get("/v1/api/debug/raw");
};

export const getMyResultsAPI = () => {
  return axios.get("/v1/api/my-result");
};
