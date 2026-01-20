"use client";

import { useState, useEffect, useRef } from 'react';
import { Palette, Share2, BarChart3, ArrowUpRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis,
  YAxis
} from "recharts";

interface VisitorChartProps{
  isActive: boolean
}

const VisitorChart = ({ isActive }: VisitorChartProps) => {
  const data = [
    { name: '周一', visitors: 120 },
    { name: '周二', visitors: 240 },
    { name: '周三', visitors: 180 },
    { name: '周四', visitors: 320 },
    { name: '周五', visitors: 450 },
    { name: '周六', visitors: 380 },
    { name: '周日', visitors: 520 },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-purple-50/50 p-6">
      <div className="flex justify-between items-start mb-6 px-2">
        <div>
          <h4 className="text-2xl font-bold text-purple-900">1,284</h4>
          <p className="text-sm text-purple-600/80 font-medium">本周名片访问量</p>
        </div>
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-green-600 shadow-sm">
          +24% <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {/* 2. 关键点：添加 key 属性
             当 isActive 变化时，key 变化，强制 Recharts 重新执行进场动画 
          */}
          <AreaChart 
            key={isActive ? 'playing' : 'paused'} 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e9d5ff" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9333ea', fontSize: 12, opacity: 0.7 }} 
              dy={10}
            />
            <YAxis 
               axisLine={false}
               tickLine={false}
               tick={{ fill: '#9333ea', fontSize: 12, opacity: 0.5 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ color: '#7e22ce', fontWeight: 'bold' }}
              cursor={{ stroke: '#d8b4fe', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" // 或者 "natural" 
              dataKey="visitors" 
              stroke="#9333ea" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVisitors)" 
              
              /* --- 1. 错峰策略：延迟启动 --- */
              animationBegin={400} 

              /* --- 2. 调整时长 --- */
              animationDuration={1500}

              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const features = [
  {
    id: "edit",
    title: "拖拽式名片设计",
    desc: "无需设计基础，像搭积木一样实时创建、更新您的专业名片。支持自定义企业Logo、品牌配色及排版布局，所见即所得。",
    icon: <Palette className="w-6 h-6 text-blue-600" />,
    visual: (
      <div className="w-full h-full bg-blue-50 flex items-center justify-center">
         <div className="text-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <p className="font-bold text-blue-900">正在编辑名片...</p>
         </div>
      </div>
    )
  },
  {
    id: "share",
    title: "批量导入员工信息",
    desc: "支持Excel/CSV一键导入员工信息，自动生成专属名片。告别手动录入，快速组建销售团队。",
    icon: <Share2 className="w-6 h-6 text-green-600" />,
    visual: (
      <div className="w-full h-full bg-green-50 flex items-center justify-center">
         <div className="text-center">
            <div className="w-24 h-32 bg-white rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center">
                <Share2 className="w-12 h-12 text-green-500" />
            </div>
            <p className="font-bold text-green-900">微信已发送</p>
         </div>
      </div>
    )
  },
  {
    id: "track",
    title: "访客数据实时追踪",
    desc: `不再盲目发名片。谁查看了？谁保存了？系统实时推送通知，帮您锁定高意向客户，把握成交良机。`,
    icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
    visual: <VisitorChart isActive={false} /> 
  }
];

export function FeatureScroll() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveFeature(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } 
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT: Scrolling Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">全流程数字化体验</h2>
              <p className="text-slate-600">从创建到分发，再到获客，建果名片为您提供闭环式服务。</p>
            </div>
            
            <div className="space-y-16 md:space-y-[40vh]"> 
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  data-index={index}
                  ref={el => {sectionRefs.current[index] = el}}
                  className={cn(
                    "transition-all duration-500 p-8 rounded-2xl border-l-4",
                    activeFeature === index 
                      ? "bg-slate-50 border-(--color-brand-primary) opacity-100" 
                      : "border-transparent opacity-30 blur-[1px]"
                  )}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                        {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{feature.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="h-0 md:h-[20vh]" />
          </div>

          {/* RIGHT: Sticky Visual Display (Desktop Only) */}
          <div className="hidden lg:block lg:w-1/2 order-1 lg:order-2">
            <div className="sticky top-20 md:top-24 h-80 md:h-125 w-full bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
                {features.map((feature, index) => (
                  <div 
                    key={feature.id}
                    className={cn(
                        "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out bg-white",
                        activeFeature === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                  >
                    {feature.id === 'track' ? (
                      <VisitorChart isActive={activeFeature === index} />
                    ) : (
                      feature.visual
                    )}
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}