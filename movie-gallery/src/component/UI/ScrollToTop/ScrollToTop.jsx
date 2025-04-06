import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ScrollTop = ({ route }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <Link
      to={route}
      className={`scroll-top ${isVisible ? "" : "disabled"}`}
      onClick={handleClick}
    >
      <i className="fas fa-angle-up" aria-hidden="true" />
    </Link>
  );
};

export default ScrollTop;
