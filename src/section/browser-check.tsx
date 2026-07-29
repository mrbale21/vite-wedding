import { useEffect, useState } from "react";

export default function BrowserCheck() {
  const [isOldBrowser, setIsOldBrowser] = useState(false);

  useEffect(() => {
    const supportsModernCSS =
      CSS.supports("display", "grid") &&
      CSS.supports("position", "sticky") &&
      typeof window.fetch === "function";
    if (!supportsModernCSS) {
      setIsOldBrowser(true);
    }
  }, []);

  if (!isOldBrowser) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Browser Anda sudah usang
      </h1>
      <p className="text-white mb-6">
        Website ini membutuhkan browser modern untuk tampil dengan baik. <br />
        Mohon gunakan versi terbaru dari Chrome, Edge, Safari, atau Firefox.
      </p>
      <a
        href="https://www.whatbrowser.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
      >
        Perbarui Browser
      </a>
    </div>
  );
}
