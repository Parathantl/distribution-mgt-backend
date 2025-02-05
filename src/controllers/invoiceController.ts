import { Request, Response } from "express";
import { createInvoice, createInvoiceItem, getInvoices, getInvoiceById, deleteInvoice, getInvoiceItems } from "../repository/invoiceRepository";
import { CustomRequest } from "../utils/auth";

interface InvoiceItem {
  item_id: number;
  quantity: number;
  unit_price: number;
}

export const createInvoiceHandler = async (req: Request, res: Response) => {
  const { shop, items, totalAmount } = req.body;
  const user_id = (req as CustomRequest).token._id;

  if (!shop || !items || items.length === 0) {
    res.status(400).json({ error: 'Shop ID and at least one item are required' });
    return;
  }

  try {
    const invoice_id = await createInvoice(shop, totalAmount, user_id);

    const invoiceItemsPromises = items.map(async (item: InvoiceItem) => {
      const { item_id, quantity, unit_price } = item;
      await createInvoiceItem(invoice_id, item_id, quantity, unit_price);
    });

    await Promise.all(invoiceItemsPromises);

    res.status(201).json({ message: 'Invoice created successfully', invoice_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create invoice', details: (error as Error).message });
  }
};

export const getInvoicesHandler = async (_req: Request, res: Response) => {
  try {
    const invoices = await getInvoices();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Error fetching invoices" });
  }
};

export const getInvoiceByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await getInvoiceById(Number(id));
    if (!invoice) {
        res.status(404).json({ error: "Invoice not found" });
        return;
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Error fetching invoice" });
  }
};

export const deleteInvoiceHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteInvoice(Number(id));
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting invoice" });
  }
};

export const getInvoiceItemsHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Extract invoice ID from request
      const items = await getInvoiceItems(Number(id));
  
      if (items.length === 0) {
        res.status(404).json({ message: "No items found for this invoice" });
        return
      }
  
      res.json({ invoice_id: id, items });
    } catch (error) {
      res.status(500).json({ error: "Error fetching invoice items" });
    }
  };