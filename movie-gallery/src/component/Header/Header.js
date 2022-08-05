import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header header-horizontal header-view-pannel">
      <div className="container">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <span className="logo-element">
              <span className="logo-tape">
                <span
                  className="svg-content svg-fill-theme"
                  data-svg="./images/svg/logo-part.svg"
                ></span>
              </span>
              <span className="logo-text text-uppercase">
                <span>M</span>Movies
              </span>              
            </span>
          </Link>
          <button className="navbar-toggler" type="button">
            <span className="th-dots-active-close th-dots th-bars">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
                {user.username && 
                    <li>
                       Welcome: {user.username}
                    </li>}
              <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <div className="nav-arrow">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </li>
              {user.accessToken ? (
                <>                    
                  <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                    <Link
                      className="nav-link"
                      to="/movies"                      
                    >
                      Movies
                    </Link>
                    <div className="nav-arrow">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </li>
                  {user.isAdmin && <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                    <Link
                      className="nav-link"
                      to="/create"                      
                    >
                      Create
                    </Link>
                    <div className="nav-arrow">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </li>
                  }                  
                  <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                    <Link
                      className="nav-link"
                      to="/contactus"                      
                    >
                      Contact us
                    </Link>
                    <div className="nav-arrow">
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </li>                  
                  <li className="nav-item">
                    <Link className="nav-link" to="/Logout">
                      Logout
                    </Link>
                  </li>                 
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
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
