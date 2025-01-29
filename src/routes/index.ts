import { Router } from "express";
import userRoute from "./userRoute";
import invoiceRoutes from "./invoiceRoutes"
import shopRoutes from "./shopRoutes"
import itemRoutes from "./itemRoutes"

const router = Router();

router.use('/users', userRoute)
router.use("/invoices", invoiceRoutes);
router.use("/shops", shopRoutes);
router.use("/items", itemRoutes);

export default router;