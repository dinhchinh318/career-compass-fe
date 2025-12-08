import axios from "../services/axios.customize";

const createQuestionAPI = (data) => {
  return axios.post("/v1/api/", data);
};

const getQuestionsAPI = () => {
  return axios.get("/v1/api/");
};

const deleteQuestionAPI = (id) => {
  return axios.delete(`/v1/api/${id}`);
};

export { createQuestionAPI, getQuestionsAPI, deleteQuestionAPI };
