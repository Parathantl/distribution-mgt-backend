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
exports.deleteItemHandler = exports.updateItemHandler = exports.getItemByIdHandler = exports.getAllItemsHandler = exports.createItemHandler = void 0;
const itemRepository_1 = require("../repository/itemRepository");
const createItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemName, unitPrice, mrp, expiryDate, stock } = req.body;
        if (!itemName || unitPrice === undefined || stock === undefined || mrp === undefined || expiryDate === undefined) {
            res.status(400).json({ error: "Item name, unit price, and in-stock status are required" });
            return;
        }
        const item = yield (0, itemRepository_1.createItem)(itemName, unitPrice, mrp, expiryDate, stock);
        res.status(201).json(item);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating item" });
    }
});
exports.createItemHandler = createItemHandler;
const getAllItemsHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield (0, itemRepository_1.getAllItems)();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching items" });
    }
});
exports.getAllItemsHandler = getAllItemsHandler;
const getItemByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid item ID" });
            return;
        }
        const item = yield (0, itemRepository_1.getItemById)(id);
        if (!item) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        res.status(200).json(item);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching item" });
    }
});
exports.getItemByIdHandler = getItemByIdHandler;
const updateItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        const { itemName, unitPrice, mrp, expiryDate, stock } = req.body;
        if (isNaN(Number(id)) || !itemName || unitPrice === undefined || stock === undefined || mrp === undefined || expiryDate === undefined) {
            res.status(400).json({ error: "Valid item ID, name, price, and stock status are required" });
            return;
        }
        const updatedItem = yield (0, itemRepository_1.updateItem)(id, itemName, unitPrice, mrp, expiryDate, stock);
        if (!updatedItem) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating item" });
    }
});
exports.updateItemHandler = updateItemHandler;
const deleteItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid item ID" });
            return;
        }
        yield (0, itemRepository_1.deleteItem)(id);
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting item" });
    }
});
exports.deleteItemHandler = deleteItemHandler;
