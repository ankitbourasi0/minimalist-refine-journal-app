import { h4 } from "framer-motion/client";

// LexicalTheme.ts
import type { EditorThemeClasses } from "lexical";

const THEME: EditorThemeClasses = {
  root:
    "relative text-gray-900",

  paragraph:
    "mb-2",

  heading: {
    h1: "text-4xl font-bold leading-tight mt-6 mb-3",
    h2: "text-3xl font-bold leading-tight mt-5 mb-3",
    h3: "text-2xl font-semibold leading-snug mt-4 mb-2",
    h4: "text-xl font-semibold leading-snug mt-4 mb-2",
    h5: "text-lg font-semibold mt-3 mb-2",
    h6: "text-base font-semibold mt-3 mb-2",
  },

  text: {
    base: "",
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",

    underlineStrikethrough:
      "underline line-through",

    code:
      "font-mono text-[0.9em] bg-gray-100 px-1.5 py-0.5 rounded",

    highlight:
      "bg-yellow-200",

    subscript:
      "text-xs align-sub",

    superscript:
      "text-xs align-super",

    lowercase:
      "lowercase",

    uppercase:
      "uppercase",

    capitalize:
      "capitalize",
  },

  quote:
    "border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600",

  link:
    "text-blue-600 underline underline-offset-2 cursor-pointer hover:text-blue-700",

  list: {
    ul:
      "list-disc ml-6 my-2",

    ol:
      "list-decimal ml-6 my-2",

    checklist:
      "ml-6 my-2",

    listitem:
      "my-1",

    listitemChecked:
      "relative list-none line-through text-gray-400 pl-7",

    listitemUnchecked:
      "relative list-none pl-7",

    nested: {
      list:
        "ml-6",

      listitem:
        "my-1",
    },

    ulDepth: [
      "list-disc",
      "list-[circle]",
      "list-[square]",
    ],

    olDepth: [
      "list-decimal",
      "list-[lower-alpha]",
      "list-[lower-roman]",
    ],
  },

  code:
    "block w-full overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-950 text-gray-100 font-mono text-sm leading-6 p-4 my-4",

  codeHighlight: {
    atrule:
      "text-purple-400",

    attr:
      "text-sky-300",

    boolean:
      "text-orange-400",

    builtin:
      "text-cyan-300",

    cdata:
      "text-gray-500",

    char:
      "text-emerald-300",

    class:
      "text-yellow-300",

    "class-name":
      "text-yellow-300",

    comment:
      "text-gray-500 italic",

    constant:
      "text-orange-300",

    deleted:
      "text-red-400",

    doctype:
      "text-gray-500",

    entity:
      "text-red-300",

    function:
      "text-blue-300",

    important:
      "text-red-400 font-semibold",

    inserted:
      "text-emerald-400",

    keyword:
      "text-purple-400",

    namespace:
      "text-cyan-300",

    number:
      "text-orange-300",

    operator:
      "text-pink-300",

    prolog:
      "text-gray-500",

    property:
      "text-sky-300",

    punctuation:
      "text-gray-300",

    regex:
      "text-red-300",

    selector:
      "text-emerald-300",

    string:
      "text-emerald-300",

    symbol:
      "text-orange-300",

    tag:
      "text-red-300",

    url:
      "text-blue-300 underline",

    variable:
      "text-sky-200",
  },

  hashtag:
    "text-blue-600",

  mark:
    "bg-yellow-200",

  markOverlap:
    "bg-orange-200",

  specialText:
    "text-purple-600",

  indent:
    "ml-10",

  tab:
    "inline-block",

  ltr:
    "text-left",

  rtl:
    "text-right",

  hr:
    "my-6 border-t border-gray-300",

  hrSelected:
    "ring-2 ring-blue-400",

  blockCursor:
    "border-l-2 border-black",

  characterLimit:
    "text-red-500",

  table:
    "border-collapse w-full my-4",

  tableRow:
    "border-b border-gray-200",

  tableCell:
    "border border-gray-300 px-3 py-2 min-w-[100px] align-top",

  tableCellHeader:
    "border border-gray-300 px-3 py-2 bg-gray-100 font-semibold text-left",

  tableCellSelected:
    "bg-blue-100",

  tableSelected:
    "ring-2 ring-blue-500",

  tableSelection:
    "bg-blue-100/50",

  tableCellResizer:
    "absolute right-0 top-0 h-full w-1 cursor-col-resize",

  tableCellActionButton:
    "rounded p-1 hover:bg-gray-200",

  tableCellActionButtonContainer:
    "absolute right-1 top-1",

  tableAddColumns:
    "bg-gray-50 hover:bg-gray-100",

  tableAddRows:
    "bg-gray-50 hover:bg-gray-100",

  tableScrollableWrapper:
    "overflow-x-auto",

  tableStickyScrollbar:
    "sticky bottom-0",

  image:
    "max-w-full rounded-lg",

  collaboration: {
    cursor:
      "border-l-2",

    cursorName:
      "absolute text-xs text-white px-1 rounded",

    selection:
      "relative",

    selectionBg:
      "bg-blue-200/50",
  },

  embedBlock: {
    base:
      "my-4 rounded-lg border border-gray-200",

    focus:
      "ring-2 ring-blue-500",
  },
};


export default THEME;



