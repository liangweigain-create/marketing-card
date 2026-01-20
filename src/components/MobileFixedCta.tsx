import { Headset, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MobileFixedCta() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 px-4 py-3 pb-4 safe-area-pb shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3 h-12">
        
        <Link to="/contact-info" className="flex flex-col items-center justify-center w-1/4 gap-0.5 text-slate-600 active:scale-95 transition-transform">
          <div className="relative">
             <Headset className="w-6 h-6" />
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-[10px] font-medium scale-90">预约顾问</span>
        </Link>

        <Link to="/contact-info" className="flex-1 h-full bg-(--color-brand-primary) text-white rounded-full font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-1">
          联系我们
          <ArrowRight className="w-4 h-4 opacity-50" />
        </Link>
      </div>
    </div>
  );
}
