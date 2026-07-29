import IntroPage from "./intro-page";

interface SectionClientProps {
  onOpen: () => void;
  onZoomStart?: () => void;
}

export default function SectionClient({ onOpen, onZoomStart }: SectionClientProps) {
  const params = new URLSearchParams(window.location.search);
  const rawTo = params.get("to");
  const guestName = rawTo ? decodeURIComponent(rawTo) : "Tamu Undangan";

  return <IntroPage guestName={guestName} onOpen={onOpen} onZoomStart={onZoomStart} />;
}
