import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from "../../lib/utils";
import { HELP_ENTRY_CARDS } from './config/help.config';

const HelpCard = ({ 
    to, 
    icon: Icon, 
    title, 
    description,
}: { 
    to: string; 
    icon: React.ElementType; 
    title: string; 
    description: string;
}) => (
  <Link to={to} className="group block relative p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={cn("absolute top-0 right-0 w-32 h-32 bg-linear-to-br opacity-10 rounded-bl-full transition-transform group-hover:scale-110")} />
    
    <div className="relative z-10">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors", 'bg-blue-600/10 text-blue-600')}>
            <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors flex items-center gap-2">
            {title}
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
            {description}
        </p>
        
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            点击查阅文档
        </div>
    </div>
  </Link>
);

export const HelpPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Hero Search Section */}
      <div className="bg-white pb-16 pt-12 md:pb-24 md:pt-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 to-white pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                嗨，有什么可以帮你？
            </h1>
            
            <div className="relative max-w-xl mx-auto group">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-200 to-purple-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-white rounded-xl shadow-lg flex items-center p-2">
                    <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                    <input 
                        type="text" 
                        placeholder="输入关键词，如：加入企业、名片设置、审批" 
                        className="w-full px-4 py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                    />
                </div>
            </div>
            
            <div className="flex gap-4 justify-center text-sm text-slate-500">
                <span>热门搜索：</span>
                {/* mock data */}
                <Link to="/help/manager" className="hover:text-blue-600 underline decoration-slate-300 hover:decoration-blue-600 underline-offset-4">企业认证</Link>
                <Link to="/help/start" className="hover:text-blue-600 underline decoration-slate-300 hover:decoration-blue-600 underline-offset-4">如何创建名片</Link>
                <Link to="/help/market" className="hover:text-blue-600 underline decoration-slate-300 hover:decoration-blue-600 underline-offset-4">访客数据</Link>
            </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="flex items-center gap-2 mb-6 ml-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-lg font-bold text-slate-900">帮助中心</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {HELP_ENTRY_CARDS.map((card, index) => (
                <HelpCard key={index} {...card} />
            ))}
        </div>
      </div>
      
      <div className="mt-20 text-center">
            <Link to="/contact-info" className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100 text-slate-600 text-sm font-medium hover:text-blue-600 hover:border-blue-100 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span>还需要帮助？联系人工客服</span>
            </Link>
      </div>
    </div>
  );
};

