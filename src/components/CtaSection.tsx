import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    // 1. 去掉了原有的 bg-(--color-brand-primary)，因为我们要用图片做背景
    <section className="relative overflow-hidden flex flex-col justify-center items-center min-h-150">
      
      {/* --- 新增部分：背景图片层 --- */}
      {/* blur-[3px]: 微微模糊 (数字越大越糊) */}
      {/* scale-110: 关键！图片放大1.1倍，防止因为模糊导致四周出现白边 */}
      <div className="absolute inset-0 bg-[url('/business_1.png')] bg-cover bg-center blur-[3px] scale-110"></div>
      
      {/* --- 新增部分：深色遮罩层 --- */}
      {/* 加上这一层深蓝色半透明遮罩，才能保证上面的白字清晰可见 */}
      {/* 你可以将 bg-blue-900 换成你的品牌色，/85 代表 85% 不透明度 */}
      <div className="absolute inset-0 bg-black/75 mix-blend-multiply"></div>

      {/* --- 原有内容 (保持不变) --- */}
      <div className="container mx-auto px-4 relative z-10 text-center flex-1 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          升级您的商务形象
        </h2>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          使用建果名片，让每一次递出名片都成为一次成功的开始。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-(--color-brand-primary) bg-white rounded-full hover:bg-blue-50 transition-all font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1">
            立即免费创建
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="inline-flex items-center justify-center px-8 py-4 text-white border border-blue-400/50 bg-blue-800/20 backdrop-blur-sm rounded-full hover:bg-blue-800/40 transition-all font-medium">
            联系企业定制
          </button>
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