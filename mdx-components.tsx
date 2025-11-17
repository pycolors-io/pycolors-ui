import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

// Custom components available in .mdx
import { Preview } from '@/components/docs/preview';
import { Button } from '@/components/ui/button';

export function getMDXComponents(
  components?: MDXComponents
): MDXComponents {
  return {
    ...defaultMdxComponents,

    // Native integration of Fumadocs CodeBlock (recommended)
    // All ```tsx into .mdx go through this wrapper
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),

    Preview,
    Button,
    Tabs,
    Tab,
    ...components,
  };
}
