import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Shell from "./components/layout/Shell";
import Home from "./pages/Home";
import ChapterPage from "./pages/ChapterPage";
import Timeline from "./pages/Timeline";
import Glossary from "./pages/Glossary";
import TheoryMapPage from "./pages/TheoryMapPage";

export default function App() {
  const location = useLocation();

  return (
    <Shell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/chapter/:slug" element={<ChapterPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/theory-map" element={<TheoryMapPage />} />
        </Routes>
      </AnimatePresence>
    </Shell>
  );
}
