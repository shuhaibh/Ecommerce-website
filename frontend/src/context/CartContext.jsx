import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (product, quantity) => {
    const itemExists = cartItems.find((i) => i.product === product._id);

    if (itemExists) {
      setCartItems(
        cartItems.map((i) =>
          i.product === itemExists.product
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      );
    } else {
      const newItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        stock: product.Stock,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeItemFromCart = (productId) => {
    setCartItems(cartItems.filter((i) => i.product !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((i) =>
        i.product === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
