import { createContext, ReactNode, useContext, useState } from "react";
import Cart from "../components/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
type StoreCartProviderType = { children: ReactNode };

type StoreCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  quantityOfItemsInCart: number;
  itemsInCart: CartItemType[];
};

type CartItemType = {
  id: number;
  quantity: number;
};
const StoreCartContext = createContext({} as StoreCartContextType);

export function UseStoreCart() {
  return useContext(StoreCartContext);
}

export function StoreCartProvider({ children }: StoreCartProviderType) {
  const [itemsInCart, setItemsInCart] = useLocalStorage<CartItemType[]>("store", []);
  const [isOpen, setIsOpen] = useState(false);

  const quantityOfItemsInCart = itemsInCart.reduce((quantity, item) => item.quantity + quantity, 0);

  function getItemQuantity(id: number) {
    return itemsInCart.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setItemsInCart((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setItemsInCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id: number) {
    setItemsInCart((currItems) => currItems.filter((item) => item.id !== id));
  }

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <StoreCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        itemsInCart,
        quantityOfItemsInCart,
        openCart,
        closeCart,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </StoreCartContext.Provider>
  );
}
