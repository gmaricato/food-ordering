import { createContext, useReducer } from "react";

const CART_INITIAL_STATE = {
  cart: []
};

export const CartContext = createContext({
  cart: CART_INITIAL_STATE.cart,
  addItemToCart: () => {},
  editItemFromCart: () => {},
  totalPrice: 0,
  clearCart: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const cartItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      const updatedCart = [...state.cart]
      const cartItem = updatedCart[cartItemIndex]

      if (cartItemIndex > -1) {
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity++
        }
        updatedCart[cartItemIndex] = updatedCartItem
      } else {
        action.payload.quantity = 1;
        updatedCart.push(action.payload)
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "EDIT_ITEM": {
      const cartItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      const updatedCart = [...state.cart]
      const cartItem = state.cart[cartItemIndex]

      if (cartItem.quantity === 1 && action.payload.amount === -1) {
        updatedCart.splice(cartItemIndex, 1);
        return {
          ...state,
          cart: updatedCart,
        };
      }

      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + action.payload.amount,
      }
      updatedCart[cartItemIndex] = updatedCartItem;

      return {
        ...state,
        cart: updatedCart,
      }
    }
    case "CLEAR_CART": {
      return {
        ...CART_INITIAL_STATE,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  
  function handleAddItemToCart(item) {
    cartDispatch({ type: "ADD_ITEM", payload: item });
  }

  function handleEditItemFromCart(id, amount) {
    cartDispatch({ type: "EDIT_ITEM", payload: { id, amount }});
  }

  function handleClearCart() {
    cartDispatch({ type: "CLEAR_CART" })
  }

  const totalPrice = cartState.cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const cartCtx = {
    cart: cartState.cart,
    addItemToCart: handleAddItemToCart,
    editItemFromCart: handleEditItemFromCart,
    totalPrice,
    clearCart: handleClearCart,
  };

  return <CartContext value={cartCtx}>{children}</CartContext>;
}
