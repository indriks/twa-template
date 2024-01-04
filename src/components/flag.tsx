import React from "react";

interface FlagProps {
  team: "red" | "blue";
  className?: string;
}

const Flag = (props: FlagProps) => {
  const color = props.team === "red" ? "#ff0000" : "#0000ff";
  return (
    <svg
      className={props.className ? props.className : "w-6 h-6"}
      viewBox="0 0 79 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0.536198V116H7.18261V50.1872C31.1208 36.331 55.0589 64.0435 79 50.1872C79 34.7911 79 19.3978 79 3.99881C55.0618 17.855 31.1237 -9.85453 7.18261 3.99881V0.536198H0Z"
        fill={color}
      />
    </svg>
  );
};

export default Flag;
