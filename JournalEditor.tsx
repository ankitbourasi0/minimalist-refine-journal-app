"use client";

import React, { useEffect, useState } from "react";
import THEME from "./LexicalTheme";
import ToolbarPlugin from "./ToolbarPlugin";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TRANSFORMERS } from "@lexical/markdown";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";

import EditorPersistencePlugin from "./features/editor/plugins/EditorPersistencePlugin";

function onError(error: Error) {
  console.error(error);
}

const LINE_HEIGHTS = [
  "leading-none",
  "leading-tight",
  "leading-snug",
  "leading-normal",
  "leading-relaxed",
  "leading-loose",
  "leading-8",
  "leading-10",
];

const JournalEditor = () => {
  const [lineIndex] = useState(4);

  const initialConfiguration = {
    theme: THEME,
    namespace: "MyEditor",
    onError,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      LinkNode,
    ],
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">

      <div className="w-full h-16 shrink-0 border-b border-gray-200 bg-white" />

      <LexicalComposer initialConfig={initialConfiguration}>
        <div className="flex-1 w-full min-w-0 bg-white">

          <div className="w-full px-6 py-5 border-b border-gray-100">
            <ToolbarPlugin />
          </div>

          <div
            className={`relative w-full min-w-0 px-6 py-6 ${LINE_HEIGHTS[lineIndex]}`}
          >
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="w-full min-h-[500px] outline-none text-gray-800 text-lg break-words" />
              }
              placeholder={
                <div className="absolute top-6 left-6 text-gray-400 pointer-events-none text-lg">
                  What's on your mind today?
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />
            <EditorPersistencePlugin documentId="test-document" />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>

        </div>
      </LexicalComposer>

    </div>
  );
};

export default JournalEditor;