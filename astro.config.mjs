import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

export default defineConfig({
  integrations: [lit()],
  markdown: {
    remarkPlugins: [
      remarkMath,
      [remarkToc, { heading: "目次", ordered: true }],
    ],
    rehypePlugins: [[rehypeKatex, { fleqn: true, leqno: true }]],
    smartypants: false,
    syntaxHighlight: "prism",
  },
  output: "static",
  site: "https://calamari-dev.github.io",
  compressHTML: true,
  build: { inlineStylesheets: "auto" },
});
