export default function Footer () {
    return  <footer className="section-text-white footer footer-links bg-darken">
    <div className="footer-body container">
        <div className="row">
            <div className="col-sm-6 col-lg-3">
                <a className="footer-logo" href="./">
                    <span className="logo-element">
                        <span className="logo-tape">
                            <span className="svg-content svg-fill-theme" data-svg="./images/svg/logo-part.svg"></span>
                        </span>
                        <span className="logo-text text-uppercase">
                            <span>M</span>emico</span>
                    </span>
                </a>
                <div className="footer-content">
                    <p className="footer-text">Sidestate NSW 4132,
                        <br/>Australia</p>
                    <p className="footer-text">Call us:&nbsp;&nbsp;(555) 555-0312</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <h5 className="footer-title text-uppercase">Movies</h5>
                <ul className="list-unstyled list-wide footer-content">
                    <li>
                        <a className="content-link" href="#">All Movies</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Upcoming movies</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Top 100 movies</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Blockbasters</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">British movies</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Summer movies collection</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Movie trailers</a>
                    </li>
                </ul>
            </div>
            <div className="col-sm-6 col-lg-3">
                <h5 className="footer-title text-uppercase">Information</h5>
                <ul className="list-unstyled list-wide footer-content">
                    <li>
                        <a className="content-link" href="#">Schedule</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">News</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Contact us</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Community</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Blog</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Events</a>
                    </li>
                    <li>
                        <a className="content-link" href="#">Help center</a>
                    </li>
                </ul>
            </div>
            <div className="col-sm-6 col-lg-3">
                <h5 className="footer-title text-uppercase">Follow</h5>
                <ul className="list-wide footer-content list-inline">
                    <li className="list-inline-item">
                        <a className="content-link" href="#"><i className="fab fa-slack-hash"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="content-link" href="#"><i className="fab fa-twitter"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="content-link" href="#"><i className="fab fa-facebook-f"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="content-link" href="#"><i className="fab fa-dribbble"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="content-link" href="#"><i className="fab fa-google-plus-g"></i></a>
                    </li>
                    <li className="list-inline-item">
                        <a className="content-link" href="#"><i className="fab fa-instagram"></i></a>
                    </li>
                </ul>
                <h5 className="footer-title text-uppercase">Subscribe</h5>
                <div className="footer-content">
                    <p className="footer-text">Get latest movie news right away with our subscription</p>
                    <form className="footer-form" autocomplete="off">
                        <div className="input-group">
                            <input className="form-control" name="email" type="email" placeholder="Your email" />
                            <div className="input-group-append">
                                <button className="btn btn-theme" type="submit"><i className="fas fa-angle-right"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className="footer-copy">
        <div className="container">Copyright 2019 &copy; AmigosThemes. All rights reserved.</div>
    </div>
</footer>
}