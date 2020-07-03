import React, { useLayoutEffect } from 'react';
import cartStore from '../store/cart-store';
import '../css/mainView.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../store/client-helper';
export default function Cart() {
  const [cartItem, setCart] = React.useState(cartStore.initialState);

  useLayoutEffect(() => {
    let sub = cartStore.subscribe((res) => {
      console.log(res);
      setCart(res);
    });
    cartStore.init();
    return function cleanup() {
      sub.unsubscribe();
    };
  }, []);

  function setInput(e, element) {
    e.preventDefault();
    element.amout = e.target.value;
  }

  const orderMeals = () => {
    let orders = [];
    console.log(cartItem)
    cartItem.cart.map((element) => {
      let order = {
        display: true,
        meal: {
          meal_id: element.meal.meal_id,
        },
        piece: element.meal.piece,
        quantity: element.amout,
      };
      orders.push(order);
    });
    api.orderMeal(orders)
  };
  return (
    <div className='chat-box'>
      {cartItem.cart.map((item, i) => (
        <div className='meal-wrap' key={i}>
          <div className='meal-image'>
            <img src={item.meal.link} alt={item.meal.name} />
          </div>
          <div className='meal-name'>
            <p>{item.meal.name}</p>
          </div>
          <div className='amount-input'>
            <TextField
              id='standard-input'
              type='test'
              label='Količina'
              value={item.amout}
              onChange={(e) => setInput(e, item)}
              placeholder=''
            />
          </div>
        </div>
      ))}

      <Button onClick={orderMeals} color='primary'>
        Poruči
      </Button>
    </div>
  );
}
