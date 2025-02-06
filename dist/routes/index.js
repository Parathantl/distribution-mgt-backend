"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const invoiceRoutes_1 = __importDefault(require("./invoiceRoutes"));
const shopRoutes_1 = __importDefault(require("./shopRoutes"));
const itemRoutes_1 = __importDefault(require("./itemRoutes"));
const auth_1 = require("../utils/auth");
const router = (0, express_1.Router)();
router.use('/users', userRoute_1.default);
router.use("/invoices", auth_1.auth, invoiceRoutes_1.default);
router.use("/shops", auth_1.auth, shopRoutes_1.default);
router.use("/items", auth_1.auth, itemRoutes_1.default);
exports.default = router;
