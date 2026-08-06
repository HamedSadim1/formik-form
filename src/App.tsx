import Forum from "@/components/Forum";
import { PAGE_TITLE_ID } from "@/utils/constants";

function App() {
  // main-landmark: geeft screenreader-gebruikers een directe sprong naar de
  // hoofdinhoud en een correcte documentstructuur. De accessible name verwijst
  // naar de h1 in Forum, zodat de landmark herkenbaar wordt aangekondigd.
  return (
    <main aria-labelledby={PAGE_TITLE_ID} className="w-full max-w-md mx-auto px-4 py-10 sm:px-6">
      <Forum />
    </main>
  );
}

export default App;
