import type { PrismTheme } from "prism-react-renderer"

// Based on prism-react-renderer/themes/dracula
const theme: PrismTheme = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6272a4",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#f8f8f2",
      },
    },
    {
      types: ["property", "tag", "constant", "symbol", "deleted"],
      style: {
        color: "#ff79c6",
      },
    },
    {
      types: ["boolean", "number"],
      style: {
        color: "#bd93f9",
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#f1fa8c",
      },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: "#50fa7b",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#50fa7b",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#8be9fd",
        fontStyle: "normal",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#ffb86c",
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
