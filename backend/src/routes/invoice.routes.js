// backend/src/routes/fbrRoutes.js
import express from "express";
import {
  postInvoiceToFbr,
  validateInvoiceWithFbr,
} from "../services/frbServices.js";

const fbrRouter = express.Router();

// POST /api/fbr/invoices
fbrRouter.post("/", async (req, res) => {
  try {
    const invoiceData = req.body;
    const fbrResponse = await postInvoiceToFbr(invoiceData);
    res.json({ success: true, fbrResponse });
  } catch (err) {
    console.error("Error posting to FBR:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

// POST /api/fbr/invoices/validate
fbrRouter.post("/validate", async (req, res) => {
  try {
    const validationPayload = req.body;
    const fbrResponse = await validateInvoiceWithFbr(validationPayload);
    res.json({ success: true, fbrResponse });
  } catch (err) {
    console.error(
      "Error validating with FBR:",
      err.response?.data || err.message
    );
    res.status(err.response?.status || 500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

export default fbrRouter;
