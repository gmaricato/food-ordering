import { use } from "react";

import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/cart-context";
import { UserActionContext } from "../store/user-actions-context";
import SideBar from "./SideBar";

export default function Header() {
  const { cart } = use(CartContext);
  const { showCart } = use(UserActionContext);

  return (
    <header id="main-header">
      <SideBar />
      <div id="title">
        <h1>Order Food App</h1>
        <img src={Logo} alt="A restaurant logo" />
      </div>
      <nav>
        <Button
          disabled={cart.length === 0}
          onClick={showCart}
          textButton
        >{`Cart (${cart.length})`}</Button>
      </nav>
    </header>
  );
}
