import { useMarkdown } from '../hooks/useMarkdown';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Loader2 } from 'lucide-react';

// ============================================================================
// HelpDocContent 组件
// ============================================================================
// 📌 职责：组装文档内容（加载状态 + 元信息 + Markdown 内容）
// 📌 单一职责：只管内容区域，不管布局

interface HelpDocContentProps {
  category: string;
  slug: string;
}

export const HelpDocContent = ({ category, slug }: HelpDocContentProps) => {
  const { content, frontmatter, isLoading, error } = useMarkdown(
    `/content/help/${category}/${slug}.md`
  );

  // 加载中状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-slate-500">加载中...</span>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">文档不存在</h2>
        <p className="text-slate-500">{error}</p>
        <p className="text-slate-400 text-sm mt-4">
          请检查 <code className="bg-slate-100 px-2 py-1 rounded">/public/content/help/{category}/{slug}.md</code> 是否存在
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 文章元信息 */}
      {frontmatter.title && (
        <h1 className="text-3xl font-bold text-slate-900">{frontmatter.title}</h1>
      )}
      
      {(frontmatter.readTime || frontmatter.updatedAt) && (
        <div className="flex items-center gap-4 text-sm text-slate-500">
          {frontmatter.readTime && <span>阅读时长：{frontmatter.readTime} 分钟</span>}
          {frontmatter.readTime && frontmatter.updatedAt && (
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
          )}
          {frontmatter.updatedAt && <span>更新时间：{frontmatter.updatedAt}</span>}
        </div>
      )}

      {/* Markdown 内容 */}
      <MarkdownRenderer content={content} />
    </div>
  );
};
