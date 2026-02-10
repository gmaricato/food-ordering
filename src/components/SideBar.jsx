import { useContext, useEffect } from "react";

import Menu from "../assets/menu.png";
import Close from "../assets/close.png";
import { UserActionContext } from "../store/user-actions-context";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const { isSideBarVisible, toggleSideBar } = useContext(UserActionContext);

  const navigate = useNavigate();

  useEffect(() => {
    const menuButton = document.getElementById("side-bar-menu-icon");
    const sideBar = document.getElementById("side-bar");
    console.log(sideBar)
    const menuButtonSpinning = [
      { transform: "rotate(0)" },
      { transform: "rotate(180deg)" },
    ];

    const slideSideBar = [
      { opacity: 0, transform: "translateX(-10rem)" },
      { opacity: 1, transform: "translateX(0rem)" },
    ];

    const timing = {
      duration: 300,
      iterations: 1,
    };

    const animateButton = () => menuButton.animate(menuButtonSpinning, timing);
    const showSideBarAnimation = () => sideBar?.animate(slideSideBar, timing);

    menuButton.addEventListener("click", () => {
      animateButton();
      showSideBarAnimation();
    });

    return () => menuButton.removeEventListener("click", () => {
      animateButton();
      showSideBarAnimation();
    });

  }, [isSideBarVisible]);

  const src = isSideBarVisible ? Close : Menu;

  return (
    <>
      <img
        id="side-bar-menu-icon"
        src={src}
        alt="menu"
        height={40}
        width={40}
        onClick={toggleSideBar}
      />
      {isSideBarVisible && (
        <div id="side-bar" /*className={!isSideBarVisible ? "hide" : null}*/>
          <ul className="side-bar-container">
            <li className="side-bar-item">
              <p onClick={() => navigate("")}>Meals</p>
            </li>
            <li className="side-bar-item">
              <p onClick={() => navigate("orders")}>Your Orders</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
