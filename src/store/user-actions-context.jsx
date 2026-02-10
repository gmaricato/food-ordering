import { createContext, useState } from "react";

export const UserActionContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

function UserActionsContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  function toggleSideBar() {
    setIsSideBarVisible(prevVal => !prevVal)
  }

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    isSideBarVisible,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    toggleSideBar,
  };

  return (
    <UserActionContext.Provider value={userProgressCtx}>
      {children}
    </UserActionContext.Provider>
  );
}

export default UserActionsContextProvider;
