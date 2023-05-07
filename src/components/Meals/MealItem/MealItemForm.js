import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItemForm = (props) => {
  const cartCntx = useContext(CartContext)
  // const quantity =document.getElementById('amount_' + props.id)

  const addItemToCart = (event) => {
    event.preventDefault();
    const quantity =document.getElementById('amount_' + props.id).value;

    // console.log({...props, quantity:quantity});
    cartCntx.addItem({...props, quantity:quantity});
  }

  return (
    <form className={classes.form}>
      <Input
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button onClick={addItemToCart}>+ Add</button>
    </form>
  );
};

export default MealItemForm;