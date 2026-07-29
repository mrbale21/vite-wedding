import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

type Item = { src: string; alt: string };

const DATA: Item[] = [
  { src: "/assets/images/image-1.webp", alt: "Pembukaan" },
  { src: "/assets/images/image-2.webp", alt: "Cinta Sejati" },
  { src: "/assets/images/image-3.webp", alt: "Kebersamaan" },
  { src: "/assets/images/image-4.webp", alt: "Janji Suci" },
  { src: "/assets/images/image-5.webp", alt: "Harapan Baru" },
  { src: "/assets/images/galery-1.jpg", alt: "Keluarga" },
  { src: "/assets/images/image-6.webp", alt: "Sahabat" },
  { src: "/assets/images/image-7.webp", alt: "Momen Haru" },
  { src: "/assets/images/galery-2.jpg", alt: "Dekorasi" },
  { src: "/assets/images/image-8.webp", alt: "Tamu Istimewa" },
  { src: "/assets/images/image-9.webp", alt: "Resepsi Malam" },
  { src: "/assets/images/galery-3.jpg", alt: "Pengantin" },
  { src: "/assets/images/image-10.webp", alt: "Bahagia" },
  { src: "/assets/images/image-11.webp", alt: "Doa Restu" },
  { src: "/assets/images/galery-4.jpg", alt: "Keluarga Besar" },
  { src: "/assets/images/image-12.webp", alt: "Momen Indah" },
  { src: "/assets/images/image-13.webp", alt: "Selamanya" },
  { src: "/assets/images/image-14.webp", alt: "Terima Kasih" },
];

function Img({
  item,
  index,
  onClick,
}: {
  item: Item;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm active:scale-[0.97] transition-transform duration-150 h-full"
      onClick={onClick}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-white/90 text-[11px] font-medium truncate drop-shadow">
          {item.alt}
        </p>
      </div>
    </motion.div>
  );
}

function Pair({
  a,
  b,
  hd,
}: {
  a: [Item, number, () => void];
  b: [Item, number, () => void];
  hd?: string;
}) {
  return (
    <div className={`flex gap-2 md:hidden ${hd || "h-28 sm:h-32"}`}>
      <div className="flex-1 min-w-0">
        <Img item={a[0]} index={a[1]} onClick={a[2]} />
      </div>
      <div className="flex-1 min-w-0">
        <Img item={b[0]} index={b[1]} onClick={b[2]} />
      </div>
    </div>
  );
}

function Triple({
  a,
  b,
  c,
  hd,
  wa,
}: {
  a: [Item, number, () => void];
  b: [Item, number, () => void];
  c: [Item, number, () => void];
  hd?: string;
  wa?: number;
}) {
  return (
    <div className={`hidden md:flex gap-2 ${hd || "h-36"}`}>
      <div style={{ flex: wa === 0 ? 2 : 1 }} className="min-w-0">
        <Img item={a[0]} index={a[1]} onClick={a[2]} />
      </div>
      <div style={{ flex: wa === 1 ? 2 : 1 }} className="min-w-0">
        <Img item={b[0]} index={b[1]} onClick={b[2]} />
      </div>
      <div style={{ flex: wa === 2 ? 2 : 1 }} className="min-w-0">
        <Img item={c[0]} index={c[1]} onClick={c[2]} />
      </div>
    </div>
  );
}

function Full({
  item,
  index,
  onClick,
  hd,
  cn,
}: {
  item: Item;
  index: number;
  onClick: () => void;
  hd?: string;
  cn?: string;
}) {
  return (
    <div className={`w-full ${hd || "h-36 sm:h-44"} ${cn || ""}`}>
      <Img item={item} index={index} onClick={onClick} />
    </div>
  );
}

function Close() {
  return (
    <div className="w-full h-32 sm:h-40 md:h-56">
      <div className="relative overflow-hidden rounded-lg shadow-sm h-full">
        <img
          src="/assets/images/galery-5.jpg"
          alt="Penutup"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white/90 font-Chalisa text-2xl md:text-4xl drop-shadow-lg">
            Yazid & Eka
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const open = (i: number) => setIdx(i);
  const close = () => setIdx(null);
  const prev = () =>
    idx !== null && setIdx((idx - 1 + DATA.length) % DATA.length);
  const next = () => idx !== null && setIdx((idx + 1) % DATA.length);

  useEffect(() => {
    if (idx === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx]);

  const $ = (i: number) =>
    [DATA[i], i, () => open(i)] as [Item, number, () => void];

  return (
    <div className="bg-secondary relative">
      <div className="absolute -top-24 left-0 w-full z-10 pointer-events-none opacity-80">
        <img
          src="/assets/images/scene_three_top.webp"
          alt=""
          className="w-full h-auto object-bottom"
        />
      </div>

      <div className="relative z-20 text-center px-4 mb-4 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-Sacramneto mt-10 text-5xl sm:text-5xl font-bold text-neutral z-30 relative"
        >
          Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral/50 font-Palatino text-sm sm:text-sm"
        >
          Setiap momen terukir dalam cerita kami
        </motion.p>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-3 pb-12 space-y-2">
        <Pair a={$(0)} b={$(1)} />
        <Triple a={$(0)} b={$(1)} c={$(2)} />

        <Pair a={$(2)} b={$(3)} />
        <Triple a={$(3)} b={$(4)} c={$(5)} wa={0} />

        <Full item={DATA[4]} index={4} onClick={() => open(4)} cn="md:hidden" />

        <Pair a={$(5)} b={$(6)} />
        <Triple a={$(6)} b={$(7)} c={$(8)} />

        <Pair a={$(7)} b={$(8)} />
        <Triple a={$(9)} b={$(10)} c={$(11)} wa={1} />

        <Pair a={$(9)} b={$(10)} />
        <Full
          item={DATA[11]}
          index={11}
          onClick={() => open(11)}
          cn="md:hidden"
        />

        <Pair a={$(12)} b={$(13)} />
        <Triple a={$(12)} b={$(13)} c={$(14)} />

        <Pair a={$(14)} b={$(15)} />
        <Triple a={$(15)} b={$(16)} c={$(17)} wa={1} />

        <Pair a={$(16)} b={$(17)} />

        <Close />
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2"
            onClick={close}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white/60 text-xs font-Prata tracking-wider z-10">
              {String(idx + 1).padStart(2, "0")} /{" "}
              {String(DATA.length).padStart(2, "0")}
            </div>
            <button
              onClick={close}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors z-10 p-2"
            >
              <MdClose size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-6 text-white/50 hover:text-white transition-colors z-10 p-2"
            >
              <MdKeyboardDoubleArrowLeft size={32} />
            </button>
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={DATA[idx].src}
                alt={DATA[idx].alt}
                className="max-h-[80vh] max-w-[95vw] object-contain rounded-lg"
              />
              <p className="text-white/50 text-xs font-Palatino">
                {DATA[idx].alt}
              </p>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-6 text-white/50 hover:text-white transition-colors z-10 p-2"
            >
              <MdKeyboardDoubleArrowRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
