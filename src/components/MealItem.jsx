import { use } from "react";

import { currencyFormatter } from "../utils/currency";
import Button from "./UI/Button";
import { CartContext } from "../store/cart-context";

export default function MealItem({ ...meal }) {
  const { name, price, description, image } = meal;
  const { addItemToCart } = use(CartContext);

  function handleAddItemToCart() {
    addItemToCart(meal);
  }

  return (
    <li>
      <article className="meal-item">
        <img src={`http://localhost:3000/${image}`} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
