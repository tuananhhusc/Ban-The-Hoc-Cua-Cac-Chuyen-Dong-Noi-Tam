import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import FootnoteTooltip from "./FootnoteTooltip";

interface MarkdownRendererProps {
  content: string;
}

// Generate URL-safe slug from heading text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Extract reference sources from markdown content
function parseReferences(content: string) {
  const refs: Record<number, { text: string; url?: string }> = {};
  const lines = content.split("\n");
  let inReferences = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.includes("## Nguồn trích dẫn") || trimmed.includes("## Nguồn tham khảo")) {
      inReferences = true;
      continue;
    }
    if (inReferences) {
      const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        let rawText = match[2].trim();
        let url = undefined;
        let text = rawText;

        // Parse markdown link [Text](URL)
        const linkMatch = rawText.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          text = linkMatch[1];
          url = linkMatch[2];
        }

        refs[num] = { text, url };
      }
    }
  }
  return refs;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parsedReferences = parseReferences(content);

  const components: Components = {
    h2: ({ children, ...props }) => {
      const text = String(children);
      const id = slugify(text);
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },

    h3: ({ children, ...props }) => {
      const text = String(children);
      const id = slugify(text);
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },

    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-8 rounded-lg">
        <table {...props}>{children}</table>
      </div>
    ),

    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote {...props}>{children}</blockquote>
    ),

    hr: ({ ...props }) => <hr {...props} />,

    sup: ({ children }) => {
      const text = String(children);
      const match = text.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        const ref = parsedReferences[num];
        if (ref) {
          return (
            <FootnoteTooltip id={num} text={ref.text} url={ref.url}>
              {children}
            </FootnoteTooltip>
          );
        }
      }
      return <sup>{children}</sup>;
    },
  };

  return (
    <article className="drop-cap prose max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]} 
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}


