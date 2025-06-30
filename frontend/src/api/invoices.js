import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInvoice = async (invoice) => {
  const { data } = await api.post("/api/invoices", invoice);
  return data;
};

export const getAllInvoices = async (page, limit) => {
  const { data } = await api.post("/api/invoices/getPaginated", {
    page,
    limit,
  });
  return data;
};
