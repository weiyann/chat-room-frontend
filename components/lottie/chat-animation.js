import React from "react";
import Lottie from "react-lottie";
import animationData from "@/public/chat-animation.json";
import { useState } from "react";

export default function ChatAnimation() {
  const [isStopped, setIsStopped] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleAnimationStop = () => {
    setIsStopped(true);
  };

  return (
    <>
      <div style={{ zIndex: 0 }}>
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
          isStopped={isStopped}
          eventListeners={[
            {
              eventName: "complete",
              callback: handleAnimationStop,
            },
          ]}
        />
      </div>
    </>
  );
}
