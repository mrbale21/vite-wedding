import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SpecialDayProps {
  targetDate: string | Date;
}

type CornerPos = "tl" | "tr" | "br" | "bl";

const timeUnits = [
  { key: "days" as const, label: "Hari" },
  { key: "hours" as const, label: "Jam" },
  { key: "minutes" as const, label: "Menit" },
  { key: "seconds" as const, label: "Detik" },
];

const C = {
  primary: "#4A6FA5",
  primaryLight: "#C7D5E8",
  primaryDark: "#1E3A5F",
  cream: "#F7F5EF",
};

function CornerFlourish({ position }: { position: CornerPos }) {
  const rotations: Record<CornerPos, number> = {
    tl: 0,
    tr: 90,
    br: 180,
    bl: 270,
  };
  const styles: Record<
    CornerPos,
    { top?: number; bottom?: number; left?: number; right?: number }
  > = {
    tl: { top: -10, left: -10 },
    tr: { top: -10, right: -10 },
    br: { bottom: -10, right: -10 },
    bl: { bottom: -10, left: -10 },
  };
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      style={{
        position: "absolute" as const,
        ...styles[position],
        transform: `rotate(${rotations[position]}deg)`,
      }}
    >
      <path
        d="M2 30V6C2 3.79 3.79 2 6 2H30"
        stroke={C.primary}
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      <circle cx="2" cy="30" r="2" fill={C.primary} opacity="0.85" />
      <circle cx="30" cy="2" r="1.2" fill={C.primaryLight} opacity="0.5" />
    </svg>
  );
}

function DecorativeDot({ index }: { index: number }) {
  const positions = [
    { top: "20%", left: "8%" },
    { top: "65%", left: "5%" },
    { top: "35%", right: "7%" },
    { top: "75%", right: "9%" },
  ];
  const pos = positions[index % positions.length];
  const size = 2 + (index % 3);
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        ...pos,
        width: size,
        height: size,
        background: C.primaryLight,
        opacity: 0.35,
      }}
      animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
      transition={{
        duration: 3 + (index % 2),
        repeat: Infinity,
        delay: index * 0.8,
      }}
    />
  );
}

function GlowRing() {
  return (
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        border: "1px solid rgba(74,111,165,0.12)",
        boxShadow:
          "inset 0 0 60px rgba(74,111,165,0.06), 0 0 80px rgba(74,111,165,0.04)",
      }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Separator() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center self-stretch px-1">
      <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#4A6FA5]/40 to-transparent" />
      <div className="relative flex items-center justify-center my-1">
        <div className="w-2 h-2 rotate-45 border border-[#4A6FA5]/80" />
      </div>
      <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#4A6FA5]/40 to-transparent" />
    </div>
  );
}

function TimeCard({
  value,
  label,
  index: _i,
}: {
  value: number;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: _i * 0.12 }}
      className="flex flex-col items-center gap-2 px-1.5 md:px-3"
    >
      <div className="relative flex flex-col items-center">
        <motion.span
          key={value}
          initial={{ scale: 1.15, opacity: 0, y: -5 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="text-4xl md:text-5xl lg:text-6xl font-normal leading-none tracking-wide"
          style={{
            fontFamily: "'Cormorant Garamond', 'Palatino', serif",
            color: C.cream,
            textShadow:
              "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(74,111,165,0.2)",
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
        <motion.div
          className="h-px w-8 md:w-10 mt-1.5 rounded-full"
          style={{
            background: `linear-gradient(to right, transparent, ${C.primaryLight}80, transparent)`,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: _i * 0.3 }}
        />
      </div>
      <span
        className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-normal"
        style={{
          fontFamily: "'Prata', serif",
          color: "rgba(199,213,232,0.7)",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: "100%",
            fontSize: `${8 + i * 4}px`,
            color: C.primaryLight,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -120 - i * 40, -200 - i * 60],
            x: [0, i % 2 === 0 ? 10 : -10, i % 2 === 0 ? 20 : -20],
            opacity: [0, 0.25, 0],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

const SpecialDay = ({ targetDate }: SpecialDayProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date();
      return difference > 0
        ? {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }
        : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  if (!isClient || !timeLeft) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Prata&display=swap');
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-6 mt-36"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <motion.svg
            width="36"
            height="10"
            viewBox="0 0 36 10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ transformOrigin: "right center" }}
          >
            <path
              d="M0 5H28M28 5L22 1M28 5L22 9"
              stroke={C.primary}
              strokeWidth="0.8"
              opacity="0.7"
              fill="none"
            />
            <circle cx="30" cy="5" r="1.5" fill={C.primary} opacity="0.5" />
          </motion.svg>
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.4em] text-white"
            style={{
              fontFamily: "'Prata', serif",
              textShadow:
                "0 1px 6px rgba(0,0,0,0.5), 0 0 20px rgba(74,111,165,0.1)",
            }}
          >
            Menuju Hari Bahagia
          </motion.span>
          <motion.svg
            width="36"
            height="10"
            viewBox="0 0 36 10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ transformOrigin: "left center" }}
          >
            <path
              d="M36 5H8M8 5L14 1M8 5L14 9"
              stroke={C.primary}
              strokeWidth="0.8"
              opacity="0.7"
              fill="none"
            />
            <circle cx="6" cy="5" r="1.5" fill={C.primary} opacity="0.5" />
          </motion.svg>
        </div>

        <motion.div
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="absolute rounded-2xl -inset-x-5 -inset-y-4 md:-inset-x-12 md:-inset-y-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(74,111,165,0.3)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.3), 0 0 40px rgba(74,111,165,0.05)",
            }}
          />
          <GlowRing />
          <CornerFlourish position="tl" />
          <CornerFlourish position="tr" />
          <CornerFlourish position="bl" />
          <CornerFlourish position="br" />
          <DecorativeDot index={0} />
          <DecorativeDot index={1} />
          <DecorativeDot index={2} />
          <DecorativeDot index={3} />
          <FloatingHearts />

          <div className="relative flex items-stretch gap-1 md:gap-2 px-5 py-6 md:px-11 md:py-8">
            {timeUnits.map((unit, i) => (
              <div key={unit.key} className="flex items-stretch">
                {i > 0 && <Separator />}
                <TimeCard
                  value={timeLeft[unit.key]}
                  label={unit.label}
                  index={i}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SpecialDay;
