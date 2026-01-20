import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../../lib/utils';

// ============================================================================
// MarkdownRenderer 组件
// ============================================================================
// 📌 职责：将 Markdown 字符串渲染为 React 组件
// 📌 不负责加载，只负责渲染

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={cn("prose prose-slate max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义标题渲染，添加 id 用于锚点跳转
          h1: ({ children, ...props }) => {
            const id = generateId(children);
            return <h1 id={id} {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }) => {
            const id = generateId(children);
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const id = generateId(children);
            return <h3 id={id} {...props}>{children}</h3>;
          },
          // 自定义图片渲染
          img: ({ src, alt, ...props }) => (
            <img 
              src={src} 
              alt={alt} 
              className="h-auto max-w-full lg:max-w-[700px] rounded-sm shadow-sm my-4"
              loading="lazy"
              {...props}
            />
          ),
          // 自定义链接渲染
          a: ({ href, children, ...props }) => (
            <a 
              href={href} 
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-blue-600 hover:text-blue-800 underline decoration-blue-200 hover:decoration-blue-600 underline-offset-2"
              {...props}
            >
              {children}
            </a>
          ),
          // 自定义代码块
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-slate-800" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // 自定义提示块 (blockquote)
          blockquote: ({ children, ...props }) => (
            <blockquote 
              className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-3 my-4 text-slate-700 not-italic"
              {...props}
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// 生成标题 ID
function generateId(children: React.ReactNode): string {
  const text = extractTextFromChildren(children);
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '');
}

// 从 React 子节点提取文本
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as React.ReactElement<{ children?: React.ReactNode }>;
    return extractTextFromChildren(element.props.children);
  }
  return '';
}
