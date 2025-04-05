import { useEffect, useRef, useState } from "react";

const FadeTransition = ({
  show,
  showClass = "fadeIn show",
  hideClass = "fadeOut",
  children,
}) => {
  const ref = useRef();
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (show) {
      setShouldRender(true);
      node.classList.remove(...hideClass.split(" "));
      node.classList.add(...showClass.split(" "));
    } else {
      node.classList.remove(...showClass.split(" "));
      node.classList.add(...hideClass.split(" "));

      const handleAnimationEnd = () => {
        setShouldRender(false);
        node.removeEventListener("animationend", handleAnimationEnd);
      };

      node.addEventListener("animationend", handleAnimationEnd);
    }
  }, [show, showClass, hideClass]);

  if (!shouldRender) return null;

  return (
    <div ref={ref} className="animated faster">
      {children}
    </div>
  );
};

export default FadeTransition;