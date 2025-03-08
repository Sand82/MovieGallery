import { Link } from "react-router-dom";

export default function Footer () {
    return  <footer className="section-text-white footer footer-links bg-darken">
    <div className="footer-body container">
        <div className="row">
            <div className="col-sm-6 col-lg-3">
                <Link className="footer-logo" to="/">
                    <span className="logo-element">
                        <span className="logo-tape">
                            <span className="svg-content svg-fill-theme" data-svg="./images/svg/logo-part.svg"></span>
                        </span>
                        <span className="logo-text text-uppercase">
                            Movie Gallery</span>
                    </span>
                </Link>
                <div className="footer-content">
                    <p className="footer-text">Hristo Botev 15, Sofia,
                        <br/>Bulgaria</p>
                    <p className="footer-text">Call us:&nbsp;&nbsp;(+359) 888 411 621</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <h5 className="footer-title text-uppercase">Movies</h5>
                <ul className="list-unstyled list-wide footer-content">
                    <li>
                        <Link className="content-link" to="/movies">Movies</Link>
                    </li>                    
                    <li>
                        <Link className="content-link" to="/underconstruction">Upcoming movies</Link>
                    </li>
                    <li>
                        <Link className="content-link" to="/underconstruction">Blockbasters</Link>
                    </li>                    
                    <li>
                        <Link className="content-link" to="/underconstruction">Summer movies collection</Link>
                    </li>
                    <li>
                        <Link className="content-link" to="/underconstruction">Movie trailers</Link>
                    </li>
                </ul>
            </div>
            <div className="col-sm-6 col-lg-3">
                <h5 className="footer-title text-uppercase">Information</h5>
                <ul className="list-unstyled list-wide footer-content">
                    <li>
                        <Link className="content-link" to="/underconstruction">News</Link>
                    </li>
                    <li>
                        <Link className="content-link" to="/contactus">Contact us</Link>
                    </li>                    
                    <li>
                        <Link className="content-link" to="/underconstruction">Blog</Link>
                    </li>
                    <li>
                        <Link className="content-link" to="/underconstruction">Events</Link>
                    </li>
                    <li>
                        <Link className="content-link" to="/underconstruction">Help center</Link>
                    </li>
                </ul>
            </div>
            <div className="col-sm-6 col-lg-3">
                <h5 className="footer-title text-uppercase">Follow</h5>
                <ul className="list-wide footer-content list-inline">
                    <li className="list-inline-item">
                        <Link className="content-link" to="/underconstruction"><i className="fab fa-slack-hash"></i></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="content-link" to="/underconstruction"><i className="fab fa-twitter"></i></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="content-link" to="/underconstruction"><i className="fab fa-facebook-f"></i></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="content-link" to="/underconstruction"><i className="fab fa-dribbble"></i></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="content-link" to="/underconstruction"><i className="fab fa-google-plus-g"></i></Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="content-link" to="/underconstruction"><i className="fab fa-instagram"></i></Link>
                    </li>
                </ul>               
            </div>
        </div>
    </div>
    <div className="footer-copy">
        <div className="container">Copyright 2022 &copy; AmigosThemes. All rights reserved.</div>
    </div>
</footer>
}