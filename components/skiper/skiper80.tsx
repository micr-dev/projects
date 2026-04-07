"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

interface Skiper80Props {
  titles: string[];
}

const placeholderImages = [
  "/images/oct25Coll/skiperpro/shoreel-9.png",
  "/images/oct25Coll/skiperpro/shoreel-8.png",
  "/images/oct25Coll/skiperpro/shoreel-4.png",
  "/images/oct25Coll/skiperpro/shoreel-5.png",
];

const Skiper80 = ({ titles }: Skiper80Props) => {
  const [isHoveredIndex, setIsHoveredIndex] = useState(0);

  const items = titles.map((title, index) => ({
    title,
    img: placeholderImages[index % placeholderImages.length],
  }));

  return (
    <div className="flex min-h-screen w-screen justify-center py-32">
      <div className="w-full">
        <div className="fixed left-[15%] top-[10%] -translate-x-1/2">
          <motion.img
            drag
            style={{
              borderRadius: "25px",
            }}
            layoutId="active-img"
            className="h-50 aspect-video border border-foreground/10 object-cover"
            src={items[isHoveredIndex].img}
            alt=""
          />
        </div>
        <ul className="ml-auto mr-[10%] flex w-fit flex-col gap-2 pt-[42vh] pb-[20vh]">
          <li className="flex w-full items-center gap-3 text-sm uppercase opacity-50">
            my Projects
            <span className="bg-foreground h-px flex-1"></span>
          </li>
          {items.map((item, index) => (
            <motion.li
              layoutId={`text-header-${index}`}
              key={item.title}
              style={{
                opacity: isHoveredIndex == index ? 1 : 0.5,
              }}
              className="relative flex w-fit cursor-pointer items-center text-4xl tracking-tighter"
              onMouseEnter={() => setIsHoveredIndex(index)}
            >
              {item.title}{" "}
              {isHoveredIndex === index && (
                <motion.div
                  initial={{ x: 10, width: "15px", height: "0px" }}
                  animate={{ x: 10, width: "4px", height: "4px" }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="bg-foreground absolute left-full rounded-full"
                ></motion.div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skiper80;
