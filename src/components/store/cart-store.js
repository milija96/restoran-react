import { Subject } from 'rxjs';

const subject = new Subject();

const initialState = {
    cart: []
}

let state = initialState;

const cartStore = {
    init: () => subject.next(state),
    subscribe: setState => subject.subscribe(setState),
    addToCart: meal  => {
        state = {
            ...state,
            cart: [...state.cart, meal],
        };
        subject.next(state)
    },
    initialState
}

export default cartStore;