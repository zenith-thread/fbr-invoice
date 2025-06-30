import express from "express";

// controllers
import { httpCreateInvoice } from "../controllers/invoice/createInvoice.controller.js";
import { httpGetAllInvoices } from "../controllers/invoice/getAllInvoices.controller.js";

const invoiceRouter = express.Router();

invoiceRouter.post("/", httpCreateInvoice);
invoiceRouter.post("/getPaginated", httpGetAllInvoices);

export default invoiceRouter;
