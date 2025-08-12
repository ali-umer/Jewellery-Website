"use client";
import { motion } from "motion/react";
import React from "react";

export const LoaderThree = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className="h-45 w-45 stroke-[var--(gold)]"
    >
      <motion.text
        x="10"
        y="70"
        fontSize="64"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        stroke="currentColor"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: "linear", // smooth, constant speed
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        PJ
      </motion.text>
    </motion.svg>
  );
};
