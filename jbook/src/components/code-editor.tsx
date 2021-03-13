import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface ICodeEditorProps {
  initialValue: string;
  onChange(value: string): void; // Return nothing is ok = void
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount: EditorDidMount = (
    /*     getValue: () => string,
    monacoEditor: any */
    getValue,
    monacoEditor
  ) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    // Tab
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      // Box display-Style
      height="500px"
      theme="light"
      // Type code
      language="javascript"
      // @monaco-editor/react
      // IEditorConstructionOptions
      options={{
        wordWrap: "on",
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;

// https://www.npmjs.com/package/monaco-editor
