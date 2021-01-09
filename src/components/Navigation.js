import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  let menu;
  let menuMask;

  if (showMenu) {
    menu = (
      <div className="fixed bg-white top-0 left-0 w-4/5 h-full z-20 shadow">
        the menu
      </div>
    );

    menuMask = (
      <div
        onClick={() => setShowMenu(false)}
        className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
      ></div>
    );
  }

  return (
    <nav>
      <span className="text-xl">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setShowMenu(!showMenu)}
          className="cursor-pointer"
        />
      </span>

      {menuMask}
      {menu}
    </nav>
  );
}

export default Navigation;
