import { query } from './../database';

export const createShop = async (shopName: string, location: string) => {
  const result = await query(
    "INSERT INTO shops (shop_name, location) VALUES ($1, $2) RETURNING *",
    [shopName, location]
  );
  return result.rows[0];
};

export const getAllShops = async () => {
  const result = await query("SELECT * FROM shops ORDER BY created_at DESC");
  return result.rows;
};

export const getShopById = async (id: number) => {
  const result = await query("SELECT * FROM shops WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateShop = async (id: number, shopName: string, location: string) => {
  const result = await query(
    "UPDATE shops SET shop_name = $1, location = $2 WHERE id = $3 RETURNING *",
    [shopName, location, id]
  );
  return result.rows[0];
};

export const deleteShop = async (id: number) => {
  await query("DELETE FROM shops WHERE id = $1", [id]);
};
