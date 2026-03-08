import { Github, Stamp } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <Stamp className="w-5 h-5 text-indigo-500" />
          <div className="font-semibold text-xl tracking-tight text-slate-900" style={{ fontFamily: "'General Sans', sans-serif" }}>
            Code<span className="text-indigo-500">Passport</span>
          </div>
        </a>
        
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
            How it works
          </a>
<a 
            href="https://github.com/fkb032/code-passport" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
