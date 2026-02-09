import { use } from "react";
import { CartContext } from "../store/cart-context";
import { currencyFormatter } from "../utils/currency";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/user-progress-context";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart, totalPrice, editItemFromCart } = use(CartContext);
  const { progress, hideCart, showCheckout } = use(UserProgressContext);

  return (
    <Modal
      className="cart"
      show={progress === "cart"}
      // the onclose attr in the Modal dialog element will be called whenever the ref.close() is called, so it will always set
      // progress to "" unless we do this condition check
      onClose={progress === "cart" ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onEditCartItem={editItemFromCart}
          />
        ))}
      </ul>
      <div className="cart-total">{currencyFormatter(totalPrice)}</div>
      <p className="modal-actions">
        <Button textButton onClick={hideCart}>
          Close
        </Button>
        <Button onClick={showCheckout}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
