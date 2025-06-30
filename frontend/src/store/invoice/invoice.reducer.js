import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  invoices: [],
  currentPage: 1,
  totalPages: 1,
  totalInvoices: 0,
  error: null,
  loading: {
    createInvoice: false,
    getInvoices: false,
  },
  success: {
    createInvoice: false,
    getInvoices: false,
  },
  failed: {
    createInvoice: false,
    getInvoices: false,
  },
};

// Async Thunk functions
import { createInvoiceAsync, getAllInvoicesAsync } from "./invoice.asyncThunks";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create invoice in database
      .addCase(createInvoiceAsync.pending, (state) => {
        state.loading.createInvoice = true;
      })
      .addCase(createInvoiceAsync.fulfilled, (state) => {
        state.loading.createInvoice = false;
        state.success.createInvoice = true;
      })
      .addCase(createInvoiceAsync.rejected, (state, action) => {
        state.loading.createInvoice = false;
        state.failed.createInvoice = true;
        state.error = action.payload;
      })

      // get all invoices with pagination from database
      .addCase(getAllInvoicesAsync.pending, (state) => {
        state.loading.getInvoices = true;
      })
      .addCase(getAllInvoicesAsync.fulfilled, (state, action) => {
        state.loading.getInvoices = false;
        state.success.getInvoices = true;
        state.invoices = action.payload.invoices;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalInvoices = action.payload.totalInvoices;
      })
      .addCase(getAllInvoicesAsync.rejected, (state, action) => {
        state.loading.getInvoices = false;
        state.error.getInvoices = true;
        state.error = action.payload;
      });
  },
});

export const { setInvoices } = invoiceSlice.actions;
export const invoiceReducer = invoiceSlice.reducer;
