import { useEffect, useState, useRef } from "react";
import { IoMdMailOpen } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import confetti, { type Options } from "canvas-confetti";
import Lottie from "lottie-react";
import scrollData from "../assets/lottie/scroll-down.json";
import Scene3D from "./Scene3D";

function Sparkle({ index }: { index: number }) {
  const size = 2 + (index % 3) * 2;
  const left = 5 + ((index * 23) % 90);
  const delay = index * 1.7;
  const duration = 3 + (index % 4) * 2;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-30"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        background: "#fff",
        boxShadow: "0 0 4px #fff, 0 0 8px rgba(255,255,255,0.4)",
      }}
      animate={{
        y: [0, -20 - (index % 5) * 10, -10, -30 - (index % 3) * 8, 0],
        x: [0, 5 - (index % 3) * 3, -5, 3, 0],
        opacity: [0, 0.8, 0.4, 0.9, 0],
        scale: [0, 1, 0.6, 1.2, 0],
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

interface IntroPageProps {
  onOpen: () => void;
  onZoomStart?: () => void;
  guestName: string;
}

export default function IntroPage({
  onOpen,
  onZoomStart,
  guestName,
}: IntroPageProps) {
  const [phase, setPhase] = useState<"idle" | "zooming" | "done">("idle");
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("zooming");
    onZoomStart?.();

    setTimeout(() => {
      setPhase("done");
      onOpen();

      if (typeof window !== "undefined") {
        const fireConfetti = (particleRatio: number, opts: Options) => {
          confetti({
            ...opts,
            particleCount: Math.floor(250 * particleRatio),
            spread: 80,
            startVelocity: 45,
            origin: { y: 0.6 },
            colors: ["#4A6FA5", "#8FA8C7", "#C7D5E8", "#F7F5EF", "#1E3A5F"],
          });
        };
        fireConfetti(0.25, { angle: 60 });
        fireConfetti(0.25, { angle: 120 });
        setTimeout(() => fireConfetti(0.2, { angle: 90 }), 200);
        setTimeout(() => fireConfetti(0.3, { angle: 60 }), 400);
        setTimeout(() => fireConfetti(0.3, { angle: 120 }), 600);
      }
    }, 1600);
  };

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  return (
    <section
      id="intro"
      className="h-screen text-white relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 origin-bottom"
        animate={
          phase === "zooming"
            ? { scale: 1.5, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.6, ease: [0.45, 0, 0.1, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <Scene3D ref={sceneRef} />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 35%, rgba(30,58,95,0.10) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 10%, rgba(30,58,95,0.25) 100%)
          `,
        }}
        animate={phase === "zooming" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <motion.div
        className="absolute z-[15] pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "90%",
          maxWidth: "560px",
          height: "400px",
          transform: "translate(-50%, -50%)",
        }}
        animate={
          phase === "zooming"
            ? { opacity: 0, scale: 0.8 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-b from-white/40 via-white/25 to-white/10 blur-[70px] rounded-full"
          animate={
            phase === "idle"
              ? { scale: [1, 1.08, 1], opacity: [0.8, 0.5, 0.8] }
              : {}
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="relative z-20 flex  flex-col items-center justify-center h-full px-4 pt-24"
        animate={
          phase === "zooming"
            ? { y: -80, opacity: 0, scale: 0.9 }
            : { y: 0, opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "idle"
              ? { opacity: 1, y: [0, -3, 0] }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: 0.8,
            delay: 0.3,
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
          className="pt-16 text-sm md:text-sm font-Prata font-semibold mb-2 tracking-[0.3em] uppercase"
          style={{
            textShadow: "0 1px 6px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.15)",
          }}
        >
          Save The Date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={
            phase === "idle"
              ? { opacity: 1, y: [0, -4, 0] }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: 0.8,
            delay: 0.5,
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
          }}
          className="text-6xl md:text-7xl font-Chalisa text-white mb-2"
          style={{
            textShadow: "0 2px 12px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
          }}
        >
          Yazid & Eka
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-32 h-px bg-white/50 mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-Garamond text-base md:text-base font-smeibold text-white/90 mb-1"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            phase === "idle"
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-2xl md:text-2xl font-Garamond font-semibold text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
        >
          {guestName}
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "idle"
              ? { opacity: 1, y: [0, -2, 0] }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: 0.6,
            delay: 1.3,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.94 }}
          onClick={handleOpen}
          className="mt-6 bg-white/90 backdrop-blur-sm flex items-center gap-2 cursor-pointer text-neutral px-7 py-3 rounded-full hover:bg-white font-Palatino font-semibold transition text-sm shadow-xl"
        >
          <motion.span
            animate={phase === "idle" ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <IoMdMailOpen size={18} />
          </motion.span>{" "}
          Buka Undangan
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {phase === "idle" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-12 h-12"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Lottie
                  animationData={scrollData}
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </motion.div>
            </motion.div>

            {Array.from({ length: 8 }).map((_, i) => (
              <Sparkle key={i} index={i} />
            ))}
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
