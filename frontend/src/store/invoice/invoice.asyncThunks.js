import { createAsyncThunk } from "@reduxjs/toolkit";

// Api functions
import { createInvoice, getAllInvoices } from "../../api/invoices";

export const createInvoiceAsync = createAsyncThunk(
  "invoice/createInvoice",
  async ({ invoice }, { rejectWithValues }) => {
    try {
      const invoiceResponse = await createInvoice(invoice);
      return invoiceResponse;
    } catch (err) {
      return rejectWithValues(err.message);
    }
  }
);

export const getAllInvoicesAsync = createAsyncThunk(
  "invoice/getAllInvoices",
  async ({ page, limit }, { rejectWithValues }) => {
    try {
      const response = await getAllInvoices(page, limit);
      return response; // contains invoices, totalPages, currentPage, totalInvoices
    } catch (err) {
      return rejectWithValues(err.message);
    }
  }
);
