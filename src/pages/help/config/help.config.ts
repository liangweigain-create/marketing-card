import { Settings, User, BookOpen, type LucideIcon } from 'lucide-react';

// ============================================================================
// 帮助文档配置中心
// ============================================================================
// 
// 📌 如何添加新的帮助文档分类？
//    1. 在 HELP_CATEGORIES 中添加新分类
//    2. 在 HELP_SIDEBAR 中添加对应的侧边栏配置
//    3. 创建对应的页面组件 (如 NewCategoryPage.tsx)
//    4. 在 router.tsx 中添加路由
//
// 📌 如何添加新的文章？
//    1. 在对应分类的 HELP_SIDEBAR 中添加新条目
//    2. 在 public/content/help/[category]/ 下创建对应的 .md 文件
//
// ============================================================================

// ---------------------------------
// 1️⃣ 分类配置
// ---------------------------------
export interface HelpCategory {
  id: 'manager' | 'start' | 'market';  // 分类 ID，用于路由
  title: string;                       // 显示标题
  description: string;                 // 分类描述
  icon: LucideIcon;                    // 图标组件
  iconColor: string;                   // 图标颜色 class
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: 'start',
    title: '快速上手指引',
    description: '加入企业，认识名片界面，完善个人设置。',
    icon: User,
    iconColor: 'text-purple-600',
  },
  {
    id: 'manager',
    title: '管理员指南',
    description: '创建企业并添加成员，搭建组织架构，完成管理初始设置。',
    icon: Settings,
    iconColor: 'text-blue-600',
  },
  {
    id: 'market',
    title: '市场拓展',
    description: '了解如何通过数据罗盘分析访客，利用素材库进行精准营销。',
    icon: BookOpen,
    iconColor: 'text-indigo-600',
  },
];

// ---------------------------------
// 2️⃣ 侧边栏配置
// ---------------------------------
export interface SidebarSection {
  title: string;           // 分组标题
  items: SidebarItem[];    // 分组内的文章列表
}

export interface SidebarItem {
  label: string;           // 文章标题
  slug: string;            // 文章 slug (用于路由和加载内容)
  hasSubmenu?: boolean;    // 是否有子菜单（未来扩展）
}

// 每个分类的侧边栏配置
// 📌 添加新文章：在对应分类下添加新的 item
export const HELP_SIDEBAR: Record<HelpCategory['id'], SidebarSection[]> = {
  start: [
    {
      title: '企业名片',
      items: [
        { label: '加入组织', slug: 'join-company' },
        { label: '了解名片界面', slug: 'card-interface' },
        { label: '完善配置', slug: 'quick-config' },
        { label: '开始获客', slug: 'start-use' },
      ],
    },
    {
      title: '个人名片',
      items: [
        { label: '快速注册', slug: 'quick-sign-up' },
      ],
    },
    {
      title: '进阶技巧',
      items: [
        { label: '更多使用技巧', slug: 'more-skills' },
      ],
    },
  ],
  manager: [
    {
      title: '快速开始',
      items: [
        { label: '产品简介', slug: 'intro' },
        { label: '创建企业与邀请成员', slug: 'getting-started' },
        { label: '版本更新日志', slug: 'changelog' },
      ],
    },
    {
      title: '基础操作',
      items: [
        { label: '完善企业基础配置', slug: 'basic-config' },
        { label: '配置业务管理功能', slug: 'business-config' },
        { label: '同步与迁移数据', slug: 'data-migration' },
      ],
    },
  ],
  market: [
    {
      title: '营销基础',
      items: [
        { label: '市场功能概览', slug: 'overview' },
        { label: '访客数据分析', slug: 'visitor-analytics' },
      ],
    },
    {
      title: '进阶技巧',
      items: [
        { label: '素材库管理', slug: 'material-library' },
        { label: '精准营销策略', slug: 'marketing-strategy' },
      ],
    },
  ],
};

// ---------------------------------
// 3️⃣ 工具函数
// ---------------------------------

/**
 * 根据分类 ID 获取分类信息
 */
export function getCategoryById(id: HelpCategory['id']): HelpCategory | undefined {
  return HELP_CATEGORIES.find(cat => cat.id === id);
}

/**
 * 根据分类 ID 获取侧边栏配置
 */
export function getSidebarByCategory(categoryId: HelpCategory['id']): SidebarSection[] {
  return HELP_SIDEBAR[categoryId] || [];
}

/**
 * 获取分类的第一篇文章 slug（用于默认导航）
 */
export function getFirstArticleSlug(categoryId: HelpCategory['id']): string {
  const sidebar = HELP_SIDEBAR[categoryId];
  if (sidebar && sidebar.length > 0 && sidebar[0].items.length > 0) {
    return sidebar[0].items[0].slug;
  }
  return 'intro';
}

// ---------------------------------
// 4️⃣ 帮助中心入口页卡片配置
// ---------------------------------
// 📌 修改入口页卡片：在这里调整顺序、标题、描述
export interface HelpEntryCard {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const HELP_ENTRY_CARDS: HelpEntryCard[] = HELP_CATEGORIES.map(cat => ({
  to: `/help/${cat.id}`,
  icon: cat.icon,
  title: cat.title.replace('指南', '入门').replace('拓展', '拓展指南'),
  description: cat.description,
}));
