"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as monaco from "monaco-editor";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  code: string;
  onCodeChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange }) => {
  const [editorCode, setEditorCode] = useState(code);

  useEffect(() => {
    setEditorCode(code);
  }, [code]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      monaco.languages.register({ id: "anchor" });

      
      monaco.languages.setMonarchTokensProvider("anchor", {
        tokenizer: {
          root: [
            [/#\[[^\]]*\]/, "annotation"], // #[derive(...)] annotations
            [/fn|let|struct|enum|pub|mod|impl/, "keyword"], // Rust and Anchor keywords
            [/msg!|program_id|accounts|declare_id!/, "function"], // Macro of Anchor's
            [/\bSigner|Context|ProgramResult|Account\b/, "type.identifier"], // Some types on Anchor
            [/[A-Z][\w$]*/, "type.identifier"], // Type names
            [/[{}]/, "delimiter.bracket"],
            [/"[^"]*"/, "string"], // Strings
            [/[a-z_$][\w$]*/, "identifier"], // Another keywords
            [/[()\[\]]/, "@brackets"],
            [/[0-9]+/, "number"], // Numbers
            [/\/\/.*$/, "comment"], // Single line comments
            [/\/\*[\s\S]*?\*\//, "comment"], // Multi lines comments
          ],
        },
      });

      
      monaco.languages.registerCompletionItemProvider("anchor", {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          );

          return {
            suggestions: [
              {
                label: "fn",
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: "fn ",
                documentation: "Function Declaration",
                range: range,
              },
              {
                label: "#[derive(Accounts)]",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: "#[derive(Accounts)]\npub struct ",
                documentation: "Anchor Accounts Struct",
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              },
              {
                label: "msg!",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'msg!("");',
                documentation: "Anchor Logging Macro",
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              },
              {
                label: "declare_id!",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'declare_id!("YourProgramIDHere");',
                documentation: "Anchor declare_id Macro",
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              },
              {
                label: "pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText:
                  "pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {\n\tOk(())\n}",
                documentation: "Anchor Initialize Function",
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              },
              {
                label: "pub fn execute(ctx: Context<Execute>) -> ProgramResult {",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText:
                  "pub fn execute(ctx: Context<Execute>) -> ProgramResult {\n\tOk(())\n}",
                documentation: "Anchor Execute Function",
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              },
            ],
          };
        },
      });

      
      monaco.languages.registerDocumentFormattingEditProvider("anchor", {
        provideDocumentFormattingEdits: (model, options, token) => {
          const code = model.getValue();
          const formatted = code.replace(/let/g, "let ").replace(/fn/g, "fn ");
          return [
            {
              range: model.getFullModelRange(),
              text: formatted,
            },
          ];
        },
      });
    }
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setEditorCode(value || "");
    onCodeChange(value || "");
  };

  return (
    <div className="w-[800px] h-[600px]">
      <MonacoEditor
        height="600px"
        defaultLanguage="rust"
        value={editorCode}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: true,
          automaticLayout: true,
          wordWrap: "on",
          formatOnType: true,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          folding: true,
          acceptSuggestionOnEnter: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
