"use client";
import React, { useState, useEffect } from "react";
import {
  ClimbingBoxLoader,
  GridLoader,
  HashLoader,
  PacmanLoader,
  RingLoader,
  SyncLoader,
} from "react-spinners";

const DEFAULT_COLOR = "#7E22CE";

const spinnerComponents = [
  ClimbingBoxLoader,
  GridLoader,
  HashLoader,
  PacmanLoader,
  RingLoader,
  SyncLoader,
];

function Loading() {
  const [RandomSpinner, setRandomSpinner] = useState(null);

  useEffect(() => {
    const picked =
      spinnerComponents[Math.floor(Math.random() * spinnerComponents.length)];
    setRandomSpinner(() => picked);
  }, []);

  if (!RandomSpinner) return null; // or a fallback

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <RandomSpinner color={DEFAULT_COLOR} size={40} />
    </div>
  );
}

export default Loading;
