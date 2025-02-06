"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceItemsHandler = exports.deleteInvoiceHandler = exports.getInvoiceByIdHandler = exports.getInvoicesHandler = exports.createInvoiceHandler = void 0;
const invoiceRepository_1 = require("../repository/invoiceRepository");
const createInvoiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shop, items, totalAmount } = req.body;
    const user_id = req.token._id;
    if (!shop || !items || items.length === 0) {
        res.status(400).json({ error: 'Shop ID and at least one item are required' });
        return;
    }
    try {
        const invoice_id = yield (0, invoiceRepository_1.createInvoice)(shop, totalAmount, user_id);
        const invoiceItemsPromises = items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const { item_id, quantity, unit_price } = item;
            yield (0, invoiceRepository_1.createInvoiceItem)(invoice_id, item_id, quantity, unit_price);
            yield (0, invoiceRepository_1.updateCreateItemStock)(item_id, quantity);
        }));
        yield Promise.all(invoiceItemsPromises);
        res.status(201).json({ message: 'Invoice created successfully', invoice_id });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create invoice', details: error.message });
    }
});
exports.createInvoiceHandler = createInvoiceHandler;
const getInvoicesHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield (0, invoiceRepository_1.getInvoices)();
        res.json(invoices);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching invoices" });
    }
});
exports.getInvoicesHandler = getInvoicesHandler;
const getInvoiceByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const invoice = yield (0, invoiceRepository_1.getInvoiceById)(Number(id));
        if (!invoice) {
            res.status(404).json({ error: "Invoice not found" });
            return;
        }
        res.json(invoice);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching invoice" });
    }
});
exports.getInvoiceByIdHandler = getInvoiceByIdHandler;
const deleteInvoiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const invoiceId = Number(id);
        const invoiceItems = yield (0, invoiceRepository_1.getInvoiceItemsInfo)(invoiceId);
        const updateStockPromises = invoiceItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, invoiceRepository_1.updateItemStock)(item.item_id, item.quantity);
        }));
        yield Promise.all(updateStockPromises);
        yield (0, invoiceRepository_1.deleteInvoice)(invoiceId);
        res.json({ message: "Invoice and related items deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting invoice:", error);
        res.status(500).json({ error: "Error deleting invoice" });
    }
});
exports.deleteInvoiceHandler = deleteInvoiceHandler;
const getInvoiceItemsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Extract invoice ID from request
        const items = yield (0, invoiceRepository_1.getInvoiceItems)(Number(id));
        if (items.length === 0) {
            res.status(404).json({ message: "No items found for this invoice" });
            return;
        }
        res.json({ invoice_id: id, items });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching invoice items" });
    }
});
exports.getInvoiceItemsHandler = getInvoiceItemsHandler;
