import { query } from './../database';

export const createInvoice = async (shopId: number, totalAmount: number, user_id: string) => {
  const result = await query(
    'INSERT INTO invoices (shop_id, total_amount, user_id) VALUES ($1, $2, $3) RETURNING id',
    [shopId, totalAmount, user_id]
  );
    return result.rows[0].id;
};

export const createInvoiceItem = async (invoiceId: number, itemId: number, quantity: number, unitPrice: number) => {
  await query(
    'INSERT INTO invoice_items (invoice_id, item_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
    [invoiceId, itemId, quantity, unitPrice]
  );
};

export const updateCreateItemStock = async (item_id: number, quantity: number) => {
  const query1 = `UPDATE items 
                 SET stock = stock - $1
                 WHERE id = $2 AND stock >= $1
                  RETURNING id`;

  const { rows } = await query(query1, [quantity, item_id]);

  if (rows.length === 0) {
    throw new Error(`Insufficient stock for item ID: ${item_id}`);
  }
};


export const getInvoiceItems = async (invoiceId: number) => {
    const result = await query(
      `SELECT 
          ii.id AS invoice_item_id,
          it.item_name,
          ii.quantity,
          ii.unit_price,
          ii.total_price
       FROM invoice_items ii
       JOIN items it ON ii.item_id = it.id
       WHERE ii.invoice_id = $1`,
      [invoiceId]
    );
    return result.rows;
};

export const getInvoiceItemsInfo = async (invoiceId: number) => {
  const result = await query(
    "SELECT item_id, quantity FROM invoice_items WHERE invoice_id = $1",
    [invoiceId]
  );
  return result.rows;
};


export const getInvoices = async () => {
  const result = await query(
    `SELECT i.id, i.shop_id, s.shop_name, i.total_amount, i.created_at, 
     json_agg(json_build_object('item_id', ii.item_id, 'item_name', it.item_name, 'quantity', ii.quantity, 'unit_price', ii.unit_price, 'total_price', ii.total_price)) AS items
     FROM invoices i
     JOIN shops s ON i.shop_id = s.id
     JOIN invoice_items ii ON i.id = ii.invoice_id
     JOIN items it ON ii.item_id = it.id
     GROUP BY i.id, s.shop_name`
  );
  return result.rows;
};

export const getInvoiceById = async (id: number) => {
  const result = await query(
    `SELECT i.id, i.shop_id, s.shop_name, s.location, s.phone_number, i.total_amount, i.created_at, 
     json_agg(
       json_build_object(
         'item_id', ii.item_id, 
         'item_name', it.item_name, 
         'quantity', ii.quantity, 
         'mrp', it.mrp,
         'unit_price', ii.unit_price, 
         'total_price', ii.total_price
       )
     ) AS items
     FROM invoices i
     JOIN shops s ON i.shop_id = s.id
     JOIN invoice_items ii ON i.id = ii.invoice_id
     JOIN items it ON ii.item_id = it.id
     WHERE i.id = $1
     GROUP BY i.id, s.shop_name, s.location, s.phone_number`,
    [id]
  );
  return result.rows[0];
};

export const updateInvoiceTotal = async (invoiceId: number) => {
  await query(
    `UPDATE invoices 
     SET total_amount = (SELECT COALESCE(SUM(total_price), 0) FROM invoice_items WHERE invoice_id = $1) 
     WHERE id = $1`,
    [invoiceId]
  );
};

export const updateItemStock = async (itemId: number, quantity: number) => {
  await query(
    "UPDATE items SET stock = stock + $1 WHERE id = $2",
    [quantity, itemId]
  );
};

export const deleteInvoice = async (id: number) => {
  await query("DELETE FROM invoices WHERE id = $1", [id]);
};
