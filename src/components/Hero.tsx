import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 md:pb-28">
      
      {/* 1. 背景增强：从浅蓝到白的渐变，营造氛围 */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-100/40 via-blue-50/20 to-white -z-20" />
      
      {/* 2. 视觉重心：右上角的蓝色光晕，增加科技感 */}
      <div className="absolute top-0 right-0 w-200 h-200 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* 左侧：文案与按钮 */}
          <div className="flex-1 text-center md:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              建果名片 v1.0 现已发布
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              递出专业<br />
              <span className="text-(--color-brand-primary)">收获信任</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              专为微信生态打造的智能名片系统。告别纸质浪费，让每一次商务连接都不仅是交换号码，而是建立信任的开始。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* 主按钮：使用你的品牌色 */}
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white bg-(--color-brand-primary) rounded-full hover:bg-blue-800 transition-all font-medium shadow-lg hover:shadow-blue-200">
                免费创建名片
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* 次按钮 */}
              <button className="inline-flex items-center justify-center px-8 py-3.5 text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all font-medium">
                了解更多
              </button>
            </div>

            {/* 信任背书图标 */}
            <div className="pt-4 flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-start text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 微信原生体验
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 实时数据追踪
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 企业级安全
              </div>
            </div>
          </div>

          {/* 右侧：纯 CSS 画出来的手机模型 (无需图片) */}
          <div className="flex-1 relative w-full max-w-md mx-auto md:max-w-none">
            {/* 手机背后的光晕 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10" />
            
            {/* 手机边框 */}
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-10 rounded-[2.5rem] h-150 w-75 shadow-2xl">
                {/* 手机按键细节 */}
                <div className="h-8 w-0.75 bg-gray-800 absolute -left-4.25 top-18 rounded-l-lg"></div>
                <div className="h-11.5 w-0.75 bg-gray-800 absolute -left-4.25 top-31 rounded-l-lg"></div>
                <div className="h-11.5 w-0.75 bg-gray-800 absolute -left-4.25 top-44.5 rounded-l-lg"></div>
                <div className="h-16 w-0.75 bg-gray-800 absolute -right-4.25 top-35.5 rounded-r-lg"></div>
                
                {/* 屏幕内容 */}
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                  <div className="bg-slate-50 w-full h-full flex flex-col">
                    {/* 模拟小程序头部 */}
                    <div className="bg-blue-900 h-48 w-full rounded-b-[40px] relative p-6 flex flex-col justify-end">
                       <div className="w-16 h-16 bg-white rounded-full border-4 border-white mb-2 shadow-sm"></div>
                       <div className="text-white font-bold text-lg">王建果</div>
                       <div className="text-blue-200 text-sm">产品总监 | 建果科技</div>
                    </div>
                    {/* 模拟内容条 */}
                    <div className="p-6 space-y-3">
                       <div className="h-12 w-full bg-white rounded-xl shadow-sm border border-slate-100"></div>
                       <div className="h-12 w-full bg-white rounded-xl shadow-sm border border-slate-100"></div>
                       <div className="h-32 w-full bg-white rounded-xl shadow-sm border border-slate-100 mt-4"></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}