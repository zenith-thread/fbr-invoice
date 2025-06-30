import { createSelector } from "@reduxjs/toolkit";

const selectInvoiceReducer = (state) => state.invoice;

export const selectInvoices = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.invoices
);

export const selectError = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.error
);

export const selectCurrentPage = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.currentPage
);

export const selectTotalPages = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.totalPages
);

export const selectTotalInvoices = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.totalInvoices
);

// STATUS SELECTORS

// loading
export const selectLoadingCreateInvoice = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.loading.createInvoice
);
export const selectLoadingGetInvoices = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.loading.getInvoices
);

// loading
export const selectSuccessCreateInvoice = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.success.createInvoice
);
export const selectSuccessGetInvoices = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.success.getInvoices
);

// loading
export const selectFailedCreateInvoice = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.failed.createInvoice
);
export const selectFailedGetInvoices = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.failed.getInvoices
);
