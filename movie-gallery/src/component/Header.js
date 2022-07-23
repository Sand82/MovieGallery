export default function Header() {
  return   <header className="header header-horizontal header-view-pannel">
  <div className="container">
    <nav className="navbar">
      <a className="navbar-brand" href="./">
        <span className="logo-element">
          <span className="logo-tape">
            <span
              className="svg-content svg-fill-theme"
              data-svg="./images/svg/logo-part.svg"
            ></span>
          </span>
          <span className="logo-text text-uppercase">
            <span>M</span>Movie Gallery
          </span>
        </span>
      </a>
      <button className="navbar-toggler" type="button">
        <span className="th-dots-active-close th-dots th-bars">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
            <a className="nav-link" href="/">
              Homepage
            </a>
            <div className="nav-arrow">
              <i className="fas fa-chevron-down"></i>
            </div>            
          </li>
          <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
            <a className="nav-link" href="/movies" data-role="nav-toggler">
              Movies
            </a>
            <div className="nav-arrow">
              <i className="fas fa-chevron-down"></i>
            </div>              
          </li>          
          <li className="nav-item">
            <a className="nav-link" href="/contactus">
              Contact us
            </a>
          </li>          
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>          
        </ul>        
      </div>
    </nav>
  </div>
</header>   
}
