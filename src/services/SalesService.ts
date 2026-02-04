import { supabase } from "@/integrations/supabase/client";

export interface CreateOrderParams {
  userId?: string | null;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}

export const SalesService = {
  async createOrder({ userId, items, totalAmount }: CreateOrderParams) {
    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId || null, // Allow null for guest checkout
        total_amount: totalAmount,
        status: 'paid', // Trigger will reduce stock
      })
      .select()
      .single();

    if (orderError) throw orderError;
    if (!order) throw new Error("Failed to create order");

    // 2. Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      price_per_unit: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  }
};
