import { useContext, useEffect } from "react";

import Menu from "../assets/menu.png";
import Close from "../assets/close.png";
import { UserActionContext } from "../store/user-actions-context";
import { NavLink, useLocation } from "react-router-dom";
import { router } from "../App";

export default function SideBar() {
  const { isSideBarVisible, toggleSideBar } = useContext(UserActionContext);
  const location = useLocation();

  useEffect(() => {
    const menuButton = document.getElementById("side-bar-menu-icon");
    let element = document.getElementById("meals");
    if (location.pathname === "/orders") {
      element = document.getElementById("orders");
    }

    const animateButton = () => {
      menuButton.animate(
        [{ transform: "rotate(0)" }, { transform: "rotate(180deg)" }],
        {
          duration: 300,
          iterations: 1,
        },
      );
      let className = "animate-rl";
      if (!isSideBarVisible) {
        className = "animate-lr";
      }
      element.className = className;
    };

    menuButton.addEventListener("click", animateButton);

    return () => menuButton.removeEventListener("click", animateButton);
  }, [isSideBarVisible, location]);

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
        <div id="side-bar">
          <ul className="side-bar-container">
            {router.routes.map((mainRoute) =>
              mainRoute.children.map((route) => (
                <li key={route.id} className="side-bar-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                    to={route.path !== undefined ? "/" + route.path : ""}
                    end
                  >
                    {route.id}
                  </NavLink>
                </li>
              )),
            )}
          </ul>
        </div>
      )}
    </>
  );
}
