"use client";

import { motion } from "framer-motion";
import { BookOpen, CircleArrowOutUpRight } from "lucide-react";
import React, { useState } from "react";

const Skiper80 = () => {
  const [isHoveredIndex, setIsHoveredIndex] = useState(0);
  const [isItemActive, setIsItemActive] = useState<number | null>(null);

  const items = [
    {
      title: "Skiper OSS 001",
      img: "/images/oct25Coll/skiperpro/shoreel-9.png",
    },
    {
      title: "NeonSync Pro",
      img: "/images/oct25Coll/skiperpro/shoreel-8.png",
    },
    {
      title: "PixelForge Studio",
      img: "/images/oct25Coll/skiperpro/shoreel-8.png",
    },
    {
      title: "TaskFlow Sonet",
      img: "/images/oct25Coll/skiperpro/shoreel-4.png",
    },
    {
      title: "CloudVibe Bruh",
      img: "/images/oct25Coll/skiperpro/shoreel-5.png",
    },
  ];

  return (
    <div className="flex min-h-screen w-screen justify-center py-32">
      {isItemActive == null ? (
        <>
          <motion.img
            drag
            style={{
              borderRadius: "25px",
            }}
            layoutId="active-img"
            className="h-50 border-foreground/10 fixed left-[15%] top-[10%] aspect-video -translate-x-1/2 border object-cover"
            src={items[isHoveredIndex].img}
            alt=""
          />
          <ul className="fixed bottom-[20%] right-[10%] flex flex-col gap-2">
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
                onClick={() => setIsItemActive(index)}
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
        </>
      ) : (
        <div onClick={() => setIsItemActive(null)} className="w-full">
          <div className="mx-auto flex flex-col items-center justify-center gap-12">
            <div className="w-full max-w-xl space-y-12">
              <div className="font-cal-sans relative h-24 text-7xl font-medium">
                <motion.h1
                  className="absolute"
                  layoutId={`text-header-${isItemActive}`}
                >
                  {items[isHoveredIndex].title}
                </motion.h1>
              </div>
              <motion.img
                layoutId="active-img"
                style={{
                  borderRadius: "25px",
                }}
                src={items[isHoveredIndex].img}
                alt=""
                className="h-84 w-full object-cover"
              />
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.25,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="mx-auto w-full max-w-xl"
                transition={{ type: "spring" as const, stiffness: 50, damping: 10 }}
              >
                <Section1 />
                <AboutSection />
                <CTAButtons />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

const Section1 = () => (
  <section className="w-full">
    <div className="flex items-center gap-2">
      <h1 className="text-foreground text-2xl font-semibold tracking-tight">
        Billion Dollar Saas
      </h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          delay: 0.35,
          duration: 0.5,
        }}
        className="bg-foreground h-0.5 flex-1 origin-left rounded-full"
      />
    </div>
  </section>
);

const AboutSection = () => (
  <div className="text-foreground/50 mt-4 flex flex-col gap-2">
    <p className="text-sm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati id
      natus dignissimos totam at incidunt ipsam odio consequatur ducimus!
    </p>
    <p className="text-sm">
      placeat assumenda. Saepe repellendus delectus minima ullam facilis
      laboriosam facere harum quas laudantium voluptate corrupti reiciendis
      ipsa, odio repudiandae ab accusantium dicta rerum rem?
    </p>
    <p className="text-sm leading-6">
      Want to create something cool together? Let&apos;s do it!
    </p>
  </div>
);

const CTAButtons = () => (
  <div className="mt-10 flex items-center gap-2.5">
    <a
      href="#"
      className="bg-foreground text-background flex h-9 items-center gap-2 rounded-xl px-3 text-sm"
    >
      Live Preview <CircleArrowOutUpRight className="size-3.5" />
    </a>

    <a
      href="#"
      className="bg-background flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-medium"
    >
      See Source Code <BookOpen className="size-3.5" />
    </a>
  </div>
);

export default Skiper80;
