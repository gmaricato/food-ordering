import { use } from "react";

import { currencyFormatter } from "../utils/currency";
import Button from "./UI/Button";

export default function OrderItem({ ...order }) {
  const {
    customer: { name, city, street, email, ["postal-code"]: postalCode },
    items = [],
    date,
    totalPrice,
  } = order;

  return (
    <li>
      <article className="order-item">
        <div className="order-section">
          <h3>{new Date(date).toDateString()}</h3>
        </div>
        <div className="order-section">
          <h3>{name}</h3>
          <p>{street}</p>
          <p>{postalCode}</p>
          <p>{city}</p>
        </div>
        <div className="order-section">
          <h3>{`Items (${items.length}x)`}</h3>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                <p>{`${item.quantity}x ${item.name} (${currencyFormatter(item.price)})`}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-section">
          <h3>Total</h3>
          <p>{currencyFormatter(totalPrice)}</p>
        </div>
      </article>
    </li>
  );
}
