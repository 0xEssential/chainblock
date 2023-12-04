import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import Slideshow from "./Slideshow";

const Display = ({}: {}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <div className="w-[100vw] h-[100vh]">
        <Slideshow flip={() => setIsFlipped(true)} />
      </div>
      <div className="flex flex-col items-center justify-center text-4xl text-white w-[100vw] h-[100vh]">
        <p onClick={() => setIsFlipped(false)}>Settings</p>
      </div>
    </ReactCardFlip>
  );
};

export default Display;
