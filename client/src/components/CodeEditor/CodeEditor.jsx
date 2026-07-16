import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange, readOnly = false }) => {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-800">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
