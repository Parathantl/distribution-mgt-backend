import { query } from "../database";

export const createItem = async (itemName: string, unitPrice: number, mrp: number, expiryDate: Date, stock: string) => {
  const result = await query(
    "INSERT INTO items (item_name, unit_price, mrp, expiry_date, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [itemName, unitPrice, mrp, expiryDate, stock]
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

export const updateItem = async (
  id: string,
  itemName: string,
  unitPrice: string,
  mrp: string,
  expiryDate: string | Date,
  stock: string | number
) => {

  try {
    const result = await query(
      "UPDATE items SET item_name = $1, unit_price = $2, mrp = $3, expiry_date = $4, stock = $5 WHERE id = $6 RETURNING *",
      [itemName, unitPrice, mrp, expiryDate, stock, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (id: number) => {
  await query("DELETE FROM items WHERE id = $1", [id]);
};
