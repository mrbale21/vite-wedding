import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
  useSpring,
} from "framer-motion";
import { useRef, forwardRef } from "react";
import Lottie from "lottie-react";
import birdsData from "../assets/lottie/birds.json";
import butterflyData from "../assets/lottie/butterfly.json";
import SwayingTree from "../components/SwayingTree";

function useParallax(value: MotionValue<number>, distance: number, stiffness = 100, damping = 30) {
  return useSpring(useTransform(value, [0, 1], [0, distance]), {
    stiffness,
    damping,
    restDelta: 0.001,
  });
}

const Scene3D = forwardRef<HTMLDivElement>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = ref || containerRef;

  const { scrollYProgress } = useScroll({
    target: innerRef as React.RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });

  const bgY = useParallax(scrollYProgress, 40, 80, 40);
  const archY = useParallax(scrollYProgress, 60);
  const treesY = useParallax(scrollYProgress, 50);
  const treesY2 = useParallax(scrollYProgress, 35, 120, 20);
  const birdsOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div
      ref={innerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 w-full h-[120vh]">
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <img
            src="/assets/images/scene_bg1.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 flex items-start justify-center pt-12 md:pt-20"
          style={{ opacity: birdsOpacity }}
        >
          <div className="w-full max-w-lg">
            <Lottie
              animationData={birdsData}
              loop
              autoplay
              style={{ width: "100%", height: "28vh" }}
            />
          </div>
        </motion.div>

        <motion.div className="absolute inset-0 z-20" style={{ y: archY }}>
          <motion.img
            src="/assets/images/scene_arch.webp"
            alt=""
            className="w-full h-full object-top"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="absolute z-30 opacity-80"
          style={{
            bottom: "90px",
            left: "clamp(-40px, calc(50% - 380px), 0px)",
            y: treesY,
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang_flower.webp"
            className="w-[220px] md:w-[300px]"
            speed={6}
            intensity={1.2}
            floatY={4}
          />
        </motion.div>

        <motion.div
          className="absolute z-20 opacity-80"
          style={{
            bottom: "90px",
            left: "clamp(-100px, calc(50% - 380px), 0px)",
            y: treesY,
          }}
        >
          <SwayingTree
            src="/assets/images/scene_janur.webp"
            className="w-[220px] md:w-[300px]"
            speed={7}
            intensity={2}
            floatY={5}
            floatDelay={0.5}
          />
        </motion.div>

        <motion.div
          className="absolute z-40 opacity-80"
          style={{
            bottom: "90px",
            left: "clamp(110px, calc(50% - 380px), 0px)",
            y: treesY,
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang_golek2.webp"
            className="w-[110px] md:w-[300px]"
            speed={4}
            intensity={1.8}
            floatY={3}
            floatDelay={1}
          />
        </motion.div>

        <motion.div
          className="absolute z-40 opacity-80"
          style={{
            bottom: "220px",
            right: "clamp(90px, calc(50% - 380px), 0px)",
            y: treesY2,
          }}
        >
          <SwayingTree
            src="/assets/images/scene_bird.webp"
            className="w-[100px] md:w-[300px]"
            speed={3.5}
            intensity={2.5}
            floatY={8}
            floatDelay={1.5}
          />
        </motion.div>

        <motion.div
          className="absolute z-30 opacity-80"
          style={{
            bottom: "50px",
            right: "clamp(-30px, calc(50% - 360px), 10px)",
            y: treesY,
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang4.webp"
            className="w-[150px] md:w-[200px]"
            speed={5.5}
            intensity={1}
            floatY={3}
            floatDelay={0.8}
          />
        </motion.div>

        <motion.div
          className="absolute z-[15]"
          style={{
            bottom: "120px",
            left: 0,
            right: 0,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src="/assets/images/scene_bottom.webp"
            alt=""
            className="w-full h-auto object-bottom"
            animate={{ rotate: [0, 0.5, -0.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div
          className="absolute z-40"
          style={{
            right: "max(15px, calc(50% + 240px))",
            bottom: "220px",
            width: "65px",
            height: "65px",
            opacity: 0.4,
          }}
        >
          <Lottie
            animationData={butterflyData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
});

Scene3D.displayName = "Scene3D";
export default Scene3D;
