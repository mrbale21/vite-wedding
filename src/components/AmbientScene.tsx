import { useScroll, useTransform, motion } from "framer-motion";
import Lottie from "lottie-react";
import birdsData from "../assets/lottie/birds.json";
import butterflyData from "../assets/lottie/butterfly.json";

function Petal({ index }: { index: number }) {
  const size = 7 + (index % 4) * 5;
  const left = 3 + (index * 13) % 94;
  const delay = index * 1.1;
  const duration = 9 + (index % 6) * 2;
  const palette = ["#C7D5E8", "#8FA8C7", "#F7F5EF", "#4A6FA5"];
  const color = palette[index % palette.length];

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size * 1.3,
        left: `${left}%`,
        background: color,
        opacity: 0.2 + (index % 4) * 0.12,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
      }}
      animate={{
        y: [0, -25, -55, -35, -75, -45, -95],
        x: [0, 12, -8, 18, -12, 8, 0],
        rotate: [0, 25, -15, 40, -25, 10, 0],
        opacity: [0.3, 0.45, 0.25, 0.45, 0.15, 0.35, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingFlower({ index }: { index: number }) {
  const size = 5 + (index % 5) * 3;
  const left = 10 + (index * 19) % 80;
  const delay = index * 1.8;
  const duration = 11 + (index % 4) * 3;
  const palette = ["#F7F5EF", "#C7D5E8", "#8FA8C7", "#F7F5EF"];
  const color = palette[index % palette.length];

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        background: color,
        opacity: 0.15 + (index % 3) * 0.1,
        boxShadow: `0 0 ${size * 2}px ${color}40`,
      }}
      animate={{
        y: [0, -15, -35, -20, -50, -30, -65],
        x: [0, 8, -6, 12, -8, 4, 0],
        scale: [1, 1.15, 0.85, 1.1, 0.9, 1, 0.95],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function AmbientScene() {
  const { scrollYProgress } = useScroll();
  const birdsOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.8], [0, 0.35, 0.25, 0]);
  const butterflyOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.9], [0, 0.25, 0.2, 0]);

  return (
    <>
      <motion.div
        className="fixed top-10 left-0 w-full pointer-events-none z-[60]"
        style={{ opacity: birdsOpacity }}
      >
        <div className="max-w-md mx-auto">
          <Lottie
            animationData={birdsData}
            loop
            autoplay
            style={{ width: "100%", height: "18vh" }}
          />
        </div>
      </motion.div>

      <motion.div
        className="fixed z-[60] pointer-events-none"
        style={{
          right: "20px",
          bottom: "200px",
          width: "55px",
          height: "55px",
          opacity: butterflyOpacity,
        }}
      >
        <Lottie
          animationData={butterflyData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

      <div className="fixed inset-0 z-[55] pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Petal key={`petal-${i}`} index={i} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingFlower key={`flower-${i}`} index={i} />
        ))}
      </div>

      <div
        className="fixed bottom-0 left-0 w-full h-24 pointer-events-none z-[59]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(30,58,95,0.12))",
        }}
      />
    </>
  );
}
