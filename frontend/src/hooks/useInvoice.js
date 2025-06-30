import { useDispatch, useSelector } from "react-redux";

// Selectors
import {
  selectInvoices,
  selectError,
  selectCurrentPage,
  selectTotalPages,
  selectTotalInvoices,

  // STATUS SELECTORS
  // Loading
  selectLoadingCreateInvoice,
  selectLoadingGetInvoices,

  // Success
  selectSuccessCreateInvoice,
  selectSuccessGetInvoices,

  // Failed
  selectFailedCreateInvoice,
  selectFailedGetInvoices,
} from "../store/invoice/invoice.selector";

// Actions
import { setInvoices } from "../store/invoice/invoice.reducer";

// async thunks
import {
  createInvoiceAsync,
  getAllInvoicesAsync,
} from "../store/invoice/invoice.asyncThunks";

export const useInvoice = () => {
  const dispatch = useDispatch();

  // Selectors
  const invoiceInvoices = useSelector(selectInvoices);
  const invoiceError = useSelector(selectError);
  const invoiceCurrentPage = useSelector(selectCurrentPage);
  const invoiceTotalPages = useSelector(selectTotalPages);
  const invoiceTotalInvoices = useSelector(selectTotalInvoices);

  // status
  //loading
  const invoiceLoadingCreateInvoice = useSelector(selectLoadingCreateInvoice);
  const invoiceLoadingGetInvoices = useSelector(selectLoadingGetInvoices);

  // success
  const invoiceSuccessCreateInvoice = useSelector(selectSuccessCreateInvoice);
  const invoiceSuccessGetInvoices = useSelector(selectSuccessGetInvoices);

  // failed
  const invoiceFailedCreateInvoice = useSelector(selectFailedCreateInvoice);
  const invoiceFailedGetInvoices = useSelector(selectFailedGetInvoices);

  // Actions
  const invoiceSetInvoices = (invoice) => dispatch(setInvoices(invoice));

  // asyncThunks
  const invoiceCreateInvoiceAsync = (invoice) =>
    dispatch(createInvoiceAsync({ invoice }));

  const invoiceGetAllInvoicesAsync = (page, limit) =>
    dispatch(getAllInvoicesAsync({ page, limit }));

  return {
    // Selectors
    invoiceInvoices,
    invoiceError,
    invoiceCurrentPage,
    invoiceTotalPages,
    invoiceTotalInvoices,

    // status
    // loading
    invoiceLoadingCreateInvoice,
    invoiceLoadingGetInvoices,

    // success
    invoiceSuccessCreateInvoice,
    invoiceSuccessGetInvoices,

    // failed
    invoiceFailedCreateInvoice,
    invoiceFailedGetInvoices,

    // Actions
    invoiceSetInvoices,

    // AsyncThunks
    invoiceCreateInvoiceAsync,
    invoiceGetAllInvoicesAsync,
  };
};
