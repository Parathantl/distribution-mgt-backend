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
exports.getUsersInfo = exports.getUser = exports.saveUser = exports.emailExists = exports.userNameExists = void 0;
const database_1 = require("../database");
const userNameExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, database_1.query)("SELECT email FROM public.users u where u.username = $1", [username]);
    return rows.length > 0;
});
exports.userNameExists = userNameExists;
const emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, database_1.query)("SELECT email FROM public.users u where u.email = $1", [email]);
    return rows.length > 0;
});
exports.emailExists = emailExists;
const saveUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, database_1.query)("INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email", [username, email, password]);
    return rows[0];
});
exports.saveUser = saveUser;
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield (0, database_1.query)("SELECT * FROM public.users u where u.username = $1", [username]);
    return rows[0];
});
exports.getUser = getUser;
const getUsersInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, database_1.query)("SELECT * FROM public.users");
    return users;
});
exports.getUsersInfo = getUsersInfo;
