import React from "react";
import "./square.scss";
import { color, motion } from "framer-motion";

const Square = ({ value, handleClick, isWinningSquare, winned }) => {
  console.log(isWinningSquare);
  return (
    <motion.div
      whileInView={{ scale: [0, 1], opacity: [0, 1] }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`square ${isWinningSquare ?  "winning-square" : ""} ${winned ? "win":""} ${value==="X"? "x-square":"y-square"}`}
      onClick={handleClick}>
      <motion.p
        className={`${value ? "p-active" : ""} ${
          value === "X" ? "x-sq" : "o-sq"
        }`}>
        {" "}
        {value}
      </motion.p>
    </motion.div>
  );
};

export default Square;
