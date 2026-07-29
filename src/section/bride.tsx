import { FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";
import SwayingTree from "../components/SwayingTree";

const Bride: React.FC = () => {
  return (
    <div className="w-full pt-18 pb-4 bg-secondary overflow-hidden md:px-80 relative">
      <div className="absolute -top-8 left-0 w-full z-10 pointer-events-none opacity-40">
        <img
          src="/assets/images/scene_flower_top.webp"
          alt=""
          className="w-full h-auto object-bottom"
          // style={{ maxHeight: "80px" }}
        />
      </div>

      <div className="absolute -bottom-10 left-0 w-full z-10 pointer-events-none opacity-40">
        <img
          src="/assets/images/scene_flower_bottom.webp"
          alt=""
          className="w-full h-auto object-top"
          // style={{ maxHeight: "80px" }}
        />
      </div>

      <motion.div
        className="absolute z-30 bottom-0 -mb-8 opacity-70"
        style={{
          left: "clamp(-40px, calc(50% - 380px), 0px)",
        }}
      >
        <SwayingTree
          src="/assets/images/scene_wayang1.webp"
          className="w-[180px] md:w-[300px]"
          speed={10}
          intensity={2}
          floatY={5}
          floatDelay={0.5}
        />
      </motion.div>

      <motion.div
        className="absolute z-20 bottom-0 -mb-8 opacity-70"
        style={{
          left: "clamp(-40px, calc(50% - 380px), 0px)",
        }}
      >
        <SwayingTree
          src="/assets/images/scene_janur2.webp"
          className="w-[170px] md:w-[300px]"
          speed={4}
          intensity={1.8}
          floatY={3}
          floatDelay={1}
        />
      </motion.div>

      <motion.div
        className="absolute z-10 bottom-0 -mb-8 opacity-60"
        style={{
          left: "clamp(-30px, calc(50% - 380px), 0px)",
        }}
      >
        <SwayingTree
          src="/assets/images/scene_wayang3.webp"
          className="w-[120px] md:w-[300px]"
        />
      </motion.div>

      <div
        data-aos="zoom-in"
        data-aos-delay={100}
        className="grid place-items-center"
      >
        <h2 className="font-Sacramneto text-3xl md:text-5xl font-semibold text-neutral">
          Assalamualaikum Wr. Wb
        </h2>
        <p className=" text-neutral font-Palatino z-10 text-center mt-2 pb-4 px-6 text-sm">
          Dengan memohon Rahmat dan Ridho Allah SWT yang telah menciptakan
          makhluk-Nya secara berpasang-pasangan Kami bermaksud menyelenggarakan
          pernikahan kami
        </p>
      </div>

      <div className="grid-rows-2 grid w-full relative">
        <div
          data-aos="zoom-in"
          data-aos-delay={20}
          className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     h-[400px] w-full z-0 bg-white/80 flex items-center justify-center 
                     rounded-tr-[100px] rounded-bl-[100px]"
        >
          <h1 className="font-Chalisa text-5xl text-primary font-semibold z-20 mt-28">
            &
          </h1>
        </div>

        <div className="-mb-4 z-30 flex flex-col items-start w-full relative">
          <div
            data-aos="fade-right"
            data-aos-delay={20}
            className="relative h-[230px] w-[200px] flex justify-start items-end rounded-tr-[70px] rounded-br-[70px] overflow-hidden z-30"
          >
            <img
              src={"/assets/images/bride-boy.webp"}
              alt="Mempelai Pria"
              className="object-cover object-center h-[200px] w-[350px] bg-contain bg-top flex justify-start items-end rounded-tr-[70px] rounded-br-[70px]"
            />
          </div>
          <div className="p-4 pl-6 flex flex-col items-start w-full z-30">
            <h1
              data-aos="fade-right"
              data-aos-delay={30}
              className="font-Chalisa font-semibold text-3xl text-neutral"
            >
              M. Zakly Yazidur Rizqi (Yazid)
            </h1>
            <p
              data-aos="fade-right"
              data-aos-delay={40}
              className="text-start font-Prata text-ink text-[12px]"
            >
              Putra dari Bapak Aminudin & <br />
              Ibu Siti Rohmah
            </p>
            <a
              href="https://www.instagram.com/yazid_rizqi/"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-left"
              data-aos-delay={40}
              className="relative z-50 text-xs font-semibold p-1 px-2 text-center bg-neutral/90 hover:bg-primary/80 text-white rounded-sm flex items-center gap-1 mt-4"
            >
              <FaInstagram />
              <span>@yazid_rizqi</span>
            </a>
          </div>
        </div>

        <div className="-mt-8 z-20 flex flex-col items-end justify-self-end w-full">
          <div
            data-aos="fade-left"
            data-aos-delay={20}
            className="relative h-[230px] w-[200px] flex items-end rounded-tl-[70px] rounded-bl-[70px] overflow-hidden"
          >
            <img
              src={"/assets/images/bride-girl.webp"}
              alt="Mempelai Wanita"
              className="object-cover object-center h-[200px] w-[350px] flex items-end rounded-tl-[70px] rounded-bl-[70px]"
            />
          </div>
          <div className="p-4 pr-6 flex flex-col items-end ml-10">
            <h1
              data-aos="fade-left"
              data-aos-delay={30}
              className="font-Chalisa font-semibold text-4xl text-neutral"
            >
              Eka Nurlita (Eka)
            </h1>
            <p
              data-aos="fade-left"
              data-aos-delay={35}
              className="text-end font-Prata text-[12px] text-ink"
            >
              Putri dari Bapak Judin (Alm) & <br />
              Ibu Eha
            </p>
            <a
              href="https://www.instagram.com/ekanurlita/"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-left"
              data-aos-delay={40}
              className="text-xs font-semibold p-1 px-2 text-center bg-neutral/90 hover:bg-primary/80 text-white rounded-sm flex items-center gap-1 my-4"
            >
              <FaInstagram />
              <span>@ekanurlita</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bride;
