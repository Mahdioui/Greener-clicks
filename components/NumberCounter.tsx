"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

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
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.abs(current).toFixed(decimals)
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

