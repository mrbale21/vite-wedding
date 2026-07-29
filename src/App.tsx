import AOSProvider from "./AOSProvider";
import BrowserCheck from "./section/browser-check";
import SectionPage from "./section/SectionPage";

export default function App() {
  return (
    <AOSProvider>
      <BrowserCheck />
      <SectionPage />
    </AOSProvider>
  );
}
