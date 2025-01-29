import express from "express";
import { createInvoiceHandler, getInvoicesHandler, getInvoiceByIdHandler, deleteInvoiceHandler, getInvoiceItemsHandler } from "../controllers/invoiceController";

const router = express.Router();

router.post("/", createInvoiceHandler);
router.get("/", getInvoicesHandler);
router.get("/:id", getInvoiceByIdHandler);
router.get("/:id/items", getInvoiceItemsHandler);
router.delete("/:id", deleteInvoiceHandler);

export default router;
