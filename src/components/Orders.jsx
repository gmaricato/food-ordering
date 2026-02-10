import { useContext } from "react";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";
import OrderItem from "./OrderItem";
import { UserActionContext } from "../store/user-actions-context";

const requestOptions = {};

export default function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useHttp("/orders", requestOptions, []);
  
  const { isSideBarVisible } = useContext(UserActionContext);

  if (isLoading) {
    return <p className="center">Fetching orders...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch orders" message={error} />;
  }

  return (
    <ul
      id="orders"
      style={{ margin: `2rem ${isSideBarVisible ? "20%" : "auto"}` }}
    >
      {orders.map((order) => (
        <OrderItem {...order} key={order.id} />
      ))}
    </ul>
  );
}
