import { currencyFormatter } from "../utils/currency";

export default function CartItem({ item, onEditCartItem }) {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => onEditCartItem(item.id, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onEditCartItem(item.id, 1)}>+</button>
      </p>
    </li>
  );
}
