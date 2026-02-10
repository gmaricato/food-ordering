import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CartContextProvider from "./store/cart-context";
import UserActionsContextProvider from "./store/user-actions-context";
import HomePage from "../pages/Home";
import RootLayout from "../pages/Root";
import ErrorPage from "../pages/Error";
import OrdersPage from "../pages/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: "", element: <HomePage />, id: "Home" },
      // works the same as above (index: true = path: "")
      { index: true, element: <HomePage />, id: "Home" },
      {
        path: "orders",
        element: <OrdersPage />,
        id: "orders",
      },
    ],
  },
]);
function App() {
  return (
    <UserActionsContextProvider>
      <CartContextProvider>
        {/* <MainContainer /> */}
        <RouterProvider router={router} />
      </CartContextProvider>
    </UserActionsContextProvider>
  );
}

export default App;
