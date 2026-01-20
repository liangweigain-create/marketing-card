import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-20">
      
      {/* 1. 背景增强*/}
      <div className="absolute inset-0 bg-linear-to-b from-blue-100/40 via-blue-50/20 to-white -z-20" />

      <div className="absolute top-0 right-0 w-200 h-200 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* 左侧：文案按钮 */}
          <div className="flex-1 text-center md:text-left space-y-8 md:pl-20">
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
              <Link to="/contact-info" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white bg-(--color-brand-primary) rounded-full hover:bg-blue-800 transition-all font-medium shadow-lg hover:shadow-blue-200">
                免费创建名片
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link to="/pricing" className="inline-flex items-center justify-center px-8 py-3.5 text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all font-medium">
                了解更多
              </Link>
            </div>

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

          {/* 右侧：模型  */}
          <div className="hidden md:block flex-1 relative w-full max-w-md mx-auto md:max-w-none">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10" />    
            {/* 手机边框 */}
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-10 rounded-[2.5rem] h-150 w-75 shadow-2xl">
                <div className="h-7 w-0.75 bg-gray-800 absolute -left-3.25 top-18 rounded-l-lg"></div>
                <div className="h-11.5 w-0.75 bg-gray-800 absolute -left-3.25 top-31 rounded-l-lg"></div>
                <div className="h-11.5 w-0.75 bg-gray-800 absolute -left-3.25 top-44.5 rounded-l-lg"></div>
                <div className="h-16 w-0.75 bg-gray-800 absolute -right-3.25 top-35.5 rounded-r-lg"></div>
                
                {/* 屏幕内容 */}
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                  <div className="bg-slate-50 w-full h-full flex flex-col">
                    {/* 模拟小程序头部 */}
                    <div className="bg-blue-900 h-48 w-full rounded-b-[40px] relative p-6 flex flex-col justify-end">
                       {/* 模拟灵动岛 */}
                       <div className="absolute top-4 left-1/2 -translate-x-1/2 w-26 h-6 bg-black rounded-full z-20 flex items-center justify-end px-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e] shadow-[0_0_1px_rgba(255,255,255,0.2)]"></div>
                       </div>
                       
                       <div className="w-16 h-16 bg-white rounded-full border-4 border-white mb-2 shadow-sm overflow-hidden flex items-center justify-center">
                          {/* 头像 SVG */}
                          <svg className="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                             <circle cx="12" cy="8" r="4" />
                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          </svg>
                       </div>
                       <div className="text-white font-bold text-lg">王建果</div>
                       <div className="text-blue-200 text-sm">产品总监 | 建果科技</div>
                    </div>
                    {/* 模拟内容条 */}
                    <div className="p-6 space-y-3">
                       <div className="h-12 w-full bg-gray-200 rounded-xl shadow-sm border border-slate-100"></div>
                       <div className="h-12 w-full bg-gray-200 rounded-xl shadow-sm border border-slate-100"></div>
                       <div className="h-32 w-full bg-gray-200 rounded-xl shadow-sm border border-slate-100 mt-4"></div>
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