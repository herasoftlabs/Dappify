"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as monaco from "monaco-editor";

// Monaco Editor bileşenini dinamik olarak yüklüyoruz (ssr: false)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  code: string;
  onCodeChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange }) => {
  const [editorCode, setEditorCode] = useState(code);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Anchor dilini tanıtalım
      monaco.languages.register({ id: "anchor" });

      // Anchor dilinin syntax highlighting tanımları (Rust temelli)
      monaco.languages.setMonarchTokensProvider("anchor", {
        tokenizer: {
          root: [
            [/#\[[^\]]*\]/, "annotation"], // #[derive(...)] gibi annotation'lar
            [/fn|let|struct|enum|pub|mod|impl/, "keyword"], // Rust ve Anchor keyword'leri
            [/msg!|program_id|accounts|declare_id!/, "function"], // Anchor'a özgü makrolar
            [/\bSigner|Context|ProgramResult|Account\b/, "type.identifier"], // Anchor'da kullanılan bazı türler
            [/[A-Z][\w$]*/, "type.identifier"], // Tip isimleri
            [/[{}]/, "delimiter.bracket"],
            [/"[^"]*"/, "string"], // Stringler
            [/[a-z_$][\w$]*/, "identifier"], // Diğer kelimeler
            [/[()\[\]]/, "@brackets"],
            [/[0-9]+/, "number"], // Sayılar
            [/\/\/.*$/, "comment"], // Tek satır yorumlar
            [/\/\*[\s\S]*?\*\//, "comment"], // Çok satırlı yorumlar
          ],
        },
      });

      // Autocomplete ve diğer gelişmiş işlevler için öneri sağlayıcı
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

      // Rust/Anchor için error linting basit örneği (geliştirilebilir)
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
        defaultLanguage="rust" // Anchor dilini aktif ediyoruz
        value={editorCode}
        theme="vs-dark" // Karanlık tema
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true }, // Minimap'ı etkinleştiriyoruz
          scrollBeyondLastLine: true,
          automaticLayout: true, // Otomatik layout ayarı
          wordWrap: "on", // Satır kaydırma
          formatOnType: true, // Yazarken formatlama
          quickSuggestions: true, // Autocomplete
          suggestOnTriggerCharacters: true, // Tamamlama tetikleyicileri
          folding: true, // Kod katlama
          acceptSuggestionOnEnter: "on", // Enter ile otomatik tamamlama
        }}
      />
    </div>
  );
};

export default CodeEditor;
