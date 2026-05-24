"use client"
//react imports
import React from 'react'
//local files imports
import THEME from './LexicalTheme'
import ToolbarPlugin from './ToolbarPlugin'
//lexical imports
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import  {ContentEditable } from '@lexical/react/LexicalContentEditable'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary'


function onError(error:  Error){
    console.error(error)
}

const JournalEditor = () => {
    const initialConfiguration = {
        theme: THEME,
        namespace: 'MyEditor',
        onError,
        // Nodes dictate the types of content that can be rendered in the editor.
        // By default, it only supports standard text and paragraphs.
        nodes: []
    }
    return (
        <LexicalComposer  initialConfig={initialConfiguration}>
                <div className="mx-auto max-w-3xl p-8 mt-10 bg-white rounded-xl shadow-sm border border-gray-100">

                    {/* Our custom toolbar  */}
                    <ToolbarPlugin />

                    {/* The editable area  */}
                    <div className="relative">
                        <RichTextPlugin 
                            contentEditable={
                            <ContentEditable 
                                className="min-h-[400px] outline-none text-gray-800 text-lg" />}
                            placeholder={
                            <div 
                                className="absolute top-0 left-0 text-gray-400 pointer-events-none text-lg">
                                What's on your mind today?
                            </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                    </div>
                </div>
        </LexicalComposer>
    )
}

export default JournalEditor