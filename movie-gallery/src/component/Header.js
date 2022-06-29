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
            <span>M</span>emico
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
            <a className="nav-link" href="#">
              Homepage
            </a>
            <div className="nav-arrow">
              <i className="fas fa-chevron-down"></i>
            </div>
            <ul className="collapse nav">
              <li className="nav-item">
                <a className="nav-link" href="homepage-1.html">
                  Homepage 1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="homepage-2.html">
                  Homepage 2
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="homepage-3.html">
                  Homepage 3
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
            <a className="nav-link" href="#" data-role="nav-toggler">
              Pages
            </a>
            <div className="nav-arrow">
              <i className="fas fa-chevron-down"></i>
            </div>
            <ul className="collapse nav">
              <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                <a className="nav-link" href="#" data-role="nav-toggler">
                  Movies
                </a>
                <div className="nav-arrow">
                  <i className="fas fa-chevron-down"></i>
                </div>
                <ul className="collapse nav">
                  <li className="nav-item">
                    <a className="nav-link" href="movies-blocks.html">
                      Blocks - No Sidebar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="movies-blocks-sidebar-right.html"
                    >
                      Blocks - Sidebar right
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="movies-posters.html">
                      Posters - No Sidebar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="movies-posters-sidebar-right.html"
                    >
                      Posters - Sidebar right
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="movies-list.html">
                      List - No Sidebar
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="movie-info-sidebar-right.html"
                >
                  Movie info
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="gallery.html">
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="news-blocks-sidebar-right.html"
                >
                  News
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="article-sidebar-right.html">
                  Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about-us.html">
                  About us
                </a>
              </li>
              <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                <a className="nav-link" href="#" data-role="nav-toggler">
                  User pages
                </a>
                <div className="nav-arrow">
                  <i className="fas fa-chevron-down"></i>
                </div>
                <ul className="collapse nav">
                  <li className="nav-item">
                    <a className="nav-link" href="sign-in.html">
                      Sign in
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="sign-up.html">
                      Sign up
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-item-arrow-down nav-hover-show-sub">
                <a className="nav-link" href="#" data-role="nav-toggler">
                  Status pages
                </a>
                <div className="nav-arrow">
                  <i className="fas fa-chevron-down"></i>
                </div>
                <ul className="collapse nav">
                  <li className="nav-item">
                    <a className="nav-link" href="under-construction.html">
                      Under construction
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="coming-soon.html">
                      Coming soon
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="404-1.html">
                      404 - 1
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="404-2.html">
                      404 - 2
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="movies-blocks.html">
              Movies
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contact-us.html">
              Contact us
            </a>
          </li>
        </ul>
        <div className="navbar-extra">
          <a className="btn-theme btn" href="#">
            <i className="fas fa-ticket-alt"></i>&nbsp;&nbsp;Buy Ticket
          </a>
        </div>
      </div>
    </nav>
  </div>
</header>   
}
