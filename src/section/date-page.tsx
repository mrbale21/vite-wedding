import { FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import butterflyData from "../assets/lottie/butterfly.json";
import SwayingTree from "../components/SwayingTree";

export default function DatePage() {
  const events = [
    {
      title: "Akad Nikah",
      date: "Selasa, 18 Agustus 2026",
      time: "10.00 WIB",
      location: "Kediaman Mempelai Wanita",
      icon: "/assets/images/ring.png",
      bg: "/assets/images/image-11.webp",
      href: "https://maps.app.goo.gl/T5Nd8fVFs7gnUs158?g_st=ac",
    },
    {
      title: "Resepsi",
      date: "Selasa, 18 Agustus 2026",
      time: "10.00 WIB",
      location: "Kediaman Mempelai Pria",
      icon: "/assets/images/ring.png",
      bg: "/assets/images/image-9.webp",
      href: "https://maps.app.goo.gl/c8RNM17i4ryVYjAB7?g_st=ac",
    },
  ];

  return (
    <div className="bg-secondary relative flex flex-col items-center text-center overflow-hidden min-h-screen">
      <div className="absolute -top-8 left-0 w-full z-10 pointer-events-none opacity-50">
        <img
          src="/assets/images/scene_flower_top1.webp"
          alt=""
          className="w-full h-auto object-bottom"
        />
      </div>

      {/* <div className="absolute -bottom-50 left-0 w-full z-10 pointer-events-none opacity-40">
        <img
          src="/assets/images/scene_three_top.webp"
          alt=""
          className="w-full h-auto object-top"
        />
      </div> */}

      <div className="absolute top-20 right-5 w-16 h-16 opacity-40 z-10">
        <Lottie
          animationData={butterflyData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        className="absolute bottom-40 left-5 w-12 h-12 opacity-30 z-10"
        style={{ transform: "scaleX(-1)" }}
      >
        <Lottie
          animationData={butterflyData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ top: "90px", right: "clamp(10px, calc(50% - 460px), 40px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <SwayingTree
          src="/assets/images/scene_merak.webp"
          className="w-[80px] md:w-[100px]"
        />
      </motion.div>

      <div className="z-20 w-full flex flex-col items-center py-16 px-4 md:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-Sacramneto text-5xl sm:text-5xl font-bold text-neutral mb-15 z-30 relative"
        >
          Wedding Event
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl perspective-[1200px]">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="relative flex flex-col justify-center items-center rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center group"
              style={{
                backgroundImage: `url(${event.bg})`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-neutral/60 via-neutral/40 to-neutral/70 z-0 group-hover:from-neutral/50 group-hover:via-neutral/30 group-hover:to-neutral/60 transition-all duration-300" />

              <div className="relative z-10 flex flex-col justify-center items-center w-full p-8 md:p-10">
                <motion.img
                  src={event.icon}
                  alt="cincin"
                  className="w-16 md:w-20 mb-4 drop-shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                />
                <h2 className="text-3xl md:text-4xl font-Prata mb-2 text-white drop-shadow-lg">
                  {event.title}
                </h2>
                <h3 className="text-sm md:text-lg font-Prata text-white/90 drop-shadow">
                  {event.date}
                </h3>
                <h4 className="text-sm md:text-lg mb-6 font-Palatino text-white/80 drop-shadow">
                  {event.time}
                </h4>

                <div className="flex w-2/3 md:w-1/2 gap-2 py-6 justify-center items-center">
                  <div className="w-1/2 h-px bg-white/40" />
                  <FaMapMarkedAlt
                    size={28}
                    className="text-white drop-shadow"
                  />
                  <div className="w-1/2 h-px bg-white/40" />
                </div>

                <h3 className="mb-4 font-Palatino text-white/90 text-sm md:text-base drop-shadow">
                  {event.location}
                </h3>
                <motion.a
                  href={event.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center items-center gap-3 bg-white/90 text-neutral py-2.5 px-5 rounded-full w-3/4 md:w-1/2 font-semibold hover:bg-white transition shadow-lg"
                >
                  <FaMapMarkedAlt />
                  GOOGLE MAPS
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
