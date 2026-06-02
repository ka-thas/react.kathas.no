import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"

  useEffect(() => {
    if (navType !== "POP") window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
}

export default ScrollToTop;
