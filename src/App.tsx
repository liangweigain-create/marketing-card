import { Hero } from "./components/Hero"
import { PainPoints } from "./components/PainPoints"; // <--- Add this
import { FeatureScroll } from "./components/FeatureScroll"; // <--- Add this
import { CtaSection } from "./components/CtaSection";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="p-6 pr-88 pl-20 flex justify-between items-center w-screen">
        <div className="italic text-3xl font-black tracking-tighter text-blue-900">
          建果名片
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 text-xl font-bold">功能</a>
          <a href="#" className="hover:text-blue-600 text-xl font-bold">价格</a>
          <a href="#" className="hover:text-blue-600 text-xl font-bold">关于</a>
        </div>
      </nav>
      <Hero />
      <PainPoints />     {/* <--- Render Here */}
      <FeatureScroll />  {/* <--- Render Here */}
      <CtaSection />
    </div>
  );
}

export default App;