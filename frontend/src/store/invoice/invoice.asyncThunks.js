// src/store/invoice/invoice.asyncThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// swap out old imports…
import { postFbrInvoice, getFbrInvoices } from "../../api/fbr";

export const createInvoiceAsync = createAsyncThunk(
  "invoice/createInvoice",
  async ({ invoice }, { rejectWithValue }) => {
    try {
      const res = await postFbrInvoice(invoice);
      return res; // { success: true, fbrResponse: { … } }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllInvoicesAsync = createAsyncThunk(
  "invoice/getAllInvoices",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await getFbrInvoices({ page, limit });
      // expect { invoices, totalPages, currentPage, totalInvoices }
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
