"use client";
import { useEffect } from "react";

export function useLazyTawk() {
  useEffect(() => {
    let loaded = false;

const loadTawk = () => {
  if (loaded) return;
  loaded = true;

  const script = document.createElement("script");
  script.src = "https://embed.tawk.to/586380cfddb8373fd2b4a378/default";
  script.async = true;
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.body.appendChild(script);
};

const handleUserIntent = () => {
  loadTawk();
  window.removeEventListener("mousemove", handleUserIntent);
  window.removeEventListener("scroll", handleUserIntent);
  window.removeEventListener("touchstart", handleUserIntent);
};

window.addEventListener("mousemove", handleUserIntent);
window.addEventListener("scroll", handleUserIntent);
window.addEventListener("touchstart", handleUserIntent);

return () => {
  window.removeEventListener("mousemove", handleUserIntent);
  window.removeEventListener("scroll", handleUserIntent);
  window.removeEventListener("touchstart", handleUserIntent);
};
  }, []);
}

