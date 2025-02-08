import express from "express";
import router from "./routes";
import cookieParser from 'cookie-parser';
const cors = require("cors");

const app = express();

app.use(cors({
    origin: ['http://localhost:5173/', 'https://distribution-mgt-frontend.onrender.com'],
    credentials: true, // Allow sending credentials (cookies, headers, etc.)
  }));

app.use(cookieParser());
app.use(express.json());

app.use('/api', router)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});