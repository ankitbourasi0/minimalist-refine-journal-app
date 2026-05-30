"use client"
//react imports
import React, { useEffect, useState } from 'react'
//local files imports
import THEME from './LexicalTheme'
import ToolbarPlugin from './ToolbarPlugin'
//lexical imports
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'

//Node and Markdown tools
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { HEADING, QUOTE, TRANSFORMERS } from '@lexical/markdown'

import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function onError(error: Error) {
    console.error(error)
}


const LINE_HEIGHTS = [
    'leading-none',
    'leading-tight',
    'leading-snug',
    'leading-normal',
    'leading-relaxed',
    'leading-loose',
    'leading-8',
    'leading-10']




type MyOnChangePluginProps = {
    onChange: (editorState: any) => void;
};

function MyOnChangePlugin({ onChange }: MyOnChangePluginProps) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            onChange(editorState);
        });
    }, [editor, onChange]);
    return null;
}

const JournalEditor = () => {
    const [lineIndex, setLineIndex] = useState(4) // Default to 'leading-relaxed'

    const increaseLineHeight = () => {
        if (lineIndex < LINE_HEIGHTS.length - 1) setLineIndex(lineIndex + 1);
    }

    const decreaseLineHeight = () => {
        if (lineIndex > 0) setLineIndex(lineIndex - 1);

    }
    const initialConfiguration = {
        theme: THEME,
        namespace: 'MyEditor',
        onError,
        // Nodes dictate the types of content that can be rendered in the editor.
        // By default, it only supports standard text and paragraphs.
        nodes: [
            //Registering the Nodes, If a node isnt here, Lexical will crash
            // when you try to create it. (Added QuoteNode as a bonus!)
            HeadingNode,
            QuoteNode,
            ListNode,
            ListItemNode,
            CodeNode,
            LinkNode
        ]
    }

    const [editorState, setEditorState] = useState<string | null>(null);
    function onChange(editorState: any ) {
       // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));

    }
    return (
        <LexicalComposer initialConfig={initialConfiguration}>
            <div className="mx-auto max-w-3xl p-8 mt-10 bg-white  border border-gray-100">

                <div className="flex justify-between items-start">

                    {/* Our custom toolbar  */}
                    <ToolbarPlugin />

                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={decreaseLineHeight}
                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-sm hover:bg-gray-100 text-gray-600 font-mono"
                        >
                            Spacing -
                        </button>
                        <button
                            onClick={increaseLineHeight}
                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-sm hover:bg-gray-100 text-gray-600 font-mono"
                        >
                            Spacing +
                        </button>
                    </div>
                </div>

                {/* The editable area  */}
                <div className={`relative ${LINE_HEIGHTS[lineIndex]}`}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                className={`min-h-[400px] min-w-[44rem] outline-none text-gray-800 text-lg break-words `} />}
                        placeholder={
                            <div
                                className="absolute top-0 left-0 text-gray-400 pointer-events-none text-lg">
                                What's on your mind today?
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />

                    <MyOnChangePlugin onChange={onChange} />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                </div>

            </div>

        </LexicalComposer>
    )
}

export default JournalEditor