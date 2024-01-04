// SpoilerText.tsx
import React, { useEffect, useRef } from "react";
import "./SpoilerText.css";

const SpoilerText: React.FC = () => {
  const hideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hideElement = hideRef.current;

    if (hideElement) {
      for (let i = 0; i < 150; i++) {
        createDot(hideElement);
      }
    }
  }, []);

  const createDot = (hideElement: HTMLDivElement) => {
    const dot = document.createElement("div");
    dot.className = "dot animate-pulse";
    dot.style.top = `${hideElement.offsetHeight * Math.random()}px`;
    dot.style.left = `${hideElement.offsetWidth * Math.random()}px`;
    const size = Math.random() * 0.3;
    dot.style.height = `${size}mm`;
    dot.style.width = `${size}mm`;
    hideElement.appendChild(dot);
  };

  return (
    <div className="center">
      <div className="spoiler">
        <div className="text">Hidden</div>
        <div className="hide" ref={hideRef}></div>
      </div>
    </div>
  );
};

export default SpoilerText;
