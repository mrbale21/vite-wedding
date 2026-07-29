import { motion } from "framer-motion";
import Lottie from "lottie-react";
import butterflyData from "../assets/lottie/butterfly.json";
import SwayingTree from "../components/SwayingTree";
import { FaInstagram } from "react-icons/fa6";

function Sparkle({ index }: { index: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-30"
      style={{
        width: 2 + (index % 3) * 2,
        height: 2 + (index % 3) * 2,
        left: `${5 + ((index * 23) % 90)}%`,
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
        duration: 3 + (index % 4) * 2,
        repeat: Infinity,
        delay: index * 1.7,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Footer() {
  return (
    <div className="w-full bg-neutral text-white relative overflow-hidden">
      {/* Scene Background */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/assets/images/scene_bg1.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 z-10">
          <img
            src="/assets/images/scene_arch.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute z-20 opacity-70"
          style={{
            bottom: "60px",
            left: "clamp(-30px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang2.webp"
            className="w-[150px] md:w-[250px]"
            speed={6}
            intensity={1.5}
            floatY={4}
          />
        </div>

        <div
          className="absolute z-20 opacity-70"
          style={{
            bottom: "40px",
            right: "clamp(-20px, calc(50% - 360px), 10px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang4.webp"
            className="w-[120px] md:w-[200px]"
            speed={5}
            intensity={1.2}
            floatY={3}
          />
        </div>

        <div
          className="absolute z-[15]"
          style={{ bottom: 0, left: 0, right: 0 }}
        >
          <motion.img
            src="/assets/images/scene_bottom.webp"
            alt=""
            className="w-full h-auto object-bottom"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Butterfly */}
        <motion.div
          className="absolute z-40 pointer-events-none"
          style={{
            right: "20px",
            bottom: "250px",
            width: "50px",
            height: "50px",
            opacity: 0.5,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lottie
            animationData={butterflyData}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[25] bg-gradient-to-b from-black/20 via-transparent to-neutral" />

        {/* Sparkles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Sparkle key={i} index={i} />
        ))}

        {/* Content */}
        <div className="relative z-30 text-center pt-26 px-6 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-white font-Prata text-sm tracking-[0.3em] uppercase">
              Terima Kasih
            </span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-px bg-white/40 mx-auto mb-6"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-Chalisa text-6xl md:text-7xl text-white drop-shadow-lg mb-4"
          >
            Yazid & Eka
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white text-sm font-Prata leading-relaxed mb-6"
          >
            Merupakan suatu kebahagiaan dan kehormatan kami, apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
            kami.
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-Chalisa text-2xl md:text-3xl text-white/80"
          >
            Wassalamualaikum Wr. Wb.
          </motion.h3>
        </div>
      </div>

      {/* Credit */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full py-8 bg-neutral flex flex-col items-center justify-center gap-2 border-t border-white/10"
      >
        <p className="text-[10px] text-white font-Prata tracking-wide">
          Design by Iqbaal_bel
        </p>
        <a
          href="https://instagram.com/iqbaal_bel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </motion.div>
    </div>
  );
}
