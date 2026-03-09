import { Routes, Route, useLocation } from "react-router-dom";
import { Stamp } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ContributePage } from "./contribute/ContributePage";
import { ChatContributePage } from "./contribute/chat/ChatContributePage";

function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isChatPage = location.pathname === "/contribute/chat";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/contribute/chat" element={<ChatContributePage />} />
        </Routes>
      </main>

      {!isChatPage && (
        <footer className="border-t border-slate-200 bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2.5 mb-4 md:mb-0">
              <Stamp className="w-4.5 h-4.5 text-indigo-500" />
              <div className="font-semibold text-lg tracking-tight text-slate-900">
                Code<span className="text-indigo-500">Passport</span>
              </div>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Open source &middot; MIT License
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
