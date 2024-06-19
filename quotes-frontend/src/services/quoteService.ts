import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api/quotes";

export const getQuotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createQuote = async (quote: { text: string; author: string }) => {
  const response = await axios.post(API_URL, quote);
  return response.data;
};

export const updateQuote = async (
  id: number,
  quote: { text: string; author: string }
) => {
  const response = await axios.put(`${API_URL}${id}`, quote);
  return response.data;
};

export const deleteQuote = async (id: number) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
};
