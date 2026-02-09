import Header from "./Header";
import { Meals } from "./Meals";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function MainContainer() {
  return (
    <>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
}
