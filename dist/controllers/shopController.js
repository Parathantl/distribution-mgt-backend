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
exports.deleteShopHandler = exports.updateShopHandler = exports.getShopByIdHandler = exports.getAllShopsHandler = exports.createShopHandler = void 0;
const shopRepository_1 = require("../repository/shopRepository");
const createShopHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, phone_number } = req.body;
        if (!name || !location || !phone_number) {
            res.status(400).json({ error: "Shop name and location are required" });
            return;
        }
        const shop = yield (0, shopRepository_1.createShop)(name, location, phone_number);
        res.status(201).json(shop);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating shop" });
    }
});
exports.createShopHandler = createShopHandler;
const getAllShopsHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shops = yield (0, shopRepository_1.getAllShops)();
        res.status(200).json(shops);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching shops" });
    }
});
exports.getAllShopsHandler = getAllShopsHandler;
const getShopByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid shop ID" });
            return;
        }
        const shop = yield (0, shopRepository_1.getShopById)(id);
        if (!shop) {
            res.status(404).json({ error: "Shop not found" });
            return;
        }
        res.status(200).json(shop);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching shop" });
    }
});
exports.getShopByIdHandler = getShopByIdHandler;
const updateShopHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { shopName, location } = req.body;
        if (isNaN(id) || !shopName || !location) {
            res.status(400).json({ error: "Valid shop ID, name, and location are required" });
            return;
        }
        const updatedShop = yield (0, shopRepository_1.updateShop)(id, shopName, location);
        if (!updatedShop) {
            res.status(404).json({ error: "Shop not found" });
            return;
        }
        res.status(200).json(updatedShop);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating shop" });
    }
});
exports.updateShopHandler = updateShopHandler;
const deleteShopHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid shop ID" });
            return;
        }
        yield (0, shopRepository_1.deleteShop)(id);
        res.status(200).json({ message: "Shop deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting shop" });
    }
});
exports.deleteShopHandler = deleteShopHandler;
