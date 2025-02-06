import express from "express";
import router from "./routes";
import cookieParser from 'cookie-parser';
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'https://unrivaled-dasik-786ff0.netlify.app', // your front-end's domain (e.g., http://localhost:3001)
    credentials: true, // Allow sending credentials (cookies, headers, etc.)
  }));

app.use(cookieParser());
app.use(express.json());

app.use('/api', router)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});