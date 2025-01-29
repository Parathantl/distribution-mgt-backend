import express from "express";
import router from "./routes";
const cors = require("cors");

const app = express();

app.use(cors());

// middleware to parse JSON
app.use(express.json());

app.use('/api', router)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});