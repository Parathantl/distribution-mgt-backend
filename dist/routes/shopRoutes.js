"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shopController_1 = require("../controllers/shopController");
const router = express_1.default.Router();
router.post("/", shopController_1.createShopHandler);
router.get("/", shopController_1.getAllShopsHandler);
router.get("/:id", shopController_1.getShopByIdHandler);
router.put("/:id", shopController_1.updateShopHandler);
router.delete("/:id", shopController_1.deleteShopHandler);
exports.default = router;
