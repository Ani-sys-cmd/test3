import React, { useState, useEffect, useRef } from "react";
import { animated } from "@react-spring/web";

const words = ["Register", "Sign Up"];
let currentWordIndex = 0;
let currentLetterIndex = 0;
let isErasing = false;

const Animation1 = () => {
  const [text, setText] = useState("");
  const [dotPosition, setDotPosition] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isErasing) {
        if (currentLetterIndex < words[currentWordIndex].length) {
          setText(words[currentWordIndex].slice(0, currentLetterIndex + 1));
          currentLetterIndex++;
        } else {
          setTimeout(() => {
            isErasing = true;
          }, 1000);
        }
      } else {
        if (currentLetterIndex > 0) {
          setText(words[currentWordIndex].slice(0, currentLetterIndex - 1));
          currentLetterIndex--;
        } else {
          isErasing = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const textWidth = textElement.offsetWidth;
      const letterWidth = textWidth / text.length || 25;
      setDotPosition(letterWidth * text.length);
    }
  }, [text]);

  return (
    <div className="w-[600px] h-[100px] flex items-center justify-center overflow-hidden mx-auto relative">
      <div className="relative">
        <animated.div
          className="w-3 h-3 bg-blue-500 rounded-full absolute bottom-[-12px] transition-all duration-200"
          style={{
            left: `${dotPosition}px`,
          }}
        />
        <span
          ref={textRef}
          className={`font-mono text-5xl font-bold ${
            words[currentWordIndex] === "Sign Up" ? "text-blue-400" : "text-gray-800"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Animation1;