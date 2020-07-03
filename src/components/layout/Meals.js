import React, { useLayoutEffect } from 'react';
import '../css/mainView.css';
import cartStore from '../store/cart-store';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function Meals(props) {
  const [cartItem, setCart] = React.useState(cartStore.initialState);

  useLayoutEffect(() => {
    let sub = cartStore.subscribe(setCart);
    cartStore.init();
    return function cleanup() {
      sub.unsubscribe();
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const [meal, setMeal] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  let piece = '';

  const handleClickOpen = (meal) => {
    if (meal.piece) {
      piece = 'gr';
    } else {
      piece = 'kom';
    }
    setMeal(meal);
    setOpen(true);
  };

  const RenderMessage = (type) => {
    if (type) {
      return <p>kom</p>;
    } else {
      return <p>gr</p>;
    }
  };

  const handleInput = (e) => {
    e.persist();
    setAmount(e.target.value)
  }

  const handleClose = (prop) => {
    if (amount !== 0) {
        cartStore.addToCart({ meal: meal, piece: piece, amout: amount });
      setOpen(false);
    }
  };

  return (
    <div className='meals-wrap'>
      {props.meals.map((item) => (
        <div
          className='meal-wrap'
          key={item.meal_id}
          onClick={() => {
            handleClickOpen(item);
          }}
        >
          <div className='meal-image'>
            <img src={item.link} alt={item.name} />
          </div>
          <div className='meal-name'>
            <p>{item.name}</p>
          </div>
        </div>
      ))}
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            {'Izabrano jelo'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {meal.name}
            </DialogContentText>
            <TextField
              id='standard-input'
              type='test'
              label='Količina'
              value={amount}
              placeholder=''
              onChange={handleInput}
            />
            <RenderMessage status={meal.piece} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)} color='primary'>
              Odustani
            </Button>
            <Button onClick={() => handleClose(true)} color='primary'>
              Poruči
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
