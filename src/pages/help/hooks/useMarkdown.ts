import { useState, useEffect } from 'react';

// ============================================================================
// TOC 项目类型
// ============================================================================
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// ============================================================================
// Markdown 解析结果
// ============================================================================
export interface MarkdownData {
  content: string;
  toc: TocItem[];
  frontmatter: {
    title?: string;
    readTime?: number;
    updatedAt?: string;
    [key: string]: unknown;
  };
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// 解析 Frontmatter (YAML 头部)
// ============================================================================
function parseFrontmatter(markdown: string): { frontmatter: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: markdown };
  }
  
  const frontmatterStr = match[1];
  const content = markdown.slice(match[0].length);
  
  // 简易 YAML 解析
  const frontmatter: Record<string, unknown> = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      // 尝试解析数字
      frontmatter[key] = isNaN(Number(value)) ? value : Number(value);
    }
  });
  
  return { frontmatter, content };
}

// ============================================================================
// 从 Markdown 内容提取 TOC (H2 Only)
// ============================================================================
function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // 生成 ID: 转小写，空格变连字符，移除特殊字符
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5-]/g, '');
    
    toc.push({ id, text, level });
  }
  
  return toc;
}

// ============================================================================
// useMarkdown Hook
// ============================================================================
// 📌 职责：加载 Markdown 文件 + 解析 TOC + 提取元数据
export function useMarkdown(path: string): MarkdownData {
  const [data, setData] = useState<MarkdownData>({
    content: '',
    toc: [],
    frontmatter: {},
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    
    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`文档不存在: ${path}`);
        }
        return response.text();
      })
      .then(rawMarkdown => {
        if (!isMounted) return;
        
        const { frontmatter, content } = parseFrontmatter(rawMarkdown);
        const toc = extractToc(content);
        
        setData({
          content,
          toc,
          frontmatter,
          isLoading: false,
          error: null,
        });
      })
      .catch(error => {
        if (!isMounted) return;
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      });
    
    return () => {
      isMounted = false;
    };
  }, [path]);

  return data;
}
