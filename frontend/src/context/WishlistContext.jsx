import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localData = localStorage.getItem('wishlistItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse wishlist items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addItemToWishlist = (product) => {
    const itemExists = wishlistItems.find((i) => i._id === product._id);

    if (!itemExists) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeItemFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((i) => i._id !== productId));
  };

  const isItemInWishlist = (productId) => {
    return wishlistItems.some((i) => i._id === productId);
  };

  const value = {
    wishlistItems,
    addItemToWishlist,
    removeItemFromWishlist,
    isItemInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
