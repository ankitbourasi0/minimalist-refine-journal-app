"use client";

import { useState } from "react";
import ToolbarPlugin from "./ToolbarPlugin";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { TRANSFORMERS } from "@lexical/markdown";

import EditorPersistencePlugin from "./features/editor/plugins/EditorPersistencePlugin";
import { LexicalExtensionComposer } from "@lexical/react/LexicalExtensionComposer";
import { defaultExtension } from "./LexicalExtension";


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

  return (
    <div className="w-full h-full flex flex-col bg-white">

      <div className="w-full h-16 shrink-0 border-b border-gray-200 bg-white" />

      <LexicalExtensionComposer
        extension={defaultExtension}
        contentEditable={null}
      >
        <div className="flex-1 w-full min-w-0 bg-white">

          {/* Fixed / Sticky Toolbar */}
          <div className="sticky top-0  z-30 w-full px-6 py-5 border-b bg-white border-gray-200">
            <ToolbarPlugin />
          </div>

          {/* Editor */}
          <div
            className={`relative w-full min-w-0 px-8 py-8 ${LINE_HEIGHTS[lineIndex]}`}
          >
            <ContentEditable
              className="w-full min-h-[calc(100vh-120px)] h-auto outline-none text-gray-800 text-lg break-words pb-[40vh]"
              aria-placeholder="What's on your mind today?"
              placeholder={
                <div className="absolute top-8 left-8 pointer-events-none text-lg text-gray-400">
                  What's on your mind today?
                </div>
              }
            />

          
          </div>
           <EditorPersistencePlugin documentId="test-document" />

        </div>
      </LexicalExtensionComposer >

    </div>
  );
};

export default JournalEditor;