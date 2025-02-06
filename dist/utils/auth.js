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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.auth = void 0;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).send('Not authenticated');
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, database_1.SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
});
exports.auth = auth;
function generateToken(user) {
    var _a;
    const token = jsonwebtoken_1.default.sign({ _id: (_a = user.user_id) === null || _a === void 0 ? void 0 : _a.toString(), name: user.username }, database_1.SECRET_KEY, {
        expiresIn: '2 days',
    });
    return token;
}
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).send('Not authenticated');
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, database_1.SECRET_KEY);
        if (decoded) {
            res.status(200).send('Authenticated');
            return;
        }
        else {
            res.status(401).send('Invalid token');
            return;
        }
    }
    catch (err) {
        res.status(401).send('Please authenticate');
        return;
    }
});
exports.checkAuth = checkAuth;
