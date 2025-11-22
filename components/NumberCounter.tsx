"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface NumberCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function NumberCounter({
  value,
  decimals = 2,
  suffix = "",
  prefix = "",
  duration = 1,
}: NumberCounterProps) {
  // Motion value we animate, and a plain string we actually render.
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 20,
  });
  const [display, setDisplay] = useState(
    Math.abs(value).toFixed(decimals)
  );

  useEffect(() => {
    // Animate towards the new value
    spring.set(value);

    // Subscribe to changes and update local string
    const unsubscribe = spring.on("change", (current) => {
      setDisplay(Math.abs(current).toFixed(decimals));
    });

    return () => {
      unsubscribe();
    };
  }, [spring, value, decimals]);

  return (
    <motion.span>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

