import { Pool } from "pg";
import { Secret } from 'jsonwebtoken';
require("dotenv").config();

export const SECRET_KEY: Secret = process.env.JWT_SECRET!;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
    ssl: { rejectUnauthorized: false }, 
})

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params)
}