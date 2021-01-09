import { Link } from "react-router-dom";

function NavigationMenu(props) {
  return (
    <div>
      <div className="font-bold py-3">The Menu</div>
      <ul>
        <li>
          <Link
            to="/"
            onClick={props.closeMenu}
            className="block text-blue-500 py-3 border-t border-b"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={props.closeMenu}
            className="block text-blue-500 py-3 border-b"
          >
            About
          </Link>
        </li>
      </ul>{" "}
    </div>
  );
}

export default NavigationMenu;
