// LexicalTheme.ts
const THEME = {
    ltr: 'text-left',
    rtl: 'text-right',
    paragraph: ' ',
    quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4',
    heading: {
        h1: 'text-3xl font-bold mb-4 mt-6',
        h2: 'text-2xl font-bold mb-3 mt-5',
        h3: 'text-xl font-bold mb-2 mt-4'
    },
    text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline decoration-gray-400 underline-offset-4',
        strikethrough: 'line-through',
        code: 'font-mono bg-gray-100 px-1 rounded',
    }
};

export default THEME;