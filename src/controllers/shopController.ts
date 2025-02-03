import { Request, Response } from "express";
import { createShop, getAllShops, getShopById, updateShop, deleteShop } from "../repository/shopRepository";

export const createShopHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, location, phone_number } = req.body;
    if (!name || !location || !phone_number) {
      res.status(400).json({ error: "Shop name and location are required" });
      return;
    }

    const shop = await createShop(name, location, phone_number);
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: "Error creating shop" });
  }
};

export const getAllShopsHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const shops = await getAllShops();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: "Error fetching shops" });
  }
};

export const getShopByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid shop ID" });
      return;
    }

    const shop = await getShopById(id);
    if (!shop) {
      res.status(404).json({ error: "Shop not found" });
      return;
    }

    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ error: "Error fetching shop" });
  }
};

export const updateShopHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { shopName, location } = req.body;

    if (isNaN(id) || !shopName || !location) {
      res.status(400).json({ error: "Valid shop ID, name, and location are required" });
      return;
    }

    const updatedShop = await updateShop(id, shopName, location);
    if (!updatedShop) {
      res.status(404).json({ error: "Shop not found" });
      return;
    }

    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(500).json({ error: "Error updating shop" });
  }
};

export const deleteShopHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid shop ID" });
      return;
    }

    await deleteShop(id);
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting shop" });
  }
};
