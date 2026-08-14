import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";
import HeaderArrow from "./HeaderArrow.jsx";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header header-horizontal header-view-pannel ${isMenuOpen ? "active" : ""}`}>
      <div className="container">
        <nav className="navbar d-flex ">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>
            <span className="logo-element">
              <span className="logo-tape">
                <span
                  className="svg-content svg-fill-theme"
                  data-svg="./images/svg/logo-part.svg"
                ></span>
              </span>
              <span className="logo-text text-uppercase">
                Movie Gallery
              </span>
            </span>
          </Link>
          <button
            className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="th-dots-active-close th-dots th-bars">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <div className={`navbar-collapse justify-content-end ${isMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav">
              {user.username && <li>Welcome {user.username}</li>}
              <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                <Link className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </Link>
                <HeaderArrow />
              </li>
              {user.accessToken ? (
                <>
                  <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                    <Link className="nav-link" to="/movies" onClick={closeMenu}>
                      Movies
                    </Link>
                    <HeaderArrow />
                  </li>
                  {user.isAdmin ? (
                    <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                      <Link className="nav-link" to="/create" onClick={closeMenu}>
                        Create
                      </Link>
                      <HeaderArrow />
                    </li>
                  ) : (
                    <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                      <Link className="nav-link" to="/favorite" onClick={closeMenu}>
                        Favorite
                      </Link>
                      <HeaderArrow />
                    </li>
                  )}
                  <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                    <Link className="nav-link" to="/contactus" onClick={closeMenu}>
                      Contact us
                    </Link>
                    <HeaderArrow />
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={closeMenu}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" onClick={closeMenu}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
