import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  progress: number;
  demo?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  demo = false,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(35);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (demo) {
      interval = setInterval(() => {
        // Simulate infinite animation between 35% and 65%
        setAnimatedProgress((prevProgress) =>
          prevProgress === 70 ? 30 : prevProgress + 1
        );
      }, 50);
    }

    return () => clearInterval(interval);
  }, [demo]);

  const actualProgress = demo ? animatedProgress : progress;

  const progressStyle: React.CSSProperties = {
    width: `${actualProgress}%`,
    backgroundColor: "#b91c1c",
  };

  return (
    <div className="bg-blue-700 h-2 rounded-md overflow-hidden">
      <div
        className="h-full transition-all ease-in-out duration-300"
        style={progressStyle}
      ></div>
    </div>
  );
};

export default ProgressBar;
