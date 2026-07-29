import { useState, useRef, useEffect } from "react";
import FirstPage from "./first-page";
import DatePage from "./date-page";
import Gallery from "./gallery";
import CommentSection from "./comment";
import Footer from "./footer";
import { FaMusic, FaPause } from "react-icons/fa";
import Gift from "./gits";
import SectionClient from "./SectionClient";
import AmbientScene from "../components/AmbientScene";

export default function SectionPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [heroZoom, setHeroZoom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay failed"));
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked) return;
    const t = setTimeout(() => {
      const target = document.getElementById("firstPage");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
    return () => clearTimeout(t);
  }, [isUnlocked]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full bg-secondary text-gray-800 overflow-hidden relative">
      <audio ref={audioRef} src="/assets/music/music.mp3" loop />

      <SectionClient
        onOpen={() => setIsUnlocked(true)}
        onZoomStart={() => setHeroZoom(true)}
      />

      <FirstPage triggerConfetti={isUnlocked} heroZoom={heroZoom} />
      <DatePage />
      <Gallery />
      <Gift />
      <CommentSection />
      <Footer />

      {isUnlocked && (
        <button
          onClick={toggleMusic}
          className="fixed top-5 right-5 z-50 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <FaPause className="text-lg animate-spin-slow" />
          ) : (
            <FaMusic className="text-lg" />
          )}
        </button>
      )}
    </div>
  );
}
