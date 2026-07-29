import { motion } from "framer-motion";

interface SwayingTreeProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  intensity?: number;
  floatY?: number;
  floatDelay?: number;
}

export default function SwayingTree({
  src,
  className,
  style,
  speed = 5,
  intensity = 1.5,
  floatY = 0,
  floatDelay = 0,
}: SwayingTreeProps) {
  return (
    <motion.img
      src={src}
      alt=""
      className={className}
      style={style}
      animate={{
        rotate: [0, intensity, -intensity, 0],
        y: floatY ? [0, -floatY, 0] : 0,
      }}
      transition={{
        rotate: {
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: speed * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
      }}
    />
  );
}
