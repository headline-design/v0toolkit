import type { PrismTheme } from "prism-react-renderer"

// Based on prism-react-renderer/themes/github with slight tweaks for readability
const theme: PrismTheme = {
  plain: {
    color: "#24292e",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6a737d",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#24292e",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["attr-name", "string", "char", "builtin", "url"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["inserted"],
      style: {
        color: "#22863a",
        backgroundColor: "rgba(34,134,58,0.08)",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "#b31d28",
        backgroundColor: "rgba(179,29,40,0.08)",
      },
    },
    {
      types: ["variable", "operator"],
      style: {
        color: "#e36209",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#d73a49",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["bold"],
      style: {
        fontWeight: "bold",
      },
    },
  ],
}

export default theme
