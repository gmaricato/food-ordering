import { use } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/cart-context";
import { currencyFormatter } from "../utils/currency";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserActionContext } from "../store/user-actions-context";
import { useHttp } from "../hooks/useHttp";
import { useActionState } from "react";
import Error from "./Error";

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { totalPrice, clearCart, cart } = use(CartContext);
  const { hideCheckout, progress } = use(UserActionContext);

  const { data, error, sendRequest, resetError, clearData } = useHttp(
    "/orders",
    requestOptions,
  );

  function handleFinishOrder() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleError() {
    resetError();
  }

  async function checkoutAction(prevFormState, formData) {
    const customerData = Object.fromEntries(formData.entries());
    await sendRequest(
      JSON.stringify({
        order: {
          customer: customerData,
          items: cart,
        },
      }),
    );
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  if (data && !error) {
    return (
      <Modal show={progress === "checkout"} onClose={handleFinishOrder}>
        <h2>Success!</h2>
        <p>Your order was successfully received by our chefs.</p>
        <p>
          You will be contacted with more informations about your order via
          email within the next minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinishOrder}>Okay</Button>
        </p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={progress === "checkout"} onClose={handleError}>
        <Error title="Error sending order" message={error} />
        <p className="modal-actions">
          <Button onClick={resetError}>Try Again</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal show={progress === "checkout"} onClose={hideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          {pending ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <Button type="button" textButton onClick={hideCheckout}>
                {/* since its inside a form, i must indicate the type, otherwise it will be submit */}
                Close
              </Button>
              <Button>Submit order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
