import {  type AnyLexicalExtensionArgument, defineExtension } from "lexical";

import THEME from "./LexicalTheme";

import { RichTextExtension } from "@lexical/rich-text";
import { HistoryExtension } from "@lexical/history";
import { TabIndentationExtension } from "@lexical/extension";
import { ListExtension } from "@lexical/list";
import { LinkExtension } from "@lexical/link";
import { CodeExtension } from "@lexical/code";
import { MarkdownShortcutsExtension } from "./features/editor/extensions/MarkdownShortcutsExtension";
import { CodePrismExtension } from "@lexical/code-prism";


// Lexical extension architecture  is node-providing extensions, so they itself register nodes/imports rules.
// Now node used only for custom nodes 
const defaultExtensionList : AnyLexicalExtensionArgument[]  = [
        RichTextExtension,  // HeadingNode + QuoteNode
        HistoryExtension, 
        TabIndentationExtension,  
        ListExtension,  // ListNode + ListItemNode
        LinkExtension,  // LinkNode
        CodeExtension, // CodeNode
        MarkdownShortcutsExtension,  // MarkdownShortcutsExtension
         CodePrismExtension, // code highlighting, there is more advanced code highlighting extension, code shiki extension but it is better for vs code like editor
        ] as const ; 

const defaultExtension = defineExtension({
    name: "refine-default-editor",
    namespace: "RefineEditor",
    nodes: () => [],
    theme: THEME,
    dependencies:  defaultExtensionList,
})

export { defaultExtension }