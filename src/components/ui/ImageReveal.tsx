"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  delay = 0,
  priority = false,
  fill = false,
  width,
  height,
  sizes = "100vw",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={shouldReduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
        transition={{ duration: 0.9, delay, ease: "easeInOut" }}
        className="h-full w-full"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.1, delay, ease: "easeInOut" }}
          className="h-full w-full"
        >
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={cn("object-cover", imageClassName)}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width ?? 1200}
              height={height ?? 800}
              sizes={sizes}
              priority={priority}
              className={cn("w-full object-cover", imageClassName)}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
