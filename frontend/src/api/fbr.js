// src/api/fbr.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submit an invoice to FBR sandbox
 */
export const postFbrInvoice = async (invoicePayload) => {
  console.log("Base URL:", api.defaults.baseURL);
  console.log("Posting to:", api.defaults.baseURL + "/invoices");
  const { data } = await api.post("/invoices", invoicePayload);
  return data;
};

/**
 * Validate an existing invoice in FBR sandbox
 */
export const validateFbrInvoice = async (validationPayload) => {
  const { data } = await api.post("/invoices/validate", validationPayload);
  return data;
};

/**
 * Fetch paginated FBR invoices from your backend store
 */
export const getFbrInvoices = async ({ page, limit }) => {
  const { data } = await api.get("/invoices", {
    params: { page, limit },
  });
  return data;
};
