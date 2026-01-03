/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const markdownRehypeSanitizeSchema = {
  ...defaultSchema,
  tagNames: Array.from(new Set([...(defaultSchema.tagNames ?? []), 'br'])),
};

const markdownComponents = {
  p: ({ children, ...props }: any) => (
    <p className="mb-2 last:mb-0 text-justify" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="my-2 pl-5 list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="my-2 pl-5 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="my-1" {...props}>
      {children}
    </li>
  ),
  h1: ({ children, ...props }: any) => (
    <h1 className="mt-4 mb-2 font-semibold text-base" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="mt-4 mb-2 font-semibold text-sm" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="mt-3 mb-2 font-semibold text-sm" {...props}>
      {children}
    </h3>
  ),
  hr: (props: any) => <hr className="my-3 border-border" {...props} />,
  table: ({ children, ...props }: any) => (
    <div className="w-full overflow-x-auto my-3" {...props}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border border-border px-2 py-1 text-left whitespace-nowrap" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-border px-2 py-1 align-top text-left whitespace-normal wrap-break-word" {...props}>
      {children}
    </td>
  ),
};

type MarkdownMessageProps = {
  content: string;
};

export default function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeRaw], [rehypeSanitize, markdownRehypeSanitizeSchema]]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
