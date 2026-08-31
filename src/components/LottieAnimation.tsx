"use client";

import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

export default function LottieAnimation({ 
  animationPath, 
  className, 
  style,
  loop = true
}: { 
  animationPath: string, 
  className?: string, 
  style?: React.CSSProperties,
  loop?: boolean 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: loop,
      autoplay: false,
      path: animationPath,
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animationRef.current?.goToAndPlay(0, true);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationPath, loop]);

  return <div ref={containerRef} className={className} style={style} />;
}
