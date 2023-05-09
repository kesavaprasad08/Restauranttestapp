import React, { useContext, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../../store/cart-context";

const MealItemForm = (props) => {
  const cartCntx = useContext(CartContext);
  const inputRef = useRef();

  const addItemToCart = (event) => {
    event.preventDefault();
    const item = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      quantity: inputRef.current.value,
    };
    cartCntx.addItem(item);
    inputRef.current.value = 1;
  };

  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          ref: inputRef,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={addItemToCart}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
