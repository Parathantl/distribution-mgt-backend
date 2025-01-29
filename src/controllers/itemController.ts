import { Request, Response } from "express";
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from "../repository/itemRepository";

export const createItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { itemName, unitPrice, stock } = req.body;
    if (!itemName || unitPrice === undefined || stock === undefined) {
      res.status(400).json({ error: "Item name, unit price, and in-stock status are required" });
      return;
    }

    const item = await createItem(itemName, unitPrice, stock);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error creating item" });
  }
};

export const getAllItemsHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

export const getItemByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid item ID" });
      return;
    }

    const item = await getItemById(id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error fetching item" });
  }
};

export const updateItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { itemName, unitPrice, inStock } = req.body;

    if (isNaN(id) || !itemName || unitPrice === undefined || inStock === undefined) {
      res.status(400).json({ error: "Valid item ID, name, price, and stock status are required" });
      return;
    }

    const updatedItem = await updateItem(id, itemName, unitPrice, inStock);
    if (!updatedItem) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
};

export const deleteItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid item ID" });
      return;
    }

    await deleteItem(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};
