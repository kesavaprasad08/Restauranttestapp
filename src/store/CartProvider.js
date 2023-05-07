import { useState } from "react";

import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [totalAmt, updateTotalAmt] = useState(0);

  const addItemToCartHandler = (item) => {
    let isSameItem = false;

    items.map((itemin) => {
      if (itemin.id === item.id) {
        isSameItem = true;

        item.quantity = (itemin.quantity - 0 + (item.quantity - 0)).toString();

        items.splice(items.indexOf(itemin), 1);

        updateTotalAmt(totalAmt + (item.quantity - 1) * item.price);

        updateItems([...items, item]);
      }
    });

    if (!isSameItem) {
      updateItems([...items, item]);
      updateTotalAmt(totalAmt + item.price * item.quantity);
    }
  };

  const removeItemFromCartHandler = (id) => {};

  const cartContext = {
    items: items,
    totalAmount: totalAmt,
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
