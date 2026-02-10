import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Cart />
      <Checkout />
      <main id="app-content">
        <Outlet />
      </main>
    </>
  );
}
