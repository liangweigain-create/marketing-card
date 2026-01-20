import { useState, useEffect } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { MobileFixedCta } from "../components/MobileFixedCta";
import { Menu, X } from "lucide-react";

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 禁止背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { to: "/", label: "功能" },
    { to: "/pricing", label: "价格" },
    { to: "/help", label: "帮助中心" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-28 md:pb-0">
      {/* Header: 移动端正常流，PC端固定 */}
      <header className="relative md:fixed md:top-0 md:left-0 md:right-0 z-50 bg-white md:bg-white/95 md:backdrop-blur-sm border-slate-100">
        <nav className="relative px-4 py-4 md:pr-14 md:py-4 flex items-center justify-between w-full max-w-7xl mx-auto">
        
        {/* Logo Area */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link to="/" className="text-2xl md:text-4xl font-black tracking-tighter text-blue-900 z-50">
              建果名片
            </Link>
        </div>

        {/* Mobile Menu Toggle (Absolute Right) */}
        <button 
            className="md:hidden absolute right-4 p-2 text-slate-600 hover:text-blue-600 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-bold hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                            `text-2xl font-bold hover:text-blue-600 transition-colors ${
                                isActive ? "text-blue-600" : "text-slate-800"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>
        )}
        </nav>
      </header>
      
      {/* Main Content - PC端需要 pt 补偿固定 header，移动端不需要 */}
      <main className="md:pt-16">
        <Outlet />
      </main>

      {/* 移动端底部固定 CTA */}
      <MobileFixedCta />
    </div>
  );
};
