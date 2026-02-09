import MainContainer from "./components/MainContainer";
import CartContextProvider from "./store/cart-context";
import UserProgressContextProvider from "./store/user-progress-context";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <MainContainer />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
