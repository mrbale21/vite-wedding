import { motion } from "framer-motion";
import { Users, Footprints, HeartHandshake } from "lucide-react";
import SwayingTree from "../components/SwayingTree";

const stories = [
  {
    title: "Awal Pertemuan",
    description:
      "Awal pertemuan di masa sekolah mengenal satu sama lain. Kami sering berbagi cerita dan canda di sela sela waktu luang. Dari perjalanan sederhana itu. Tumbur kenyaman yg mnghadirkan kisah indah bagi kami berdua.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Perjalanan Bersama",
    description:
      "Di setiap hari libur, kami meluangkan waktu untuk berjalan bersama, menikmati makanan favorit, dan berbincang tentang masa depan. Dari setiap pertemuan, hadir banyak momen hangat yang semakin menguatkan hubungan kami.",
    icon: <Footprints className="w-8 h-8" />,
  },
  {
    title: "Komitmen",
    description:
      "Cinta kami tumbuh perlahan namun penuh keyakinan. Setelah melewati banyak cerita bersama, kami memutuskan untuk melangkah ke tahap yang lebih indah, mengikat janji suci dan menjalani masa depan bersama.",
    icon: <HeartHandshake className="w-8 h-8" />,
  },
];

function ConnectingArrow({
  isLeft,
  index,
}: {
  isLeft: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.35 + 0.6 }}
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+20px)] z-10 flex flex-col items-center"
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.35 + 0.7 }}
        style={{ transformOrigin: "top center" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-primary/30" />
        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          initial={{ y: -5, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.35 + 1 }}
          className="text-primary"
        >
          <path
            d={
              isLeft
                ? "M4 14 Q14 10 20 18 L24 14 M20 18 L24 22"
                : "M24 14 Q14 10 8 18 L4 14 M8 18 L4 22"
            }
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <circle
            cx={isLeft ? 22 : 6}
            cy={isLeft ? 16 : 16}
            r="1.5"
            fill="currentColor"
            opacity="0.4"
          />
          {[1, 2].map((i) => (
            <circle
              key={i}
              cx={isLeft ? 14 - i * 3 : 14 + i * 3}
              cy={isLeft ? 12 + i * 2 : 12 + i * 2}
              r="1"
              fill="currentColor"
              opacity={0.2 - i * 0.05}
            />
          ))}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

const LoveStoryZigzag: React.FC = () => {
  return (
    <div className="bg-secondary relative pt-24 pb-20 overflow-hidden">
      <div className="absolute -top-8 left-0 w-full z-10 pointer-events-none opacity-60">
        <img
          src="/assets/images/scene_flower_top.webp"
          alt=""
          className="w-full h-auto object-bottom"
        />
      </div>

      <div className="absolute -bottom-10 left-0 w-full z-10 pointer-events-none opacity-70">
        <img
          src="/assets/images/scene_flower_bottom.webp"
          alt=""
          className="w-full h-auto object-top"
        />
      </div>

      <div className="absolute z-20 -right-10 bottom-180 opacity-70 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_janur.webp"
          className="w-[150px] md:w-[250px]"
          speed={8}
          intensity={1.5}
          floatY={4}
        />
      </div>

      <div className="absolute z-20 bottom-160 left-6 opacity-70 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_bird.webp"
          className="w-[120px] md:w-[250px]"
          speed={8}
          intensity={1.5}
          floatY={4}
        />
      </div>

      {/* <div className="absolute z-20 bottom-80 left-0 opacity-50 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_wayang4.webp"
          className="w-[100px] md:w-[250px]"
          speed={8}
          intensity={1.5}
          floatY={4}
        />
      </div> */}

      <div className="absolute z-20 bottom-40 -right-8 opacity-70 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_wayang4.webp"
          className="w-[130px] md:w-[220px]"
          speed={6}
          intensity={1.8}
          floatY={3}
        />
      </div>

      <h1
        data-aos="fade-right"
        data-aos-delay={10}
        className="text-center font-Sacramneto text-5xl sm:text-5xl font-bold text-neutral mb-16 z-30 relative"
      >
        Our Love Story
      </h1>

      <div className="relative max-w-4xl mx-auto w-full px-4">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px " />

        {stories.map((story, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: isLeft ? -80 : 80,
                rotateY: isLeft ? 15 : -15,
              }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: index * 0.35,
                type: "spring",
                stiffness: 80,
              }}
              className={`relative w-full mb-24 flex ${
                isLeft ? "justify-start" : "justify-end"
              } perspective-[1000px]`}
            >
              <div className="relative w-[85%] sm:w-2/4 px-2 md:px-4">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotateY: isLeft ? 3 : -3,
                    transition: { duration: 0.3 },
                  }}
                  className="p-5 md:p-6 rounded-2xl shadow-xl bg-white text-neutral border border-neutral/10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {story.icon}
                    </div>
                    <h2 className="text-lg md:text-2xl font-bold">
                      {story.title}
                    </h2>
                  </div>
                  <p className="text-xs md:text-base leading-relaxed opacity-90">
                    {story.description}
                  </p>
                </motion.div>

                <motion.div
                  className="absolute top-6 z-10 flex items-center"
                  style={{
                    left: isLeft ? "calc(90% + 8px)" : undefined,
                    right: isLeft ? undefined : "calc(90% + 8px)",
                    flexDirection: isLeft ? "row" : "row-reverse",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.35 + 0.3 }}
                >
                  <div
                    className={`h-px w-6 ${isLeft ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-primary/40 to-transparent`}
                  />
                  <div className="relative flex items-center justify-center w-7 h-7 -ml-px -mr-px">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <div className="absolute inset-0.5 rounded-full bg-primary/30" />
                    <div className="absolute inset-1 rounded-full bg-primary border-2 border-white" />
                  </div>
                </motion.div>

                {index < stories.length - 1 && (
                  <ConnectingArrow isLeft={isLeft} index={index} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LoveStoryZigzag;
