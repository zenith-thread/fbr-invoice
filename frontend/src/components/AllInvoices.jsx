// components
import Button from "./Button";

// custom hooks
import { useInvoice } from "../hooks/useInvoice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllInvoices = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    invoiceInvoices,
    invoiceGetAllInvoicesAsync,
    invoiceLoadingGetInvoices,
    invoiceFailedGetInvoices,
    invoiceTotalPages,
  } = useInvoice();

  const showInvoicesHandler = () => {
    invoiceGetAllInvoicesAsync();
  };

  const goToPage = (newPage) => {
    if (newPage > 0 && newPage <= invoiceTotalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    invoiceGetAllInvoicesAsync(page, limit);
  }, [page, limit]);
  useEffect(() => {
    if (invoiceFailedGetInvoices) {
      toast.error("Failed to load invoices");
    }
  }, [invoiceFailedGetInvoices]);

  return (
    <div className="mx-auto max-w-[1600px]  my-[50px]">
      <Button type="button" onClick={showInvoicesHandler}>
        {invoiceLoadingGetInvoices ? "Loading..." : "Refresh"}
      </Button>
      <ul className="mt-[30px] overflow-x-auto scrollbar-thin">
        <div className="flex w-full">
          <span className="text-start p-4 border border-gray-700 bg-gray-800 text-white  min-w-[300px]">
            Invoice Number
          </span>
          <span className="text-start p-4 border border-gray-700 bg-gray-800 text-white  min-w-[300px]">
            Product Name
          </span>
          <span className="text-start p-4 border border-gray-700 bg-gray-800 text-white  min-w-[200px]">
            Price
          </span>
          <span className="text-start p-4 border border-gray-700 bg-gray-800 text-white  min-w-[100px]">
            GST
          </span>
          <span className="text-start p-4 border border-gray-700 bg-gray-800 text-white  min-w-[300px]">
            Total
          </span>
          <span className="text-start p-4 border border-gray-700 bg-gray-800 text-white  min-w-[300px]">
            Received At
          </span>
        </div>

        {invoiceInvoices.length > 0 &&
          invoiceInvoices.map(
            ({
              id,
              invoiceNumber,
              productName,
              price,
              gst,
              total,
              receivedAt,
            }) => (
              <li key={id} className="flex w-full">
                <span className="text-start p-4 border border-gray-600 bg-gray-700 py-2 text-white min-w-[300px]">
                  {invoiceNumber}
                </span>
                <span className="text-start p-4 border border-gray-600 bg-gray-700 py-2 text-white min-w-[300px]">
                  {productName}
                </span>
                <span className="text-start p-4 border border-gray-600 bg-gray-700 py-2 text-white min-w-[200px]">
                  {price}
                </span>
                <span className="text-start p-4 border border-gray-600 bg-gray-700 py-2 text-white min-w-[100px]">
                  {gst}
                </span>
                <span className="text-start p-4 border border-gray-600 bg-gray-700 py-2 text-white min-w-[300px]">
                  {total}
                </span>
                <span className="text-start p-4 border border-gray-600 bg-gray-700 py-2 text-white min-w-[300px]">
                  {receivedAt.slice(0, 10)}
                </span>
              </li>
            )
          )}
      </ul>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center">
        <Button
          type="button"
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
        >
          Previous
        </Button>
        <span className="mx-2 text-white text-xl font-medium px-4">
          Page {page} of {invoiceTotalPages}
        </span>
        <Button
          type="button"
          disabled={page === invoiceTotalPages}
          onClick={() => goToPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllInvoices;
