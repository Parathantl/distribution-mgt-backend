"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.SECRET_KEY = void 0;
const pg_1 = require("pg");
require('dotenv').config;
exports.SECRET_KEY = process.env.JWT_SECRET;
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});
const query = (text, params) => {
    return pool.query(text, params);
};
exports.query = query;
