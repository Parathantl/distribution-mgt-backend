import { query } from "../database";

export const createItem = async (itemName: string, unitPrice: number, stock: boolean) => {
  const result = await query(
    "INSERT INTO items (item_name, unit_price, stock) VALUES ($1, $2, $3) RETURNING *",
    [itemName, unitPrice, stock]
  );
  return result.rows[0];
};

export const getAllItems = async () => {
  const result = await query("SELECT * FROM items ORDER BY created_at DESC");
  return result.rows;
};

export const getItemById = async (id: number) => {
  const result = await query("SELECT * FROM items WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateItem = async (id: number, itemName: string, unitPrice: number, inStock: boolean) => {
  const result = await query(
    "UPDATE items SET item_name = $1, unit_price = $2, in_stock = $3 WHERE id = $4 RETURNING *",
    [itemName, unitPrice, inStock, id]
  );
  return result.rows[0];
};

export const deleteItem = async (id: number) => {
  await query("DELETE FROM items WHERE id = $1", [id]);
};
