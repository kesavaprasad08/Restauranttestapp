import { useState, useMemo } from "react";

import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const totalAmount = useMemo(
    () =>
      items.reduce(
        (prev, currentValue) =>
          prev + currentValue?.price * currentValue?.quantity,
        0
      ),
    [items]
  );

  const addItemToCartHandler = (item) => {
    const itemIndex = items.findIndex((el) => el.id === item.id);
    if (itemIndex === -1) {
      setItems((prev) => [...prev, item]);
      return;
    }

    const updatedItems = items.map((el) => {
      if (el.id === item.id) {
        return {
          ...item,
          quantity: Number(item.quantity) + Number(el.quantity),
        };
      }
      return el;
    });
    setItems(updatedItems);
  };

  const removeItemFromCartHandler = (id) => {
    const filterItems = items
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Number(item.quantity) - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity >= 1);
    setItems(filterItems);
  };

  const cartContext = {
    items: items,
    totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
