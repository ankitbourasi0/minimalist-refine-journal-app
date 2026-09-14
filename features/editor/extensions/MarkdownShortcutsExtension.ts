/*
This is custom extension for Lexical that adds support for Markdown shortcuts. It listens for specific key combinations and transforms the text accordingly. For example, typing `**bold**` will convert the text to bold format.
Implementation of this extension because Lexical 0.50.0 does not provide built in extension for Markdown shortcuts.
*/

// we can use 
// <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> 
// or

import { defineExtension } from "lexical";

import {
    registerMarkdownShortcuts,
    TRANSFORMERS,
} from "@lexical/markdown";

import { RichTextExtension } from "@lexical/rich-text";
import { ListExtension } from "@lexical/list";
import { LinkExtension } from "@lexical/link";
import { CodeExtension } from "@lexical/code";

export const MarkdownShortcutsExtension = defineExtension({
    name: "refine-markdown-shortcuts",

    dependencies: [RichTextExtension, ListExtension, LinkExtension, CodeExtension],

    register(editor){
        return registerMarkdownShortcuts(editor, TRANSFORMERS);
    }
})