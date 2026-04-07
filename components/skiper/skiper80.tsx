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
    <div className="w-full px-8 py-20 md:px-12 md:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] items-start gap-12 xl:gap-20">
        <div className="sticky top-[10vh] hidden w-[42%] xl:block">
          <motion.img
            drag
            style={{
              borderRadius: "25px",
            }}
            layoutId="active-img"
            className="h-auto w-full border border-foreground/10 object-cover"
            src={items[isHoveredIndex].img}
            alt=""
          />
        </div>
        <ul className="ml-auto flex w-full max-w-[520px] flex-col gap-2 pb-20">
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
