import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import fbrRouter from "./routes/invoice.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MIDDLEWARES
// cors
app.use(
  cors({
    origin: "http://3.108.217.44/",
  })
);

// parsing incoming request to json and populating req.body in json format
app.use(express.json());

// Routers
app.use("/api/invoices", fbrRouter);

// serve production ready react frontend using express
app.use(express.static(path.join(__dirname, "..", "public")));

// routes within our production build, handled by react router if any.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// a 404 response for any unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
