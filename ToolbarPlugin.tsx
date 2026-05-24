"use client"
import React from 'react'
/*
Because Lexical state is seperate from React state, 
we use useLexicalComposerContext to get access to the editor.
we then send a FORMAT_TEXT_COMMAND to tell Lexical to update its internal state.
*/
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND } from 'lexical'
const ToolbarPlugin = () => {

  //This HOOK give us access to the underlying Lexical Editor Instance, 
  const [editor] = useLexicalComposerContext()
  return (
    <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200">
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 font-bold text-gray-700">
        B
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 italic text-gray-700"
      >
        I
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 underline text-gray-700"
      >
        U
      </button>

    </div>
  )
}

export default ToolbarPlugin