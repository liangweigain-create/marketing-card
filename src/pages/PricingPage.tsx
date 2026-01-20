import { Check } from "lucide-react";
import React from 'react';
import { cn } from "../lib/utils";

const CheckIcon = () => (
  <div className="mt-1 shrink-0">
    <Check className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
  </div>
);

const PricingCard = ({
  title,
  price,
  features,
  description,
  isPopular,
  buttonText,
  buttonVariant = "primary",
}: {
  title: string;
  price: string;
  features: string[];
  description: string;
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "primary" | "outline";
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden transition-all hover:shadow-md",
        isPopular && "border-blue-200 bg-linear-to-tr from-blue-50 via-blue-500/5 via-70% to-purple-500/10"
      )}
    >
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-brand mb-2 font-display">{title}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-2">
        <div className="text-4xl font-extrabold text-blue-500 tracking-tight">{price}</div>
        <div className="text-slate-500 text-sm mt-1">起 / 年</div>
      </div>

      <button
        className={cn(
          "w-full py-3 px-6 rounded-full font-bold text-sm mb-8 transition-transform active:scale-95 cursor-pointer",
          buttonVariant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20"
            : "bg-white text-blue-600 border-2 border-slate-200 hover:border-blue-600"
        )}
      >
        {buttonText}
      </button>

      <div className="border-t border-slate-100 my-2" />

      <ul className="flex-1 space-y-4 mt-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PricingPage = () => {
    
    // Placeholder Data
    const plans = [
        {
            title: "个人免费版",
            price: "¥0",
            description: "永久免费使用",
            buttonText: "开始试用",
            buttonVariant: "outline" as const,
            features: [
                "个人建名片",
                "个人用名片（支持微信分享）",
                "我的名片夹：管理收到的建果名片",
                "我的访客：查看名片访问记录",
                "个人简介：个人主要业务介绍"
            ]
        },
        {
            title: "企业标准版",
            price: "¥2000",
            description: "企业统一管理与品牌展示",
            isPopular: true,
            buttonText: "立即购买",
            buttonVariant: "primary" as const,
            features: [
                "企业名片统一设置与分发",
                "企业形象展示（概况、经典案例）",
                "名片数据报表（使用、访问、交换数据）",
                "企业人脉库统一管理",
                "管理层由查看并转发全员名片",
                "包含个人版所有功能"
            ]
        },
        {
            title: "企业品牌版",
            description: "专属定制与深度业务集成",
            price: "¥8000",
            buttonText: "购买咨询",
            buttonVariant: "outline" as const,
            features: [
                "企业专属小程序，全方位展示实力",
                "个性化企业模板，满足不同风格",
                "营销素材库（销售资料维护更新）",
                "API集成（企微、钉钉、飞书等数据互通）",
                "业务联动与项目轻量级协同",
                "覆盖标准版所有功能"
            ]
        }
    ];

  // State for active card index (mobile only)
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to cards on mount with custom offset
  React.useEffect(() => {
    const timer = setTimeout(() => {
        if (scrollRef.current) {
            // Adjust this value to control the vertical scroll offset
            const yOffset = -20; // Scroll 20px above the element
            
            const element = scrollRef.current;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        
        // Let's check the cards positions.
        // We can just rely on built-in logic if we had IntersectionObserver, but scroll listener is fine for small list.
        const containerCenter = scrollLeft + clientWidth / 2;
        const children = scrollRef.current.children;
        let closestIndex = 0;
        let minDistance = Number.MAX_VALUE;

        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const childCenter = child.offsetLeft + child.offsetWidth / 2;
            const distance = Math.abs(containerCenter - childCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }
        setActiveIndex(closestIndex);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4 pt-2 md:pt-0">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                建果名片套餐方案
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                选择最适合您的方案，助力个人品牌提升与企业数字化人脉管理。
            </p>
        </div>

        {/* Pricing Grid */}
        <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar items-start"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar
        >
            {plans.map((plan, i) => (
                <div key={i} className="min-w-[85%] md:min-w-0 snap-center first:pl-2 last:pr-2 md:first:pl-0 md:last:pr-0">
                    <PricingCard {...plan} />
                </div>
            ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
            {plans.map((_, i) => (
                <div 
                    key={i}
                    className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        activeIndex === i ? "bg-blue-600 w-6" : "bg-slate-300"
                    )}
                />
            ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-slate-400 max-w-3xl mx-auto">

        </div>

      </div>
    </div>
  );
};
