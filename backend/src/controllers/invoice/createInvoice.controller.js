import { invoices } from "../../models/invoice.model.js";

export const httpCreateInvoice = (req, res) => {
  try {
    const { invoiceNumber, productName, price, gst } = req.body;

    if (!invoiceNumber || !productName || price == null || gst == null) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const invoice = {
      id: invoices.length + 1,
      invoiceNumber,
      productName,
      price: parseFloat(price),
      gst: parseFloat(gst),
      total: parseFloat(price) * (1 + parseFloat(gst) / 100),
      receivedAt: new Date().toISOString(),
    };

    invoices.push(invoice);
    console.log("Invoice created: ", invoice);
    return res.status(201).json({ success: true, invoice });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
