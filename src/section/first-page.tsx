import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Bride from "./bride";
import LoveStoryZigzag from "./love-story";
import SpecialDay from "./special-day";
import Confetti from "react-confetti";
import SwayingTree from "../components/SwayingTree";

interface FirstPageProps {
  triggerConfetti?: boolean;
  heroZoom?: boolean;
}

export default function FirstPage({
  triggerConfetti,
  heroZoom,
}: FirstPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (triggerConfetti) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [triggerConfetti]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={500}
          gravity={0.5}
        />
      )}

      <motion.div
        id="firstPage"
        className="parallax relative flex flex-col items-center text-center min-h-screen text-white overflow-hidden z-10 bg-secondary"
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{
          scale: heroZoom ? 1 : 1.5,
          opacity: heroZoom ? 1 : 0,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/image-4.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* <motion.div
          className="absolute inset-0 z-10 flex items-start justify-center pt-12 md:pt-20"
          animate={{ opacity: heroZoom ? 0.4 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="w-full max-w-lg">
            <img
              src="/assets/images/scene_arch.webp"
              alt=""
              className="w-full h-auto"
            />
          </div>
        </motion.div> */}

        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-black/15 to-black/60" />

        <div
          className="absolute z-[3] pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: "85%",
            maxWidth: "500px",
            height: "320px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-white/25 via-white/15 to-transparent blur-[60px] rounded-full" />
        </div>

        <div className="relative z-[5] flex flex-col items-center justify-center flex-1 w-full px-4 ">
          <p className="text-lg font-Prata mb-2 md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Save The Date
          </p>
          <h2 className="text-6xl mb-10 font-Chalisa md:text-8xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            Yazid &amp; Eka
          </h2>
          <SpecialDay targetDate="2026-08-18T10:00:00" />
        </div>

        <div className="absolute top-0 left-0 w-full z-[6] opacity-90">
          <img
            src="/assets/images/scene_top.webp"
            className="w-full h-auto object-bottom"
          />
        </div>
        <div className="absolute -bottom-8 left-0 w-full z-[6] opacity-50">
          <img
            src="/assets/images/scene_flower_top.webp"
            className="w-full h-auto object-bottom -scale-y-100"
          />
        </div>
        <div className="absolute -bottom-20 -left-8 w-full z-20 opacity-70">
          <SwayingTree
            src="/assets/images/scene_wayang3.webp"
            className="w-[100px]"
            speed={4}
            intensity={1.8}
            floatY={3}
            floatDelay={1}
          />
        </div>
        <div className="absolute -bottom-18 left-2 w-full z-30 opacity-80">
          <SwayingTree
            src="/assets/images/scene_wayang3.webp"
            className="w-[110px]"
            speed={7}
            intensity={2}
            floatY={5}
            floatDelay={0.5}
          />
        </div>
        <div className="absolute -bottom-20 left-16 w-full z-10 opacity-70">
          <SwayingTree
            src="/assets/images/scene_wayang3.webp"
            className="w-[100px]"
            speed={6}
            intensity={1.2}
            floatY={4}
          />
        </div>
        <div className="absolute -bottom-12 left-6 w-full z-20 opacity-80">
          <SwayingTree
            src="/assets/images/scene_flower.webp"
            className="w-[150px]"
            speed={3.5}
            intensity={2.5}
            floatY={8}
            floatDelay={1.5}
          />
        </div>
      </motion.div>

      <Bride />

      {/* <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 390"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150"
      >
        <path
          d="M 0,400 L 0,100 C 64.08953015168332,89.4027870267604 128.17906030336664,78.80557405352077 175,78 C 221.82093969663336,77.19442594647923 251.37328893821677,86.18049081267729 295,96 C 338.6267110617832,105.81950918732271 396.3277839437662,116.47246269577013 453,109 C 509.6722160562338,101.52753730422987 565.3155752867185,75.92965840424219 624,76 C 682.6844247132815,76.07034159575781 744.4099149093598,101.80890368726108 795,107 C 845.5900850906402,112.19109631273892 885.0447650758418,96.83472684671354 931,95 C 976.9552349241582,93.16527315328646 1029.4110247872734,104.8521889258848 1094,109 C 1158.5889752127266,113.1478110741152 1235.3111357750647,109.75651744974721 1295,107 C 1354.6888642249353,104.24348255025279 1397.3444321124675,102.1217412751264 1440,100 L 1440,400 L 0,400 Z"
          stroke="none"
          strokeWidth="0"
          fill="#4A6FA5"
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
        ></path>
        <path
          d="M 0,400 L 0,233 C 47.949636206683934,229.88262424466643 95.89927241336787,226.76524848933286 147,215 C 198.10072758663213,203.23475151066714 252.35254655321245,182.821630287335 305,195 C 357.64745344678755,207.178369712665 408.69054137378225,251.94823036132692 466,257 C 523.3094586262177,262.0517696386731 586.8852879516586,227.38544826735728 639,209 C 691.1147120483414,190.61455173264272 731.7683068195832,188.50997656924403 790,188 C 848.2316931804168,187.49002343075597 924.0414847700088,188.5746454556665 972,201 C 1019.9585152299912,213.4253545443335 1040.0657541003823,237.1914416080898 1094,242 C 1147.9342458996177,246.8085583919102 1235.6954988284624,232.65958811197436 1299,228 C 1362.3045011715376,223.34041188802564 1401.1522505857688,228.17020594401282 1440,233 L 1440,400 L 0,400 Z"
          stroke="none"
          strokeWidth="0"
          fill="#4A6FA5"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-1"
        ></path>
      </svg> */}

      <div className="max-h-auto bg-primary/80 text-white pb-14 -mt-1 flex flex-col items-center z-40 relative">
        <motion.div className="absolute inset-0 z-0">
          <img
            src="/assets/images/image-7.webp"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-16 bg-white z-0" />

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-30 left-0 w-full z-50 pointer-events-none opacity-90"
        >
          <img
            src="/assets/images/scene_roof.webp"
            alt=""
            className="w-full h-auto object-bottom"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 w-full z-30 pointer-events-none opacity-60"
        >
          <img
            src="/assets/images/scene_flower_top.webp"
            alt=""
            className="w-full h-auto object-bottom"
          />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 1.5, -1.5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 top-0 bottom-0 -left-16 opacity-90 pointer-events-none w-[100px] md:w-[160px]"
        >
          <img
            src="/assets/images/scene_side.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, -1.2, 1.2, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 top-0 bottom-0 -right-16 opacity-90 pointer-events-none w-[100px] md:w-[160px]"
        >
          <img
            src="/assets/images/scene_side.webp"
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        </motion.div>

        <motion.div
          className="absolute z-30 opacity-80"
          style={{
            bottom: "-90px",
            left: "clamp(-50px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang2.webp"
            className="w-[120px] md:w-[300px]"
            speed={6}
            intensity={1.5}
            floatY={4}
            floatDelay={0.3}
          />
        </motion.div>

        <motion.div
          className="absolute z-20 opacity-70"
          style={{
            bottom: "-90px",
            left: "clamp(10px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang3.webp"
            className="w-[90px] md:w-[300px]"
            speed={8}
            intensity={1.8}
            floatY={3}
            floatDelay={0.7}
          />
        </motion.div>

        <motion.div
          className="absolute z-40 opacity-70"
          style={{
            bottom: "-80px",
            left: "clamp(8px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_merak.webp"
            className="w-[80px] md:w-[300px]"
            speed={4}
            intensity={2.5}
            floatY={6}
            floatDelay={0.2}
          />
        </motion.div>

        <motion.div
          className="absolute z-30 opacity-70"
          style={{
            bottom: "-80px",
            left: "clamp(26px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_flower.webp"
            className="w-[120px] md:w-[300px]"
            speed={9}
            intensity={1}
            floatY={2}
            floatDelay={0.9}
          />
        </motion.div>

        <motion.div
          className="absolute z-30 opacity-70"
          style={{
            bottom: "-90px",
            right: "clamp(-50px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang2.webp"
            className="w-[120px] md:w-[300px]"
            speed={5}
            intensity={2.2}
            floatY={5}
            floatDelay={1.2}
          />
        </motion.div>

        <motion.div
          className="absolute z-20 opacity-70"
          style={{
            bottom: "-90px",
            right: "clamp(10px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang_flower.webp"
            className="w-[150px] md:w-[300px]"
            speed={7}
            intensity={1.5}
            floatY={3.5}
            floatDelay={0.4}
          />
        </motion.div>

        <motion.div
          className="absolute z-40 opacity-70"
          style={{
            bottom: "-80px",
            right: "clamp(8px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_wayang_golek.webp"
            className="w-[100px] md:w-[300px]"
            speed={3}
            intensity={3}
            floatY={7}
            floatDelay={0.1}
          />
        </motion.div>

        <motion.div
          className="absolute z-30 opacity-70"
          style={{
            bottom: "-80px",
            right: "clamp(90px, calc(50% - 380px), 0px)",
          }}
        >
          <SwayingTree
            src="/assets/images/scene_flower.webp"
            className="w-[120px] md:w-[300px]"
            speed={10}
            intensity={1.2}
            floatY={2.5}
            floatDelay={0.6}
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 left-0 w-full z-10 pointer-events-none opacity-60"
        >
          <img
            src="/assets/images/scene_flower_bottom.webp"
            alt=""
            className="w-full h-auto object-top"
          />
        </motion.div>
        <h2
          data-aos="fade-up"
          data-aos-delay={10}
          className="text-3xl mb-4 mt-26 font-Chalisa md:text-6xl mt-14 z-50"
        >
          Bissmillahirrohmanirrohim
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay={10}
          className="font-Palatino px-14 text-center md:w-1/2 text-sm md:text-lg pb-8"
        >
          {`"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
  pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
  dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
  kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat
  tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."`}
          <br />
          <br />
          (Qs. Ar-Rum Ayat 21)
        </p>
      </div>

      <LoveStoryZigzag />
    </>
  );
}
