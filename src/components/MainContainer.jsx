import { Meals } from "./Meals";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function MainContainer() {
  return (
    <>
      <main id="app-content">
        <Meals />
        <Cart />
        <Checkout />
      </main>
    </>
  );
}
