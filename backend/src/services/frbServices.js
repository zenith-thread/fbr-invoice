// backend/src/services/fbrService.js
import axios from "axios";

const { FBR_TOKEN, FBR_SECURITY_TOKEN, FBR_POST_URL, FBR_VALIDATE_URL } =
  process.env;

/**
 * Post a new invoice to FBR sandbox
 * @param {Object} invoiceData — your invoice JSON as per FBR schema
 * @returns {Promise<Object>} response data from FBR
 */
export async function postInvoiceToFbr(invoiceData) {
  const res = await axios.post(FBR_POST_URL, invoiceData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FBR_TOKEN}`,
      "Security-Token": FBR_SECURITY_TOKEN,
    },
  });
  return res.data;
}

/**
 * Validate an invoice already posted (retrieve details)
 * @param {Object} validationPayload — usually { invoiceRefNo: '...' } or as FBR docs specify
 * @returns {Promise<Object>} response data from FBR
 */
export async function validateInvoiceWithFbr(validationPayload) {
  const res = await axios.post(FBR_VALIDATE_URL, validationPayload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FBR_TOKEN}`,
      "Security-Token": FBR_SECURITY_TOKEN,
    },
  });
  return res.data;
}
