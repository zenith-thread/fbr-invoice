// src/components/AllInvoices.jsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import { useInvoice } from "../hooks/useInvoice";

const AllInvoices = () => {
  const [limit] = useState(10);

  const {
    invoiceInvoices,
    invoiceCurrentPage,
    invoiceTotalPages,
    invoiceTotalInvoices,
    invoiceLoadingGetInvoices,
    invoiceFailedGetInvoices,
    invoiceGetAllInvoicesAsync,
  } = useInvoice();

  // Fetch invoices when page or limit changes
  useEffect(() => {
    invoiceGetAllInvoicesAsync(invoiceCurrentPage, limit);
  }, [invoiceCurrentPage, limit]);

  // Show error toast if loading failed
  useEffect(() => {
    if (invoiceFailedGetInvoices) {
      toast.error("Failed to load invoices");
    }
  }, [invoiceFailedGetInvoices]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= invoiceTotalPages) {
      invoiceGetAllInvoicesAsync(newPage, limit);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] my-[50px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl">FBR Sandbox Invoices</h2>
        <Button
          onClick={() => invoiceGetAllInvoicesAsync(invoiceCurrentPage, limit)}
        >
          {invoiceLoadingGetInvoices ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Ref No</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Seller NTN</th>
              <th className="px-4 py-2">Buyer NTN</th>
              <th className="px-4 py-2"># Items</th>
            </tr>
          </thead>
          <tbody>
            {invoiceInvoices.map((inv) => (
              <tr
                key={inv.invoiceRefNo}
                className="bg-gray-700 even:bg-gray-600"
              >
                <td className="border px-4 py-2">{inv.invoiceRefNo}</td>
                <td className="border px-4 py-2">{inv.invoiceDate}</td>
                <td className="border px-4 py-2">{inv.invoiceType}</td>
                <td className="border px-4 py-2">{inv.sellerNTNCNIC}</td>
                <td className="border px-4 py-2">{inv.buyerNTNCNIC}</td>
                <td className="border px-4 py-2">{inv.items?.length ?? 0}</td>
              </tr>
            ))}
            {invoiceInvoices.length === 0 && !invoiceLoadingGetInvoices && (
              <tr>
                <td colSpan={6} className="text-center px-4 py-6 text-gray-400">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-4">
        <Button
          onClick={() => goToPage(invoiceCurrentPage - 1)}
          disabled={invoiceCurrentPage === 1}
        >
          Previous
        </Button>
        <span className="text-white">
          Page {invoiceCurrentPage} of {invoiceTotalPages} — showing{" "}
          {Math.min((invoiceCurrentPage - 1) * limit + 1, invoiceTotalInvoices)}{" "}
          to {Math.min(invoiceCurrentPage * limit, invoiceTotalInvoices)} of{" "}
          {invoiceTotalInvoices}
        </span>
        <Button
          onClick={() => goToPage(invoiceCurrentPage + 1)}
          disabled={invoiceCurrentPage === invoiceTotalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllInvoices;
