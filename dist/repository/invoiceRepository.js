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
exports.deleteInvoice = exports.updateItemStock = exports.updateInvoiceTotal = exports.getInvoiceById = exports.getInvoices = exports.getInvoiceItemsInfo = exports.getInvoiceItems = exports.updateCreateItemStock = exports.createInvoiceItem = exports.createInvoice = void 0;
const database_1 = require("./../database");
const createInvoice = (shopId, totalAmount, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)('INSERT INTO invoices (shop_id, total_amount, user_id) VALUES ($1, $2, $3) RETURNING id', [shopId, totalAmount, user_id]);
    return result.rows[0].id;
});
exports.createInvoice = createInvoice;
const createInvoiceItem = (invoiceId, itemId, quantity, unitPrice) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.query)('INSERT INTO invoice_items (invoice_id, item_id, quantity, unit_price) VALUES ($1, $2, $3, $4)', [invoiceId, itemId, quantity, unitPrice]);
});
exports.createInvoiceItem = createInvoiceItem;
const updateCreateItemStock = (item_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const query1 = `UPDATE items 
                 SET stock = stock - $1
                 WHERE id = $2 AND stock >= $1
                  RETURNING id`;
    const { rows } = yield (0, database_1.query)(query1, [quantity, item_id]);
    if (rows.length === 0) {
        throw new Error(`Insufficient stock for item ID: ${item_id}`);
    }
});
exports.updateCreateItemStock = updateCreateItemStock;
const getInvoiceItems = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)(`SELECT 
          ii.id AS invoice_item_id,
          it.item_name,
          ii.quantity,
          ii.unit_price,
          ii.total_price
       FROM invoice_items ii
       JOIN items it ON ii.item_id = it.id
       WHERE ii.invoice_id = $1`, [invoiceId]);
    return result.rows;
});
exports.getInvoiceItems = getInvoiceItems;
const getInvoiceItemsInfo = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("SELECT item_id, quantity FROM invoice_items WHERE invoice_id = $1", [invoiceId]);
    return result.rows;
});
exports.getInvoiceItemsInfo = getInvoiceItemsInfo;
const getInvoices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)(`SELECT i.id, i.shop_id, s.shop_name, i.total_amount, i.created_at, 
     json_agg(json_build_object('item_id', ii.item_id, 'item_name', it.item_name, 'quantity', ii.quantity, 'unit_price', ii.unit_price, 'total_price', ii.total_price)) AS items
     FROM invoices i
     JOIN shops s ON i.shop_id = s.id
     JOIN invoice_items ii ON i.id = ii.invoice_id
     JOIN items it ON ii.item_id = it.id
     GROUP BY i.id, s.shop_name`);
    return result.rows;
});
exports.getInvoices = getInvoices;
const getInvoiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)(`SELECT i.id, i.shop_id, s.shop_name, s.location, i.total_amount, i.created_at, 
     json_agg(
       json_build_object(
         'item_id', ii.item_id, 
         'item_name', it.item_name, 
         'quantity', ii.quantity, 
         'mrp', it.mrp,
         'unit_price', ii.unit_price, 
         'total_price', ii.total_price
       )
     ) AS items
     FROM invoices i
     JOIN shops s ON i.shop_id = s.id
     JOIN invoice_items ii ON i.id = ii.invoice_id
     JOIN items it ON ii.item_id = it.id
     WHERE i.id = $1
     GROUP BY i.id, s.shop_name, s.location`, [id]);
    return result.rows[0];
});
exports.getInvoiceById = getInvoiceById;
const updateInvoiceTotal = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.query)(`UPDATE invoices 
     SET total_amount = (SELECT COALESCE(SUM(total_price), 0) FROM invoice_items WHERE invoice_id = $1) 
     WHERE id = $1`, [invoiceId]);
});
exports.updateInvoiceTotal = updateInvoiceTotal;
const updateItemStock = (itemId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.query)("UPDATE items SET stock = stock + $1 WHERE id = $2", [quantity, itemId]);
});
exports.updateItemStock = updateItemStock;
const deleteInvoice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.query)("DELETE FROM invoices WHERE id = $1", [id]);
});
exports.deleteInvoice = deleteInvoice;
