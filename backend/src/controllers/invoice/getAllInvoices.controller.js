import { invoices } from "../../models/invoice.model.js";

export const httpGetAllInvoices = (req, res) => {
  try {
    const { page, limit } = req.body;

    console.log("PAGE: ", page);
    console.log("LIMIT: ", limit);

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Sort invoices by receivedAt in descending order
    const sortedInvoices = invoices.sort(
      (a, b) => new Date(b.receivedAt) - new Date(a.receivedAt)
    );

    // Paginate by slicing the sorted invoices
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const paginatedInvoices = sortedInvoices.slice(startIndex, endIndex);

    // calculate the total number of pages
    const totalInvoices = invoices.length;
    const totalPages = Math.ceil(totalInvoices / limitNumber);

    return res.json({
      invoices: paginatedInvoices,
      totalPages,
      currentPage: pageNumber,
      totalInvoices,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
