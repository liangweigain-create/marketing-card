import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { 
  getCategoryById, 
  getSidebarByCategory, 
  type HelpCategory,
  type SidebarItem as SidebarItemType
} from '../config/help.config';

// ============================================================================
// 侧边栏导航项组件
// ============================================================================
interface SidebarItemProps {
  item: SidebarItemType;
  categoryId: HelpCategory['id'];
  isActive: boolean;
}

const SidebarItem = ({ item, categoryId, isActive }: SidebarItemProps) => (
  <Link 
    to={`/help/${categoryId}/${item.slug}`}
    className={cn(
      "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors cursor-pointer group",
      isActive 
        ? "bg-blue-50 text-blue-600 font-medium" 
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <span>{item.label}</span>
    {item.hasSubmenu && (
      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
    )}
  </Link>
);

// ============================================================================
// 侧边栏组件
// ============================================================================
interface SidebarProps {
  categoryId: HelpCategory['id'];
  currentSlug?: string;
}

const Sidebar = ({ categoryId, currentSlug }: SidebarProps) => {
  const category = getCategoryById(categoryId);
  const sections = getSidebarByCategory(categoryId);
  
  if (!category) return null;
  
  const Icon = category.icon;
  
  return (
    <div className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r border-slate-100 overflow-y-auto py-8 px-6 bg-white">
      {/* 返回链接 + 分类标题 */}
      <div className="mb-8">
        <Link 
          to="/help" 
          className="flex items-center text-sm text-slate-500 hover:text-blue-600 mb-4 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
          返回帮助中心
        </Link>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-250 pb-4">
          <Icon className={cn("w-5 h-5", category.iconColor)} />
          {category.title}
        </h2>
      </div>

      {/* 导航菜单 - 从配置读取 */}
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem 
                  key={item.slug}
                  item={item}
                  categoryId={categoryId}
                  isActive={currentSlug === item.slug}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 目录组件 (TOC)
// ============================================================================
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
}

const TableOfContents = ({ items, activeId }: TableOfContentsProps) => {
  // 始终渲染容器保持布局稳定，避免内容加载时的跳动
  return (
    <div className="hidden xl:block w-64 shrink-0 h-[calc(100vh-64px)] sticky top-16 py-12 pr-8">
      {items.length > 0 && (
        <>
          <div className="mb-4 text-xs font-bold text-slate-900 uppercase tracking-wider">
            本页目录
          </div>
          <div className="space-y-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm py-1 border-l-2 pl-4 transition-colors",
                  activeId === item.id
                    ? "border-blue-600 text-blue-600 font-medium"
                    : "border-slate-100 text-slate-500 hover:text-slate-800 hover:border-slate-200"
                )}
              >
                {item.text}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================================
// 主布局组件
// ============================================================================
interface HelpDocLayoutProps {
  children: React.ReactNode;
  category: HelpCategory['id'];
  currentSlug?: string;
  toc?: TocItem[];
}

export const HelpDocLayout = ({ 
  children, 
  category, 
  currentSlug,
  toc = [] 
}: HelpDocLayoutProps) => {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const handleScroll = () => {
      // 仅监听一级标题 (h2)，忽略子标题 (h3)
      const headings = Array.from(document.querySelectorAll('h2'));
      if (headings.length === 0) return;

      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. 触底检测：如果滚动到底部，直接激活最后一个标题
      // Using a small threshold (e.g. 50px) to ensure it triggers near bottom
      if (scrollY + innerHeight >= documentHeight - 50) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      // 2. 遍历查找当前所在的章节
      // 我们寻找"最后一个"满足"距离顶部小于特定阈值"的标题
      // 阈值设为 100px (大约导航栏高度 + 一点余量)
      let currentId = headings[0].id;
      
      for (const heading of headings) {
        const element = heading as HTMLElement;
        // 获取元素相对视口的位置
        const top = element.getBoundingClientRect().top;
        
        // 如果标题进入了视口顶部区域 (比如顶部 1/3 处)，或者已经在顶部上方
        // 这里的 200 可以根据实际 Hero 区域或 Header 高度调整
        if (top < 200) {
          currentId = element.id;
        } else {
          // 因为标题是按顺序排列的，一旦发现有标题还在下方较远，就不需继续检查后面的了
          break;
        }
      }

      setActiveId(currentId);
    };

    // 初始执行一次
    handleScroll();
    
    // 添加监听，使用 passive 提升性能
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSlug, toc]); // 当内容或 TOC 变化时重新绑定

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Sidebar - 渲染在这里但不占据文档流 */}
      <Sidebar categoryId={category} currentSlug={currentSlug} />
      
      {/* 主内容区 - 添加左边距避开固定侧边栏 */}
      <div className="lg:ml-64">
        <div className="flex">
          {/* 内容区域 */}
          <div className="flex-1 min-w-0 px-6 py-8 lg:px-12 lg:py-12">
            <div className="max-w-[700px] mx-auto min-h-[500px]">
              {/* 移动端搜索 */}
              <div className="lg:hidden mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索文档..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
              </div>
              
              {/* 文档内容 - 由子组件传入 */}
              <article className="prose prose-slate max-w-none">
                {children}
              </article>
            </div>
          </div>

          {/* 右侧目录 */}
          <TableOfContents items={toc} activeId={activeId} />
        </div>
      </div>
    </div>
  );
};
