import { useParams, Navigate } from 'react-router-dom';
import { HelpDocLayout } from './components/HelpDocLayout';
import { HelpDocContent } from './components/HelpDocContent';
import { useMarkdown } from './hooks/useMarkdown';
import { getFirstArticleSlug, getCategoryById, type HelpCategory } from './config/help.config';

// ============================================================================
// GenericHelpPage - 通用帮助文档页面
// ============================================================================
// 📌 职责：
// 1. 根据 URL 参数 category 和 slug 动态加载内容
// 2. 校验 category 有效性，无效则跳转
// 3. 处理默认 slug 逻辑

export const GenericHelpPage = () => {
  const { category, slug } = useParams<{ category: string; slug?: string }>();
  
  // 1. 校验 category 是否有效
  const validCategory = getCategoryById(category as HelpCategory['id']);
  
  // 如果 category 无效，重定向到帮助首页
  if (!validCategory) {
    return <Navigate to="/help" replace />;
  }

  const categoryId = validCategory.id;
  const currentSlug = slug || getFirstArticleSlug(categoryId);
  
  // 加载 Markdown 内容和 TOC
  const { toc } = useMarkdown(`/content/help/${categoryId}/${currentSlug}.md`);
  
  return (
    <HelpDocLayout 
      category={categoryId}
      currentSlug={currentSlug}
      toc={toc}
    >
      <HelpDocContent category={categoryId} slug={currentSlug} />
    </HelpDocLayout>
  );
};
