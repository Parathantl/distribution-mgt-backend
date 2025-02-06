"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = require("../controllers/itemController");
const router = express_1.default.Router();
router.post("/", itemController_1.createItemHandler);
router.get("/", itemController_1.getAllItemsHandler);
router.get("/:id", itemController_1.getItemByIdHandler);
router.put("/:id", itemController_1.updateItemHandler);
router.delete("/:id", itemController_1.deleteItemHandler);
exports.default = router;
