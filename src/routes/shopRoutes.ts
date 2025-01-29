import express from "express";
import { 
  createShopHandler, 
  getAllShopsHandler, 
  getShopByIdHandler, 
  updateShopHandler, 
  deleteShopHandler 
} from "../controllers/shopController";

const router = express.Router();

router.post("/", createShopHandler);
router.get("/", getAllShopsHandler);
router.get("/:id", getShopByIdHandler);
router.put("/:id", updateShopHandler);
router.delete("/:id", deleteShopHandler);

export default router;
