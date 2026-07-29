import { useState } from "react";
import { Check, Copy } from "lucide-react";
import SwayingTree from "../components/SwayingTree";

const banks = [
  {
    id: "bca",
    name: "BCA",
    logo: "/assets/images/bca.png",
    number: "700001214811",
    holder: "Komarudin",
  },
  {
    id: "dana",
    name: "DANA",
    logo: "/assets/images/dana.png",
    number: "08573878378",
    holder: "Komarudin",
  },
];

export default function Gift() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, number: string) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section className="w-full bg-secondary pt-24 pb-16 px-4 relative overflow-hidden">
      <div className="absolute -top-20 left-0 w-full z-30 pointer-events-none opacity-90">
        <img
          src="/assets/images/scene_roof.webp"
          alt=""
          className="w-full h-auto object-bottom"
        />
      </div>

      <div className="absolute z-30 -top-8 right-6 opacity-80 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_merak.webp"
          className="w-[100px] md:w-[250px]"
          speed={4}
          intensity={1.8}
          floatY={2}
        />
      </div>

      <div className="absolute z-20 -top-3 -left-22 opacity-100 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_treebush2.webp"
          className="w-[200px] md:w-[250px]"
          speed={8}
          intensity={1}
          floatY={6}
        />
      </div>

      <div className="absolute z-30 -bottom-40 -right-10 opacity-100 pointer-events-none">
        <SwayingTree
          src="/assets/images/scene_wayang4.webp"
          className="w-[150px] md:w-[250px]"
          speed={3}
          intensity={1.2}
          floatY={5}
        />
      </div>

      <div className="max-w-lg mx-auto relative z-20">
        <div className="relative bg-white rounded-3xl shadow-lg shadow-[#A67C52]/15 border-2 border-[#A67C52]/70 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#A67C52]/60 via-[#C4A882]/60 to-[#A67C52]/60" />

          <div className="px-6 pt-10 pb-8 sm:px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <h2
                data-aos="fade-up"
                className="text-center font-Sacramneto text-4xl sm:text-5xl font-bold text-neutral"
              >
                Wedding Gift
              </h2>
            </div>

            <p
              data-aos="fade-up"
              data-aos-delay={100}
              className="text-center text-neutral/50 text-sm leading-relaxed mb-8 mx-auto max-w-sm"
            >
              Doa restu Anda sudah sangat berarti. Jika ingin memberi tanda
              kasih, silakan melalui:
            </p>

            <div className="space-y-3">
              {banks.map((bank, i) => (
                <div
                  key={bank.id}
                  data-aos="fade-up"
                  data-aos-delay={200 + i * 100}
                  className="bg-neutral/5 rounded-2xl p-4 border border-neutral/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-9 flex items-center justify-center bg-white rounded-lg p-1.5 shadow-sm">
                      <img
                        src={bank.logo}
                        alt={bank.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-neutral/40 font-medium uppercase tracking-wider">
                        {bank.name}
                      </p>
                      <p className="text-sm font-semibold text-neutral/70">
                        a/n {bank.holder}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white rounded-xl border border-neutral/10 px-4 py-2.5">
                    <p className="text-sm sm:text-base font-semibold text-neutral tracking-wider font-mono">
                      {bank.number}
                    </p>
                    <button
                      onClick={() => handleCopy(bank.id, bank.number)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap ${
                        copied === bank.id
                          ? "bg-green-100 text-green-700"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {copied === bank.id ? (
                        <>
                          <Check size={14} /> Tersalin
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Salin
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
