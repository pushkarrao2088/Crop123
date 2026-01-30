import { supabase } from './supabaseClient';
import { Product, CartItem } from '../types';

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getCartItems(userId: string): Promise<CartItem[]> {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', userId);

      if (error) throw error;

      return (data || []).map((item: any) => ({
        ...item.product,
        quantity: item.quantity
      }));
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  },

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({ user_id: userId, product_id: productId, quantity });

        if (error) throw error;
      }

      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  async updateCartQuantity(userId: string, productId: string, quantity: number) {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(userId, productId);
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  async removeFromCart(userId: string, productId: string) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  async createOrder(userId: string, totalAmount: number, shippingAddress: string) {
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: totalAmount,
          shipping_address: shippingAddress,
          status: 'Pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const cart = await this.getCartItems(userId);

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      return { data: order, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};
