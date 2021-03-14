import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
// CSS
import "./code-editor.css";

interface ICodeEditorProps {
  initialValue: string;
  onChange(value: string): void; // Return nothing is ok = void
}
/*     getValue: () => string,
    monacoEditor: any */
const CodeEditor: React.FC<ICodeEditorProps> = ({ onChange, initialValue }) => {
  //
  const editorRef = useRef<any>();
  //
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    //
    editorRef.current = monacoEditor;
    //
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    // Tab
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  // Prettier Module - Format
  const onFormatClick = () => {
    // Get Value
    //console.log(editorRef.current);
    const unformattedCode = editorRef.current.getModel().getValue();
    // Format
    const formattedCode = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      semi: true,
      useTabs: false,
    });
    // Set value back
    editorRef.current.setValue(formattedCode);
  };

  return (
    <>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        // Box display-Style
        height="100%"
        theme="light"
        // Type code
        language="javascript"
        // @monaco-editor/react
        // IEditorConstructionOptions
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </>
  );
};

export default CodeEditor;

// https://www.npmjs.com/package/monaco-editor
