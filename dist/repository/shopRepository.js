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
exports.deleteShop = exports.updateShop = exports.getShopById = exports.getAllShops = exports.createShop = void 0;
const database_1 = require("./../database");
const createShop = (shopName, location, phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("INSERT INTO shops (shop_name, location, phone_number) VALUES ($1, $2, $3) RETURNING *", [shopName, location, phone_number]);
    return result.rows[0];
});
exports.createShop = createShop;
const getAllShops = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("SELECT * FROM shops ORDER BY created_at DESC");
    return result.rows;
});
exports.getAllShops = getAllShops;
const getShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("SELECT * FROM shops WHERE id = $1", [id]);
    return result.rows[0];
});
exports.getShopById = getShopById;
const updateShop = (id, shopName, location) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, database_1.query)("UPDATE shops SET shop_name = $1, location = $2 WHERE id = $3 RETURNING *", [shopName, location, id]);
    return result.rows[0];
});
exports.updateShop = updateShop;
const deleteShop = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.query)("DELETE FROM shops WHERE id = $1", [id]);
});
exports.deleteShop = deleteShop;
