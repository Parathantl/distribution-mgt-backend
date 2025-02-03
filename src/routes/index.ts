import { Router } from "express";
import userRoute from "./userRoute";
import invoiceRoutes from "./invoiceRoutes"
import shopRoutes from "./shopRoutes"
import itemRoutes from "./itemRoutes"
import { auth } from "../utils/auth";

const router = Router();

router.use('/users', userRoute)
router.use("/invoices", auth, invoiceRoutes);
router.use("/shops", auth, shopRoutes);
router.use("/items", auth, itemRoutes);

export default router;