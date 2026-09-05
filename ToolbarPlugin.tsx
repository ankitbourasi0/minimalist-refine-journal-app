"use client"
import React from 'react'
/*
Because Lexical state is seperate from React state, 
we use useLexicalComposerContext to get access to the editor.
we then send a FORMAT_TEXT_COMMAND to tell Lexical to update its internal state.
*/
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical'

import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode } from '@lexical/rich-text'

type FormatHeading = 'h1' | 'h2' | 'h3' | 'h4' 

const formatValues: FormatHeading[] = ['h1', 'h2', 'h3', 'h4']
const ToolbarPlugin = () => {

  //This HOOK give us access to the underlying Lexical Editor Instance, 
  const [editor] = useLexicalComposerContext()


  //Convert to the current line into a HEADING.
  const formatHeading = (headingSize: FormatHeading) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    })
  }

  //Convert to current selection into Paragraph
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    })
  }
  return (
    <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200 font-poppins">
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

      <select onChange={(e) => formatHeading(e.currentTarget.value as FormatHeading)} className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm font-poppins hover:bg-gray-100 text-gray-700">
        <option value="paragraph" className="font-poppins">Normal</option>
        {formatValues.map((value) => (
          <option key={value} value={value} className="font-poppins">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select>
     



    </div>
  )
}

export default ToolbarPlugin