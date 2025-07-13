// src/api/fbr.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // e.g. http://3.108.217.44
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submit an invoice to FBR sandbox
 */
export const postFbrInvoice = async (invoicePayload) => {
  const { data } = await api.post("/api/fbr/invoices", invoicePayload);
  return data;
};

/**
 * Validate an existing invoice in FBR sandbox
 */
export const validateFbrInvoice = async (validationPayload) => {
  const { data } = await api.post(
    "/api/fbr/invoices/validate",
    validationPayload
  );
  return data;
};

/**
 * Fetch paginated FBR invoices from your backend store
 */
export const getFbrInvoices = async ({ page, limit }) => {
  const { data } = await api.get("/api/fbr/invoices", {
    params: { page, limit },
  });
  return data;
};
