import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CtaSection() {
  return (
    <section className="bg-gray-900 relative overflow-hidden flex flex-col justify-center items-center min-h-150">
      
      <div className="container mx-auto px-4 relative z-10 text-center flex-1 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          升级您的商务形象
        </h2>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          使用建果名片，让每一次递出名片都成为一次成功的开始。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact-info" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-(--color-brand-primary) bg-white rounded-full hover:bg-blue-50 transition-all font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1">
            立即免费创建
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/contact-info" className="inline-flex items-center justify-center px-8 py-4 text-white border border-blue-400/50 bg-blue-800/20 backdrop-blur-sm rounded-full hover:bg-blue-800/40 transition-all font-medium">
            联系企业定制
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-blue-200 opacity-80">
          无需下载 App • 微信扫码即用 • 基础功能永久免费
        </p>
      </div>
      <div className="h-24 text-center pt-8 text-slate-400 z-10 justify-self-end">
        &copy; 2025 Jianguo Card
      </div>
    </section>
  );
}