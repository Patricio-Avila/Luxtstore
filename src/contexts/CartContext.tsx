import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
    id: string; // Product ID
    name: string;
    price: number;
    image_url: string | null;
    quantity: number;
    maxStock: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: any) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("lux-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("lux-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (product: any) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
                if (existingItem.quantity >= product.inventory?.quantity) {
                    toast.error("No hay suficiente stock disponible");
                    return currentItems;
                }
                toast.success("Cantidad actualizada en el carrito");
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                toast.success("Producto agregado al carrito");
                return [
                    ...currentItems,
                    {
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        image_url: product.image_url,
                        quantity: 1,
                        maxStock: product.inventory?.quantity || 0,
                    },
                ];
            }
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems((items) =>
            items.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    if (newQuantity < 1) return item;
                    if (newQuantity > item.maxStock) {
                        toast.error("No hay suficiente stock");
                        return item;
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
