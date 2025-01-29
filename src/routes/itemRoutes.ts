import express from "express";
import { 
  createItemHandler, 
  getAllItemsHandler, 
  getItemByIdHandler, 
  updateItemHandler, 
  deleteItemHandler 
} from "../controllers/itemController";

const router = express.Router();

router.post("/", createItemHandler);
router.get("/", getAllItemsHandler);
router.get("/:id", getItemByIdHandler);
router.put("/:id", updateItemHandler);
router.delete("/:id", deleteItemHandler);

export default router;
