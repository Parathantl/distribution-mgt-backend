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
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllItems = exports.createItem = void 0;
const database_1 = require("../database");
const createItem = (itemName, unitPrice, mrp, expiryDate, stock) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("INSERT INTO items (item_name, unit_price, mrp, expiry_date, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *", [itemName, unitPrice, mrp, expiryDate, stock]);
    return result.rows[0];
});
exports.createItem = createItem;
const getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("SELECT * FROM items ORDER BY created_at DESC");
    return result.rows;
});
exports.getAllItems = getAllItems;
const getItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("SELECT * FROM items WHERE id = $1", [id]);
    return result.rows[0];
});
exports.getItemById = getItemById;
const updateItem = (id, itemName, unitPrice, mrp, expiryDate, stock) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, database_1.query)("UPDATE items SET item_name = $1, unit_price = $2, mrp = $3, expiry_date = $4, stock = $5 WHERE id = $6 RETURNING *", [itemName, unitPrice, mrp, expiryDate, stock, id]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
});
exports.updateItem = updateItem;
const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.query)("DELETE FROM items WHERE id = $1", [id]);
});
exports.deleteItem = deleteItem;
