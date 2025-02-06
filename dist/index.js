"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors({
    origin: 'https://unrivaled-dasik-786ff0.netlify.app', // your front-end's domain (e.g., http://localhost:3001)
    credentials: true, // Allow sending credentials (cookies, headers, etc.)
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
