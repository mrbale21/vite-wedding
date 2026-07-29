import { useScroll, useTransform, motion } from "framer-motion";
import Lottie from "lottie-react";
import birdsData from "../assets/lottie/birds.json";
import butterflyData from "../assets/lottie/butterfly.json";

function Petal({ index }: { index: number }) {
  const size = 8 + (index % 3) * 6;
  const left = 5 + (index * 17) % 90;
  const delay = index * 1.3;
  const duration = 8 + (index % 5) * 2;
  const color = index % 2 === 0 ? "#C7D5E8" : "#8FA8C7";

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size * 1.3,
        left: `${left}%`,
        background: color,
        opacity: 0.3 + (index % 3) * 0.15,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
      }}
      animate={{
        y: [0, -30, -60, -40, -80, -50, -100],
        x: [0, 15, -10, 20, -15, 10, 0],
        rotate: [0, 30, -20, 45, -30, 15, 0],
        opacity: [0.4, 0.5, 0.3, 0.5, 0.2, 0.4, 0],
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

export default function FloatingElements() {
  const { scrollYProgress } = useScroll();
  const birdsOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.8], [0, 0.4, 0.3, 0]);
  const butterflyOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.9], [0, 0.3, 0.25, 0]);

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
            style={{ width: "100%", height: "20vh" }}
          />
        </div>
      </motion.div>

      <motion.div
        className="fixed z-[60] pointer-events-none"
        style={{
          right: "20px",
          bottom: "200px",
          width: "60px",
          height: "60px",
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
        {Array.from({ length: 12 }).map((_, i) => (
          <Petal key={i} index={i} />
        ))}
      </div>
    </>
  );
}
