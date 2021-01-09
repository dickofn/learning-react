import { useState } from "react";
import { useTransition, animated } from "react-spring";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  const maskTransitions = useTransition(showMenu, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const menuTransitions = useTransition(showMenu, null, {
    from: { opacity: 0.5, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0.5, transform: "translateX(-100%)" },
  });

  return (
    <nav>
      <span className="text-xl">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setShowMenu(!showMenu)}
          className="cursor-pointer"
        />
      </span>

      {maskTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              onClick={() => setShowMenu(false)}
              className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
            >
              this is the menu
            </animated.div>
          )
      )}

      {menuTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="fixed bg-white top-0 left-0 w-4/5 h-full z-20 shadow p-3"
            >
              <span className="font-bold">The Menu</span>
              <ul>
                <li>Home</li>
              </ul>
            </animated.div>
          )
      )}
    </nav>
  );
}

export default Navigation;
