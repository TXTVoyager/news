import { useEffect } from "react";

function TokenTimeout() {
  const removeTokenAndRedirect = () => { 
    localStorage.clear();
    window.location.href = "/";
  };
  const timeoutPeriod = 30 * 60 * 1000;
  let timer;
  const resetTimeout = () => {
    clearTimeout(timer);
    timer = setTimeout(removeTokenAndRedirect, timeoutPeriod);
  };
  useEffect(() => {
    resetTimeout();
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keypress", resetTimeout);
    document.addEventListener("scroll", resetTimeout);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keypress", resetTimeout);
      document.removeEventListener("scroll", resetTimeout);
    };
  }, []);

  return null;
}

export default TokenTimeout;

